import { useEffect, useRef, useState } from "react"
import io from "socket.io-client"

const useChat = () => {
    const [messages, setMessages] = useState([])
    const [server, setServer] = useState(false)
    const socket = useRef()

    useEffect(() => {
        socket.current = io("http://localhost:5000")

        socket.current.emit('server_conn')

        /*socket.current.on(
            "newChatMessage",
            ({ message }) => {
                setMessages(messages => [...messages, message]);
            }
        );*/

        return () => {
            socket.current.disconnect()
        }
    }, [])

    const sendMessage = ({ message }) => {
        socket.current.emit("newChatMessage", { message })
    }

    return { messages, sendMessage }
};

export default useChat