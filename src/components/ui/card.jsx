
export function Card({ children }) {
  return <div style={{
    border: "1px solid #ddd",
    borderRadius: "1rem",
    padding: "1rem",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  }}>{children}</div>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}
