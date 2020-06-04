import React, { useState, useContext } from 'react'
import './Chat.css'
import { SockContext } from '../Store'

export default function Chat() {
    const [text, setText] = useState('')
    const { messages, sendMessage } = useContext(SockContext)

    return (
        <div>
            <div id='chat' style={{ width: '350px', height: '460px', borderRadius: '10px', background: '#e2130b', border: '1px solid #e2130b', display: 'block' }}>
                <div className="w-100" style={{ height: '30px', color: '#fff' }}>
                    <center><h5>Maxpower chat</h5></center>
                </div>
                <div className="w-100 content d-flex flex-column overflow-auto" style={{ height: '380px', background: '#fff' }}>
                    {
                        messages.map((msg, i) => (
                            <ChatMessage key={i} msg={msg} />
                        ))
                    }
                </div>
                <div className="w-100 d-flex justify-content-around" style={{ height: '50px' }}>
                    <div className="in-msg d-flex justify-content-around">
                        <input
                            type="text"
                            value={text}
                            onChange={e => setText(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === "Enter") {
                                    e.preventDefault()
                                    sendMessage({ from: 1, msg: text })
                                    setText('')
                                }
                            }}
                        />
                        <button type="button"
                            className="btn mx-auto my-auto"
                            style={{ borderRadius: '30px', background: '#ffffff' }}
                            onClick={e => {
                                e.preventDefault()
                                sendMessage({ from: 1, msg: text })
                                setText('')
                            }}
                        >
                            <img src="https://img.icons8.com/small/16/000000/filled-sent.png" />
                        </button>
                    </div>
                </div>
            </div>
            <button className="rounded-circle chat-btn" onClick={e => {
                e.preventDefault()
                const chat = document.getElementById('chat').style.display
                if (chat == 'block')
                    document.getElementById('chat').style.display = 'none'
                else
                    document.getElementById('chat').style.display = 'block'
            }}>
                <img src="https://img.icons8.com/wired/40/000000/chat.png" alt="..." style={{ margin: '5px' }} />
            </button>

        </div>

    )
}

function ChatMessage({ msg }) {
    if (msg.from) {
        return (<div style={{ margin: '10px' }}>
            <span className="d-inline float-right" style={{ background: '#e2130b', padding: '10px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '30px', maxWidth: '70%', color: '#fff' }}>{msg.msg}</span>
        </div>)
    } else {
        return (<div className="mw-75" style={{ margin: '15px', maxWidth: '70%' }}>
            <span className="mw-75" style={{ background: '#e3e3e3', padding: '10px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '30px' }}>
                {msg.msg}
            </span>
        </div >)
    }
}
