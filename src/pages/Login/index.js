import './styles.css'
import React,{useState}  from 'react'
import LogoImagem from '../../assets/Login-02.jpg'
import api from '../../service/api'
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const navigate = useNavigate();
    
    async function login(event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a página
        const data = {
            email,  
            password   
        };
        try {
            const response = await api.post('/api/Account/LoginUser', data);
            console.log(response.data);
            localStorage.setItem('token', response.data.token); // Armazena o token no localStorage
            localStorage.setItem('email', email); // Salva o email digitado pelo usuário
           
            localStorage.setItem('expiration', response.data.expiration); // Armazena a data de expiração do token
            navigate('/alunos'); // Redireciona para a página inicial após o login bem
          
        } catch (error) {
            alert('Erro ao fazer login, verifique suas credenciais');
        }
    }

    return (
        <div className="login-container">
            <section className="form">
          <img src={LogoImagem} alt="Logo"/>
                <form onSubmit={login}>

                    {/* Campo de input para o email do usuário */}
                    <input placeholder="Email" 
                        value={email} // O valor do input é controlado pelo estado 'email'
                        onChange={e => setEmail(e.target.value)}/>

                    {/* Campo de input para a senha do usuário */}
                    <input type="password" placeholder="Password" 
                        value={password} // O valor do input é controlado pelo estado 'password'
                        onChange={e => setPassword(e.target.value)}/> 

                    {/* Botão para submeter o formulário de login */}
                    <button className="button" type="submit">Login</button>
                    
                </form>
            </section>
        </div>
    )
}
