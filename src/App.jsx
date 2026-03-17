// src/App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

/*
  Modern SaaS-style Sistema de RH - App.jsx
  - API base: http://localhost:8080/api/funcionarios
  - Substitua o arquivo src/App.jsx com este conteúdo
*/

export default function App() {
  const API = "http://localhost:8080/api/funcionarios";

  const [funcionarios, setFuncionarios] = useState([]);
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // fetch
  const fetchFuncionarios = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await axios.get(API);
      setFuncionarios(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erro ao buscar funcionários:", err);
      setErrorMsg("Erro ao buscar funcionários (ver console).");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  // cadastrar ou atualizar
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!nome.trim() || !cargo.trim()) {
      setErrorMsg("Preencha nome e cargo.");
      return;
    }

    const payload = { nome: nome.trim(), cargo: cargo.trim() };

    try {
      if (editandoId) {
        await axios.put(`${API}/${editandoId}`, payload);
      } else {
        await axios.post(API, payload);
      }
      setNome("");
      setCargo("");
      setEditandoId(null);
      fetchFuncionarios();
    } catch (err) {
      console.error("Erro ao salvar funcionário:", err);
      setErrorMsg("Erro ao salvar funcionário (ver console).");
    }
  };

  // iniciar edição
  const handleEdit = (f) => {
    setEditandoId(f.id);
    setNome(f.nome ?? "");
    setCargo(f.cargo ?? "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // excluir
  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente excluir este funcionário?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchFuncionarios();
    } catch (err) {
      console.error("Erro ao excluir:", err);
      setErrorMsg("Erro ao excluir (ver console).");
    }
  };

  // métricas simples (demo)
  const total = funcionarios.length;
  // Como exemplo: consideramos todos ativos. Se sua API tiver campos (createdAt, status) adapte aqui.
  const ativos = total;
  const novas = 0;

  return (
    <div style={styles.page}>
      <div style={styles.appShell}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.brand}>Sistema de RH</h1>
            <p style={styles.tag}>Painel administrativo • Design SaaS moderno</p>
          </div>
          <div style={styles.avatarArea}>
            <div style={styles.avatar}>JD</div>
          </div>
        </header>

        <main style={styles.main}>
          <aside style={styles.statsColumn}>
            <div style={styles.searchCard}>
              <input
                placeholder="Pesquisar funcionários..."
                style={styles.searchInput}
                onChange={(e) => {
                  const q = e.target.value.toLowerCase();
                  // Busca client-side apenas para navegação local
                  if (!q) return fetchFuncionarios();
                  setFuncionarios((prev) =>
                    prev.filter(
                      (p) =>
                        (p.nome ?? "").toLowerCase().includes(q) ||
                        (p.cargo ?? "").toLowerCase().includes(q)
                    )
                  );
                }}
              />
            </div>

            <div style={styles.metricGrid}>
              <div style={{ ...styles.metric, ...styles.metricGold }}>
                <div style={styles.metricValue}>{total}</div>
                <div style={styles.metricLabel}>Total</div>
              </div>
              <div style={{ ...styles.metric, ...styles.metricGreen }}>
                <div style={styles.metricValue}>{novas}</div>
                <div style={styles.metricLabel}>Novas</div>
              </div>
              <div style={{ ...styles.metric, ...styles.metricBlue }}>
                <div style={styles.metricValue}>{ativos}</div>
                <div style={styles.metricLabel}>Ativos</div>
              </div>
            </div>
          </aside>

          <section style={styles.contentColumn}>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>
                {editandoId ? "Editar Funcionário" : "Cadastrar Funcionário"}
              </h2>

              <form onSubmit={handleSubmit} style={styles.form}>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <input
                  style={styles.input}
                  type="text"
                  placeholder="Cargo"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                />
                <button type="submit" style={styles.primaryButton}>
                  {editandoId ? "Atualizar" : "Cadastrar"}
                </button>
                {editandoId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditandoId(null);
                      setNome("");
                      setCargo("");
                      setErrorMsg("");
                    }}
                    style={styles.ghostButton}
                  >
                    Cancelar
                  </button>
                )}
              </form>

              {errorMsg && <div style={styles.error}>{errorMsg}</div>}
            </div>

            <div style={{ height: 20 }} />

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Lista de Funcionários</h3>

              {loading ? (
                <div style={styles.loading}>Carregando...</div>
              ) : funcionarios.length === 0 ? (
                <div style={styles.empty}>Nenhum funcionário cadastrado.</div>
              ) : (
                funcionarios.map((f) => (
                  <div key={f.id} style={styles.item}>
                    <div style={styles.itemInfo}>
                      <div style={styles.itemName}>{f.nome}</div>
                      <div style={styles.itemCargo}>{f.cargo}</div>
                    </div>

                    <div style={styles.itemActions}>
                      <button
                        style={styles.editButton}
                        onClick={() => handleEdit(f)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = "0.9";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = "1";
                        }}
                      >
                        Editar
                      </button>

                      <button
                        style={styles.deleteButton}
                        onClick={() => handleDelete(f.id)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = "0.9";
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = "1";
                          e.currentTarget.style.transform = "none";
                        }}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>

        <footer style={styles.footer}>
          <div>© {new Date().getFullYear()} Sistema de RH • Protótipo</div>
          <div style={{ opacity: 0.6 }}>Conectado a {API}</div>
        </footer>
      </div>
    </div>
  );
}

/* Styles - moderno / escuro com profundidade */
const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 600px at 10% 10%, rgba(8,10,26,0.6), transparent), linear-gradient(180deg,#071026 0%, #0b1220 100%)",
    color: "#e6eef8",
    display: "flex",
    justifyContent: "center",
    padding: 32,
    fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
  },

  appShell: {
    width: "100%",
    maxWidth: 1100,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 28px",
    background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
    borderRadius: 12,
    boxShadow: "0 8px 30px rgba(2,6,23,0.6)",
    border: "1px solid rgba(255,255,255,0.03)"
  },

  brand: {
    margin: 0,
    fontSize: 22,
    color: "#ffefc2"
  },

  tag: {
    margin: 0,
    fontSize: 12,
    color: "rgba(230,238,248,0.6)"
  },

  avatarArea: {
    display: "flex",
    alignItems: "center",
    gap: 12
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: "linear-gradient(135deg,#6ee7b7,#60a5fa)",
    color: "#082032",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700
  },

  main: {
    display: "flex",
    gap: 20,
    alignItems: "flex-start"
  },

  statsColumn: {
    width: 280,
    display: "flex",
    flexDirection: "column",
    gap: 16
  },

  searchCard: {
    padding: 14,
    borderRadius: 10,
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.03)"
  },

  searchInput: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.03)",
    color: "#e6eef8",
    outline: "none"
  },

  metricGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 12
  },

  metric: {
    padding: 14,
    borderRadius: 10,
    color: "#fff",
    boxShadow: "inset 0 -6px 18px rgba(0,0,0,0.4), 0 6px 20px rgba(2,6,23,0.6)",
    minHeight: 80,
  },

  metricGold: {
    background: "linear-gradient(135deg,#b7791f,#f59e0b)"
  },

  metricGreen: {
    background: "linear-gradient(135deg,#10b981,#059669)"
  },

  metricBlue: {
    background: "linear-gradient(135deg,#3b82f6,#2563eb)"
  },

  metricValue: {
    fontSize: 24,
    fontWeight: 700
  },

  metricLabel: {
    fontSize: 12,
    opacity: 0.9
  },

  contentColumn: {
    flex: 1
  },

  card: {
    background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
    padding: 18,
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(2,6,23,0.6)",
    border: "1px solid rgba(255,255,255,0.03)"
  },

  cardTitle: {
    margin: "0 0 14px 0",
    color: "#e6eef8",
    fontSize: 16
  },

  form: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    flexWrap: "wrap"
  },

  input: {
    flex: 1,
    minWidth: 140,
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.02)",
    color: "#e6eef8",
    outline: "none"
  },

  primaryButton: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    background: "linear-gradient(90deg,#60a5fa,#3b82f6)",
    color: "#06283d",
    cursor: "pointer",
    fontWeight: 700
  },

  ghostButton: {
    padding: "8px 14px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.06)",
    background: "transparent",
    color: "#dbeafe",
    cursor: "pointer"
  },

  error: {
    marginTop: 12,
    color: "#ffb4b4",
    fontSize: 13
  },

  loading: {
    padding: 12,
    color: "rgba(230,238,248,0.8)"
  },

  empty: {
    padding: 12,
    color: "rgba(230,238,248,0.7)"
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px dashed rgba(255,255,255,0.03)"
  },

  itemInfo: {
    display: "flex",
    flexDirection: "column"
  },

  itemName: {
    fontWeight: 600,
    color: "#fff"
  },

  itemCargo: {
    color: "rgba(230,238,248,0.6)",
    fontSize: 13
  },

  itemActions: {
    display: "flex",
    gap: 8,
    alignItems: "center"
  },

  editButton: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    background: "rgba(96,165,250,0.15)",
    color: "#bde0ff",
    cursor: "pointer",
    fontWeight: 600
  },

  deleteButton: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    background: "rgba(239,68,68,0.15)",
    color: "#ffd6d6",
    cursor: "pointer",
    fontWeight: 600
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    color: "rgba(230,238,248,0.6)",
    paddingTop: 8,
    fontSize: 13
  }
};