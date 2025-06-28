import React from "react";
import "./styles.css";
import { Link, useParams } from 'react-router-dom';
import { FiCornerDownLeft } from "react-icons/fi";

export default function NovoAluno() {
    const { alunoId } = useParams();
    console.log('alunoId:', alunoId); // Para depuração
    const isNovo = alunoId === 0 || alunoId === "0" || alunoId === ":0";

    return (
        <div className="novo-aluno-container">
            <div className="content">
                <h1>{isNovo ? 'Incluir Novo Aluno' : 'Atualizar Aluno'}</h1>
                <form autoComplete="off">
                    <input placeholder="Nome" name="nome" autoFocus />
                    <input placeholder="Email" name="email" type="email" />
                    <input placeholder="Idade" name="idade" type="number" min="0" />
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