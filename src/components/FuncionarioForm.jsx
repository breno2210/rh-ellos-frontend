function FuncionarioForm({
  nome,
  cargo,
  setNome,
  setCargo,
  onSubmit,
  editandoId
}) {
  return (
    <div style={styles.card}>
      <h3>
        {editandoId ? "Editar Funcionário" : "Cadastrar Funcionário"}
      </h3>

      <form onSubmit={onSubmit} style={styles.form}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Cargo"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          {editandoId ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  card: {
    background: "#1f2937",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px"
  },
  form: {
    display: "flex",
    gap: "10px"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "none"
  },
  button: {
    padding: "10px 15px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default FuncionarioForm;