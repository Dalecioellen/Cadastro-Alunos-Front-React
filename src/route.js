import react from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Alunos from "./pages/Alunos";
import NovoAluno from "./pages/NovoAluno";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path= "/alunos" element={<Alunos/>} />
        <Route path="/aluno/novo/:alunoId" element={<NovoAluno/>} />
      
      </Routes>
    </BrowserRouter>
  );
}   

// React Router v6+
// Usa <Routes> no lugar de <Switch>
// Usa element={<Componente />} no lugar de component={Componente}
//
// Exemplo:
// <Routes>
//   <Route path="/home" element={<Home />} />
// </Routes>

// React Router v5
// Usa <Switch>
// Usa component={Componente}
//
// Exemplo:
// <Switch>
//   <Route path="/home" component={Home} />
// </Switch>