import React, { useState } from 'react'
import './Contact.css'
import axios from 'axios'

export default function Contact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')
    const [emp, setEmp] = useState('')
    const [body, setBody] = useState('')
    return (
        <div className="main-div">
            <form className="d-flex flex-column main-form" onSubmit={
                e => {
                    e.preventDefault()
                    const contact = { name, email, tel, emp, body }
                    console.log(contact)
                    axios.post('http://localhost:5000/contact', contact)
                    setName('')
                    setEmail('')
                    setTel('')
                    setEmp('')
                    setBody('')
                }
            }>
                <h4>Pongase en contacto con nosotros:</h4>
                <input type="text" value={name} placeholder="Nombre:" required onChange={e => setName(e.target.value)} />
                <input type="email" value={email} placeholder="Email:" required onChange={e => setEmail(e.target.value)} />
                <input type="tel" value={tel} placeholder="Teléfono:" pattern="[0-9]{3} [0-9]{3} [0-9]{3}" required onChange={e => setTel(e.target.value)} />
                <input type="text" value={emp} placeholder="Empresa:" required onChange={e => setEmp(e.target.value)} />
                <textarea rows="4" value={body} placeholder="Haga su consulta" required onChange={e => setBody(e.target.value)} />
                <button type="submit" className="btn send-button">Enviar</button>
            </form>
        </div>
    )
}


/*

fetch('/api/form-submit-url', {
      method: 'POST',
      body: data,
    });
    */