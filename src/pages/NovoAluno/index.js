import "./styles.css";
import { Link, useParams, useHistory } from 'react-router-dom';
import { FiCornerDownLeft } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from '../../service/api'

export default function NovoAluno() {

    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState(0);
    const history = useNavigate();
    const token = localStorage.getItem('token');
     const { alunoId } = useParams();
    const authorization = {
        authorization: `Bearer ${token}`
     } 

     function loadAluno() {
        console.log('Carregando aluno com ID:', id); // Para depuração
       {try {
        
            api.get(`/api/Alunos/${alunoId}`, { headers: authorization })
                .then(response => {
                    console.log('Aluno carregado:', response.data); // Para depuração
                    setId(response.data.id);
                    setNome(response.data.nome);
                    setEmail(response.data.email);
                    setIdade(response.data.idade);
                })
                .catch(error => {
                    console.error('Erro ao carregar aluno:', error);
                    alert('Erro ao carregar aluno');
                });
       } catch (error) {
            console.error('Erro ao carregar aluno:', error);
            alert('Erro ao carregar aluno');
        }   
        
       }}  

       async function saveOrUpdate(event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário de recarregar a página
        const data = {
            nome,
            email,
            idade
        }
        try {
            if(alunoId === '0' || alunoId === 0) {
               await api.post('/api/Alunos', data, { headers: authorization });
                alert('Aluno cadastrado com sucesso!');
            } else {
                data.id = id; // Adiciona o ID do aluno aos dados para atualização
                console.log('Atualizando aluno com ID:', alunoId, 'com dados:', data); // Para depuração
                await api.put(`/api/Alunos/${id}`, data, { headers: authorization });
                alert('Aluno atualizado com sucesso!');
            }   
        } catch (error) {
           console.error('Erro ao salvar ou atualizar aluno:', error);
            alert('Erro ao salvar ou atualizar aluno'); 
        }

        history('/alunos'); // Redireciona para a lista de alunos após salvar ou atualizar

       }

       useEffect(() => {
        if (alunoId === "0") {
            return;
        }
        loadAluno();
        // eslint-disable-next-line
    }, [alunoId])

   
    console.log('alunoId:', alunoId); // Para depuração
    const isNovo = alunoId === 0 || alunoId === "0" || alunoId === ":0";

    return (
        <div className="novo-aluno-container">
            <div className="content">
                <h1>{isNovo ? 'Incluir Novo Aluno' : 'Atualizar Aluno'}</h1>
                <form onSubmit={saveOrUpdate} autoComplete="off">
                    <input placeholder="Nome" name="nome" autoFocus value={nome} onChange={e => setNome(e.target.value)}/>
                    <input placeholder="Email" name="email" type="email"value={email}onChange={e => setEmail(e.target.value)} />
                    <input placeholder="Idade" name="idade" type="number" min="0"value={idade}onChange={e => setIdade(e.target.value)} />
                    <button className="button" type="submit">{isNovo ? "Cadastrar" : "Atualizar"}</button>
                </form>
                <Link className="back-link" to="/alunos">
                    <FiCornerDownLeft size={22} color="#17202a" />
                    Voltar para menu Alunos
                </Link> 
            </div>
        </div>
    );
}