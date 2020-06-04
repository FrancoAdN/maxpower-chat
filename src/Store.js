import React, { createContext, useState, useRef, useEffect } from 'react'
import io from 'socket.io-client'

export const SockContext = createContext()



export default function Store(props) {

    const socket = useRef()
    const [messages, setMessages] = useState([{ from: 0, msg: 'Bienvenido al chat!' }])

    useEffect(() => {
        socket.current = io("http://localhost:5000")

        socket.current.emit('client')

        socket.current.on("newChatMessage", (data) => {
            console.log(data);
        });

        return () => {
            socket.current.disconnect()
        }
    }, [])


    const sendMessage = (data) => {
        setMessages(messages => [...messages, data])
        socket.current.emit("client_message", data)
    };

    return (
        <SockContext.Provider value={{ messages, sendMessage }}>
            {props.children}
        </SockContext.Provider>
    )
}