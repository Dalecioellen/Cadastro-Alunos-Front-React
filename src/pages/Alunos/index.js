import './styles.css';
import React,{useState, useEffect}  from 'react'
import logoCadastro from '../../assets/cadastro.png';
import { Link, useNavigate } from 'react-router-dom';
import { FiXCircle, FiEdit, FiUserX } from 'react-icons/fi';
import api from '../../service/api'


export default function Alunos() {

    const [alunos, setAlunos] = useState([]);   
   
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    const [searchInput, setSearchInput] = useState('');
    const [filter, setFilter] = useState('');


    const authorization  = {
        authorization: `Bearer ${localStorage.getItem('token')}`    
    };

const navigate = useNavigate();

function logout() {
    console.log('Clicou no logout'); // Debug
    try {
        localStorage.clear();
        window.location.href = '/';
    } catch (error) {
        alert('Erro ao fazer logout');
        console.error(error);
    }
}

function editarAluno(id) {

    try {
         console.log('Editando aluno com ID:', id); // Para depuração
    navigate(`/aluno/novo/${id}`);
    } catch (error) {   
        console.error('Erro ao editar aluno:', error);
        alert('Erro ao editar aluno');      
        
    }
   
}

function excluirAluno(id) {
    try {
        if(window.confirm('Tem certeza que deseja excluir este aluno?')) {
            console.log('Excluindo aluno com ID:', id); // Para depuração
            api.delete(`/api/Alunos/${id}`, { headers: authorization })
                .then(() => {
                    setAlunos(alunos.filter(aluno => aluno.id !== id));
                    alert('Aluno excluído com sucesso!');
                })
                .catch(error => {
                    console.error('Erro ao excluir aluno:', error);
                    alert('Erro ao excluir aluno');
                });
        }   
        
    } catch (error) {
        console.error('Erro ao excluir aluno:', error);
        alert('Erro ao excluir aluno');
        
    }}

const  searchAluno = (searchValue) =>
    {
        setSearchInput(searchValue);
  if(searchValue !==  '') {
    const dadosFiltrados = alunos.filter((item) =>{
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase());
    } )
    setFilter(dadosFiltrados);
    } else {    

   setFilter(alunos);

    }}

    useEffect(() => {
        api.get('/api/Alunos', { headers: authorization })
            .then(response => {
                setAlunos(response.data);
                
            }, token)
        })
          

    return (
        <div className="aluno-container">
            <header>
                <img src={logoCadastro} alt="Logo Cadastro" />
                <span>Bem vindo, <strong>{email}</strong></span>
                
                <Link className="button" to="/aluno/novo/0">Novo Aluno</Link>


                <button  onClick={logout} type='button'>
                    <FiXCircle size={35} color="#17202a" />
                </button>
            </header>
            <form>
                <input type="text" placeholder="Filtrar por nome" onChange={(e)=> searchAluno(e.target.value)}/>
           
            </form>
            <h1>Alunos Cadastrados</h1>
            {searchInput.length > 1 ? (
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
                        {filter.map(aluno => (
                            <tr key={aluno.id}>
                                <td>{aluno.nome}</td>
                                <td>{aluno.email}</td>
                                <td>{aluno.idade}</td>
                                <td>
                                    <button onClick={() => editarAluno(aluno.id)} type="button" title="Editar"><FiEdit size={22} color="#17202a" /></button>
                                    <button onClick={() => excluirAluno(aluno.id)} type="button" title="Remover"><FiUserX size={22} color="#17202a" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
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
                        {alunos.map(aluno => (
                            <tr key={aluno.id}>
                                <td>{aluno.nome}</td>
                                <td>{aluno.email}</td>
                                <td>{aluno.idade}</td>
                                <td>
                                    <button onClick={() => editarAluno(aluno.id)} type="button" title="Editar"><FiEdit size={22} color="#17202a" /></button>
                                    <button onClick={() => excluirAluno(aluno.id)} type="button" title="Remover"><FiUserX size={22} color="#17202a" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}