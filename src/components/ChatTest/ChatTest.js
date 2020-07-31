import React, { useState, useContext, useEffect } from 'react'
import { SockContext } from '../../_useChat'
import './style.css'
import logo from './logo.png'
import user from './user.png'

export default function ChatTest() {
    const { chats, sendMessageServer } = useContext(SockContext)

    useEffect(() => {
        setClient(chats)
    }, [chats])

    const [clientChats, setClient] = useState(chats)

    const [currentChat, setCurrentChat] = useState({})


    return (
        <div className="all-wrapper menu-side no-padding-content">
            <div className="layout-w">
                <MenuSideCompact />
                <Content
                    clientChats={clientChats}
                    setCurrentChat={setCurrentChat}
                    currentChat={currentChat}
                    sendMessageServer={sendMessageServer} />
            </div>
        </div>
    )
}


function MenuSideCompact() {
    return (
        <div className="desktop-menu menu-side-compact-w menu-activated-on-hover color-scheme-dark">
            <div className="logo-w">
                <a className="logo">
                    <img src={logo} alt="logo" /></a>
            </div>
            <div className="menu-and-user">
                <div className="logged-user-w">
                    <div className="logged-user-i">
                        <div className="avatar-w">
                            <img alt="" src={user} />
                        </div>

                    </div>
                </div>
                <ul className="main-menu">
                    <li className="has-sub-menu">
                        <a>
                            <div className="icon-w">
                                <i className="os-icon os-icon-window-content"></i>
                            </div>
                        </a>

                    </li>

                </ul>

            </div>
        </div>
    )
}

function Content({ clientChats, setCurrentChat, currentChat, sendMessageServer }) {
    return (
        <div className="content-w">
            <div className="content-i">
                <div className="content-box">
                    <div className="full-chat-w">
                        <div className="full-chat-i">
                            <div className="full-chat-left">
                                <div className="os-tabs-w">
                                    <ul className="nav nav-tabs upper ">
                                        <li className="nav-item">
                                            <a className="nav-link active" data-toggle="tab">
                                                <i className="os-icon os-icon-mail-14"></i><span>Chats</span></a>
                                        </li>

                                    </ul>
                                </div>

                                <div className="user-list">
                                    {
                                        clientChats.map(chat => (
                                            <User key={chat.socket_id} client={chat} change={setCurrentChat} />
                                        ))
                                    }


                                </div>
                            </div>

                            <ClientContent client={currentChat} emitMsg={sendMessageServer} />

                            <InfoChat chat={currentChat} />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


function User({ client, change }) {
    if (client.messages.length > 0) {
        return (
            <div className="user-w" onClick={() => change(client)}>
                <div className="avatar with-status status-green">
                    <img alt="" src={user} /></div>
                <div className="user-info">
                    {/* <div className="user-date">2 hours</div> */}
                    <div className="user-name">{client.name}</div>
                    <div className="last-message">{client.messages[client.messages.length - 1].msg}</div>
                </div>
            </div>
        )
    } else if (client) {
        return (
            <div className="user-w" onClick={() => change(client)}>
                <div className="avatar with-status status-green">
                    <img alt="" src={user} /></div>
                <div className="user-info">
                    {/* <div className="user-date">2 hours</div> */}
                    <div className="user-name">{client.name}</div>
                    {/* <div className="last-message">Vista previa del mensaje... </div> */}
                </div>
            </div>
        )
    }

    return (
        <div></div>
    )
}

function PrintMessage({ message }) {
    if (message.from) {
        // Message from client
        return (
            <div className="chat-message">
                <div className="chat-message-content-w">
                    <div className="chat-message-content">
                        {message.msg}
                    </div>
                </div>
                <div className="chat-message-avatar">
                    <img alt="" src={user} />
                </div>
                {/* <div className="chat-message-date">{StampToDate(message.time)}</div> */}
            </div>

        )
    }

    // Message from Server
    return (
        <div className="chat-message self">
            <div className="chat-message-content-w">
                <div className="chat-message-content">
                    {message.msg}
                </div>
            </div>
            {/* <div className="chat-message-date">10:00am</div> */}
            <div className="chat-message-avatar">
                <img alt="" src={logo} /></div>
        </div>
    )
}


function InfoChat({ chat }) {

    if (chat.messages) {
        return (
            <div className="full-chat-right">
                <div className="user-intro">
                    <div className="avatar">
                        <img alt="" src={user} /></div>
                    <div className="user-intro-info">
                        <h5 className="user-name">{chat.name}</h5>
                        <div className="user-sub">{chat.emp}</div>

                    </div>
                </div>
                <div className="chat-info-section">
                    <div className="ci-header">
                        <i className="os-icon os-icon-documents-03"></i><span> Información </span>
                    </div>
                    <div className="ci-content">
                        <div className="ci-file-list">
                            <ul>
                                <i className="os-icon os-icon-phone-15"></i> <a>{chat.tel}</a> <br />
                                <i className="os-icon os-icon-mail-01"></i> <a>{chat.email}</a><br />
                                {/* <i className="os-icon os-icon-mail-07"></i> <a href="apps_full_chat.html#"> - </a> */}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div className="full-chat-right">
        </div>
    )
}

function ClientContent({ client, emitMsg }) {
    const [text, setText] = useState('')

    const sendMessage = () => {

        const message = {
            to: client.socket_id,
            text
        }

        emitMsg(message)
        // console.log(message)
        setText('')
    }

    if (client.messages) {
        return (
            <div className="full-chat-middle">
                <div className="chat-head">
                    <div className="user-info">
                        <span>Usuario1</span>
                    </div>

                </div>

                <div className="chat-content-w">
                    <div className="chat-content">
                        {
                            client.messages.map((message, i) => (
                                <PrintMessage key={i} message={message} />
                            ))
                        }
                    </div>
                </div>

                <div className="chat-controls">
                    <div className="chat-input">
                        <input
                            placeholder="Escribir mensaje..."
                            type="text"
                            value={text}
                            onChange={e => setText(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === "Enter") {
                                    e.preventDefault()
                                    sendMessage()
                                }
                            }} />
                    </div>
                    <div className="chat-input-extra">

                        <div className="chat-btn">
                            <button className="btn btn-primary btn-sm" onClick={sendMessage}>Enviar</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div className="full-chat-middle">
            <div className="chat-head">
                <div className="user-info">
                    <span></span>
                </div>

            </div>

            <div className="chat-content-w">
                <div className="chat-content">

                </div>
            </div>



        </div>
    )

}

