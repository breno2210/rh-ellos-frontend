function DashboardCards({ total }) {
  return (
    <div style={styles.container}>
      <div style={{ ...styles.card, background: "#f59e0b" }}>
        <h2>{total}</h2>
        <p>Total</p>
      </div>

      <div style={{ ...styles.card, background: "#10b981" }}>
        <h2>0</h2>
        <p>Novas</p>
      </div>

      <div style={{ ...styles.card, background: "#3b82f6" }}>
        <h2>{total}</h2>
        <p>Ativos</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px"
  },
  card: {
    flex: 1,
    padding: "20px",
    borderRadius: "10px",
    color: "#fff"
  }
};

export default DashboardCards;