import React, { useState } from 'react'
import axios from 'axios'
import ChatProv from '../../_useChat'
import LoginBody from './LoginBody'
import ChatTest from '../ChatTest/ChatTest'

export default function Login() {
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [logged, setLogged] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const url = `http://api.maxpower-ar.com/login?usr=${user}&&pwd=${pwd}`
        const req = await axios.get(url)
        console.log(req.data)
        if (req.data)
            setLogged(true)
        else {
            setUser('')
            setPwd('')
        }
    }
    if (logged) {
        return (
            <ChatProv>
                <ChatTest />
            </ChatProv>

        )
    }
    return (
        <LoginBody handleSubmit={handleSubmit} user={user} setUser={setUser} pwd={pwd} setPwd={setPwd} />

    )
}

