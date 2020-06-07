import React, { createContext, useState, useRef, useEffect } from 'react'
import io from 'socket.io-client'

export const SockContext = createContext()



export default function Store(props) {

    const socket = useRef()
    const [messages, setMessages] = useState([{ from: 0, msg: 'Bienvenido al chat!' }])
    const [connected, setConnected] = useState(false)

    useEffect(() => {
        socket.current = io("http://localhost:5000")


        socket.current.on('server_message', (message) => {
            setMessages(messages => [...messages, message])
            console.log(message)
        })

        return () => {
            socket.current.disconnect()
        }
    }, [])


    const sendMessage = (data) => {
        setMessages(messages => [...messages, data])
        socket.current.emit("client_message", data)
    }

    const connectClient = (client) => {
        socket.current.emit('client_conn', client)
        setConnected(true)
    }

    return (
        <SockContext.Provider value={{ messages, sendMessage, connectClient, connected }}>
            {props.children}
        </SockContext.Provider>
    )
}