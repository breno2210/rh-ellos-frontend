import { useEffect, useState } from "react";
import API from "./services/api";
import Header from "./components/Header";
import DashboardCards from "./components/DashboardCards";
import FuncionarioForm from "./components/FuncionarioForm";
import FuncionarioList from "./components/FuncionarioList";

function App() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const buscarFuncionarios = async () => {
    const res = await API.get("/funcionarios");
    setFuncionarios(res.data);
  };

  useEffect(() => {
    buscarFuncionarios();
  }, []);

  const salvar = async (e) => {
    e.preventDefault();
    const payload = { nome, cargo };

    if (editandoId) {
      await API.put(`/funcionarios/${editandoId}`, payload);
    } else {
      await API.post("/funcionarios", payload);
    }

    setNome("");
    setCargo("");
    setEditandoId(null);
    buscarFuncionarios();
  };

  const editar = (f) => {
    setEditandoId(f.id);
    setNome(f.nome);
    setCargo(f.cargo);
  };

  const excluir = async (id) => {
    await API.delete(`/funcionarios/${id}`);
    buscarFuncionarios();
  };

  return (
    <div style={{ padding: "40px", background: "#0b1220", minHeight: "100vh" }}>
      <Header />
      <DashboardCards total={funcionarios.length} />
      <FuncionarioForm
        nome={nome}
        cargo={cargo}
        setNome={setNome}
        setCargo={setCargo}
        onSubmit={salvar}
        editandoId={editandoId}
      />
      <FuncionarioList
        funcionarios={funcionarios}
        onEdit={editar}
        onDelete={excluir}
      />
    </div>
  );
}

export default App;