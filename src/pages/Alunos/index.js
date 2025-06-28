import react from 'react';
import './styles.css';
import logoCadastro from '../../assets/cadastro.png';
import { Link } from 'react-router-dom';
import { FiXCircle, FiEdit, FiUserX } from 'react-icons/fi';

export default function Alunos() {
    return (
        <div className="aluno-container">
            <header>
                <img src={logoCadastro} alt="Logo Cadastro" />
                
                <Link className="button" to="/aluno/novo/0">Novo Aluno</Link>
                <button type='button'>
                    <FiXCircle size={35} color="#17202a" />
                </button>
            </header>
            <form>
                <input type="text" placeholder="Nome" />
                <button type="button" className="button">Filtrar por aluno</button>
            </form>
            <h1>Alunos Cadastrados</h1>
            <table className="aluno-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Idade</th>
                        <th style={{ textAlign: 'right', width: '90px', paddingRight: '18px' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Maria Oliveira</td>
                        <td>ellen.com.br</td>
                        <td>28</td>
                        <td>
                            <button type="button" title="Editar"><FiEdit size={22} color="#17202a" /></button>
                            <button type="button" title="Remover"><FiUserX size={22} color="#17202a" /></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}