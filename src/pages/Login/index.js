import './styles.css'
import React from 'react'
import LogoImagem from '../../assets/Login-02.jpg'

export default function Login() {
    return (
        <div className="login-container">
            <section className="form">
          <img src={LogoImagem} alt="Logo"/>
                <form>
                    <input placeholder="User" />
                    <input type="password" placeholder="Password" />
                    <button class="button" type="submit">Login</button>
                </form>
            </section>
        </div>
    )
}
