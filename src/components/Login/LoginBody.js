import React from 'react'
import logo from './logo.png'
import './style.css'

export default function LoginBody({ handleSubmit, user, setUser, pwd, setPwd }) {
    return (
        <div className="login-container">
            <div className="main">
                <div className="container-lg a-container" id="a-container">
                    <form className="form" id="a-form" onSubmit={handleSubmit}>
                        <h2 className="form_title title"> MAXPOWER CHAT</h2>
                        <div className="form__icons">
                            <img className="form__icon" src={logo} alt="" />
                        </div><span className="form__span"></span>
                        <input className="form__input" type="text" placeholder="Usuario" value={user} onChange={(e) => { setUser(e.target.value) }} />
                        <input className="form__input" type="password" placeholder="Contraseña" value={pwd} onChange={(e) => { setPwd(e.target.value) }} />
                        <button type="submit" className="form__button button submit">INICIAR SESIÓN</button>
                    </form>
                </div>
                <div className="switch" id="switch-cnt">
                    <div className="switch__circle"></div>
                    <div className="switch__circle switch__circle--t"></div>
                    <div className="switch__container" id="switch-c1">

                        <h2 className="switch__title title"> ¡Bienvenido! </h2>
                        <p className="switch__description description">Para permanecer conectado a nuestro chat, debe ingresar con su cuenta personal.</p>
                    </div>
                </div>
            </div>
        </div>


    )
}
