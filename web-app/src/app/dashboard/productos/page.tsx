import Sidebar from "@/components/Sidebar";

const productos = [
  { nombre: "Leche Lala 1L", categoria: "Lácteos", precio: "$28.50", stock: 40, estado: "Activo" },
  { nombre: "Frijol Negro 1kg", categoria: "Granos", precio: "$45.00", stock: 0, estado: "Activo" },
  { nombre: "Atún Dolores 140g", categoria: "Enlatados", precio: "$18.00", stock: 120, estado: "Activo" },
  { nombre: "Aceite Nutrioli 1L", categoria: "Aceites", precio: "$62.00", stock: 15, estado: "Inactivo" },
];

function stockStyle(s: number) {
  if (s === 0) return { backgroundColor: "#fee2e2", color: "#b91c1c", padding: "2px 8px", borderRadius: "999px", fontSize: "12px", fontWeight: 600 };
  if (s <= 20) return { backgroundColor: "#ffedd5", color: "#c2410c", padding: "2px 8px", borderRadius: "999px", fontSize: "12px", fontWeight: 600 };
  return { backgroundColor: "#dcfce7", color: "#15803d", padding: "2px 8px", borderRadius: "999px", fontSize: "12px", fontWeight: 600 };
}
function estadoStyle(e: string) {
  return e === "Activo"
    ? { backgroundColor: "#dcfce7", color: "#15803d", padding: "2px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: 600 }
    : { backgroundColor: "#fee2e2", color: "#b91c1c", padding: "2px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: 600 };
}

export default function ProductosPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Sidebar active="Productos" role="cliente" />
      <main style={{ flex: 1, padding: "24px" }}>
        <input type="text" placeholder="Buscar producto..."
          style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: "6px", padding: "8px 14px", fontSize: "14px", color: "#111", backgroundColor: "#fff", marginBottom: "20px", boxSizing: "border-box" }} />
        <div style={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "20px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "16px" }}>Catálogo de Productos</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                {["Nombre", "Categoría", "Precio", "Stock", "Estado"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "0 8px 10px 0", fontSize: "12px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {productos.map((p, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "12px 8px 12px 0", color: "#111", fontWeight: 500 }}>{p.nombre}</td>
                  <td style={{ padding: "12px 8px 12px 0", color: "#2563eb", fontWeight: 500 }}>{p.categoria}</td>
                  <td style={{ padding: "12px 8px 12px 0", color: "#374151" }}>{p.precio}</td>
                  <td style={{ padding: "12px 8px 12px 0" }}><span style={stockStyle(p.stock)}>{p.stock} pzs</span></td>
                  <td style={{ padding: "12px 8px 12px 0" }}><span style={estadoStyle(p.estado)}>{p.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "14px", paddingTop: "12px", borderTop: "1px solid #f3f4f6" }}>
            <span style={{ fontSize: "13px", color: "#6b7280" }}>4 resultados</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button style={{ border: "1px solid #d1d5db", borderRadius: "6px", padding: "4px 12px", fontSize: "13px", cursor: "pointer", backgroundColor: "#fff", color: "#374151" }}>← Ant</button>
              <button style={{ border: "1px solid #d1d5db", borderRadius: "6px", padding: "4px 12px", fontSize: "13px", cursor: "pointer", backgroundColor: "#fff", color: "#374151" }}>Sig →</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
