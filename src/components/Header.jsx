function Header() {
  return (
    <header style={styles.header}>
      <div>
        <h1 style={styles.title}>Sistema de RH</h1>
        <p style={styles.subtitle}>
          Painel administrativo • Design SaaS moderno
        </p>
      </div>

      <div style={styles.avatar}>JD</div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },
  title: {
    margin: 0,
    color: "#ffefc2"
  },
  subtitle: {
    margin: 0,
    fontSize: "14px",
    color: "#9ca3af"
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 8,
    background: "linear-gradient(135deg,#6ee7b7,#60a5fa)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold"
  }
};

export default Header;