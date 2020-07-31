import React, { createContext, useState, useRef, useEffect } from 'react'
import io from 'socket.io-client'

export const SockContext = createContext()



export default function ChatProv(props) {

    const socket = useRef()

    // const testdata = [{
    //     name: 'Franco di Nápoli', email: 'francoadinapoli@gmail.com', tel: '011 2191 6528', socket_id: "2",
    //     emp: 'Maxpower Industrial Automation', messages: [{ from: 0, msg: 'Bienvenido al chat de Maxpower!' }, { from: 1, msg: 'Hola que tal!' }]
    // }]

    const [chats, setChats] = useState([])
    // const [chats, setChats] = useState(testdata)
    const chatRef = useRef()

    useEffect(() => {
        // socket.current = io("http://localhost:5000")
        socket.current = io("api.maxpower-ar.com")

        socket.current.emit('server_conn')

        // socket.current.on('existing_conv', (chat) => {
        //     setChats(chats => [...chats, chat])
        // })

        socket.current.on('client_message', (data) => {
            const new_msg = { from: 1, msg: data.msg }
            addMessageToChat(data.from, new_msg)
        })

        socket.current.on('new_client_conn', (new_chat) => {
            setChats(chats => [...chats, new_chat])
        })

        socket.current.on('client_disconnected', (sock) => {

            for (let [i, chat] of chatRef.current.entries()) {
                if (chat.socket_id === sock) {
                    socket.current.emit('client_conversation', chat)
                    chatRef.current.splice(i, 1)
                    break
                }
            }
            setChats(chats => chatRef.current)
        })

        return () => {
            socket.current.disconnect()
        }
    }, [])

    useEffect(() => {
        chatRef.current = [...chats]
        //orderByTimestamp()

    }, [chats])

    const sendMessageServer = (data) => {
        const new_msg = { from: 0, msg: data.text }
        addMessageToChat(data.to, new_msg)
        socket.current.emit('server_message', data)
        //console.log(data)
    }

    const addMessageToChat = (to, message) => {

        let old = chatRef.current
        message['time'] = new Date().getTime()

        for (let c of old) {
            if (c.socket_id === to) {
                c.messages = [...c.messages, message]
                break
            }
        }
        setChats(chats => old)
        orderByTimestamp()
    }

    const orderByTimestamp = () => {
        let old = chatRef.current

        for (let i = 0; i < old.length - 1; i++) {
            for (let j = i + 1; j < old.length; j++) {
                let one = old[i]
                const timeone = one.messages[one.messages.length - 1].time
                let two = old[j]
                const timetwo = two.messages[two.messages.length - 1].time


                if (timetwo > timeone) {
                    let aux = old[i]
                    old[i] = old[j]
                    old[j] = aux


                }
            }
        }
        setChats(chats => old)

    }

    return (
        <SockContext.Provider value={{ chats, sendMessageServer }}>
            {props.children}
        </SockContext.Provider>
    )
}