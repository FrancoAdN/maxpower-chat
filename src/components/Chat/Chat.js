import React, { useState, useContext, useEffect } from 'react'
import './Chat.css'
import { SockContext } from '../../_useChat'
import userimg from './user.png'
import logo from './logo.png'



export default function Chat() {
    const { chats, sendMessageServer } = useContext(SockContext)




    useEffect(() => {
        setClient(chats)
    }, [chats])




    const [clientChats, setClient] = useState(chats)

    const [currentChat, setCurrentChat] = useState({})


    return (
        <div className="container-fluid main-chat">
            <div className="row h-100 justify-content-center">
                <div className="col-3 h-100 bg-light" style={{ borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px' }}>

                    <div className="row toprow">
                        <div className="mx-auto my-auto">
                            <img src={logo} style={{ height: '40px' }} className="rounded-circle" alt="mxlogo" />
                            <span style={{ marginLeft: '10px', fontSize: '19px' }}>Maxpower Industrial Automation</span>
                        </div>
                    </div>

                    <div className="row left-row d-flex flex-column">
                        {
                            clientChats.map(chat => (
                                <ChatClient
                                    key={chat.socket_id}
                                    client={chat}
                                    change={setCurrentChat}
                                />
                            ))
                        }
                    </div>
                </div>

                <div className="col-6 h-100 bg-white">
                    <ClientContent client={currentChat} emitMsg={sendMessageServer} />
                </div>

                {/* <div className="col-2 h-100 div-info">
                    <InfoChat />
                </div> */}
                <InfoChat chat={currentChat} />



            </div>
        </div>
    )
}


// function ChatClient({ client, change }) {
//     if (client.messages.length > 0) {
//         return (
//             <div className="d-flex flex-row w-100"
//                 style={{ height: '60px', borderBottom: '1px solid black' }}
//                 onClick={() => change(client)}>
//                 <div className="h-100 d-flex flex-column" style={{ width: '90%' }}>
//                     <span style={{ fontSize: '20px', marginLeft: '20px', color: '#ce110a' }}>{client.name}</span>
//                     <span className="text-muted" style={{ fontSize: '12px', marginLeft: '20px' }}>{client.messages[client.messages.length - 1].msg}</span>
//                 </div>
//                 <div className="h-100" style={{ width: '10%' }}>
//                     <FromServerTick from={client.messages[client.messages.length - 1].from} />
//                 </div>
//                 {/* <span className="mx-auto" style={{ fontSize: '20px' }}>{client.name}</span>
//                 <span className="mx-auto" style={{ fontSize: '12px' }}>{client.messages[client.messages.length - 1].msg}</span> */}
//             </div>
//         )
//     } else if (client) {
//         return (
//             <div className="d-flex flex-column w-100"
//                 style={{ height: '60px', borderBottom: '1px solid black' }}
//                 onClick={() => change(client)}>
//                 <span className="mx-auto" style={{ fontSize: '20px' }}>{client.name}</span>

//             </div>
//         )
//     } else {
//         return (<div></div>)
//     }

// }

function ClientContent({ client, emitMsg }) {
    const [text, setText] = useState('')

    const sendMessage = () => {

        const message = {
            to: client.socket_id,
            text
        }

        emitMsg(message)
        setText('')
    }

    if (client.messages) {
        return (
            <div className="row h-100">
                <div className="w-100 mainrow">
                    <div className="content d-flex flex-column overflow-auto">
                        {/* MESSAGES HERE */

                            client.messages.map((message, i) => (
                                <PrintMessage key={i} message={message} />
                            ))
                        }
                    </div>
                    <div className="send-div">
                        <div className="in-msg d-flex justify-content-around">
                            <input
                                type="text"
                                value={text}
                                onChange={e => setText(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === "Enter") {
                                        e.preventDefault()
                                        sendMessage()
                                    }
                                }}
                            />
                            <span className="text-primary" onClick={sendMessage}>Send</span>
                        </div>
                    </div>
                </div>



            </div>

        )
    }
    return (
        <div className="row h-100">
            <div className="w-100 mainrow">
            </div>
        </div>
    )

}


function PrintMessage({ message }) {
    if (message.from) {
        // Message from client
        return (<div className="mw-75" style={{ margin: '15px', maxWidth: '70%' }}>
            <span className="mw-75" style={{ background: '#e3e3e3', padding: '10px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '30px' }}>
                {message.msg}
            </span>
        </div >)
    }

    // Message from server
    return (<div style={{ margin: '10px' }}>
        <span className="d-inline float-right" style={{ background: '#e2130b', padding: '10px', paddingLeft: '20px', paddingRight: '20px', borderRadius: '30px', maxWidth: '70%', color: '#fff' }}>
            {message.msg}
        </span>
    </div>)



}

function InfoChat({ chat }) {
    if (chat.messages) {
        return (
            <div className="col-2 h-100 div-info bg-light">
                <div style={{ textAlign: 'center' }} className="center-v">
                    <img src={userimg} style={{ width: '165px' }} alt="user" className="rounded-circle" />
                    <p className="text-dark" style={{ fontSize: '26px', marginTop: '10px' }}>{chat.name}</p>
                    <p className="text-muted" style={{ fontSize: '18px' }}>{chat.emp}</p>
                    <div>
                        <img src="https://img.icons8.com/ios/24/000000/send-mass-email.png" alt="env" />
                        <p style={{ marginTop: '7px' }}>{chat.email}</p>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        <img src="https://img.icons8.com/metro/24/000000/phone.png" />
                        <p style={{ marginTop: '7px' }}>{chat.tel}</p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="col-2 h-100 div-info bg-light">

        </div>
    )

}

// function FromServerTick({ from }) {
//     if (from)
//         return (
//             <div style={{ marginTop: '24px' }}>
//                 <img src="https://img.icons8.com/ios-filled/13/000000/double-tick.png" />
//             </div>
//         )

//     return (<div></div>)

// }