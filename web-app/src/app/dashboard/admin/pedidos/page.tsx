"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "@/components/Sidebar";

type Pedido = {
  producto: string;
  cantidad: number;
};

export default function AdminPedidosPage() {
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const confirmarPedido = async () => {
    if (!producto.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Producto requerido",
        text: "Ingresa un producto.",
      });
      return;
    }

    if (cantidad <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Cantidad inválida",
        text: "La cantidad debe ser mayor a 0.",
      });
      return;
    }

    const result = await Swal.fire({
      title: "¿Confirmar pedido?",
      html: `
        <p><strong>Producto:</strong> ${producto}</p>
        <p><strong>Cantidad:</strong> ${cantidad}</p>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      setPedidos([
        ...pedidos,
        {
          producto,
          cantidad,
        },
      ]);

      Swal.fire({
        icon: "success",
        title: "Pedido registrado",
        text: "El pedido se ha guardado correctamente.",
      });

      setProducto("");
      setCantidad(1);
    }
  };

  const eliminarPedido = async (index: number) => {
    const result = await Swal.fire({
      title: "¿Eliminar pedido?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      setPedidos(pedidos.filter((_, i) => i !== index));

      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "Pedido eliminado correctamente.",
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
      }}
    >
      <Sidebar active="Pedidos" role="admin" />

      <main
        style={{
          flex: 1,
          padding: "24px",
          maxWidth: "760px",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "24px",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#111",
              marginBottom: "4px",
            }}
          >
            Realizar Pedido
          </h2>

          <p
            style={{
              fontSize: "14px",
              color: "#6b7280",
              marginBottom: "16px",
            }}
          >
            Ingresa el producto y la cantidad que deseas solicitar.
          </p>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "4px",
              }}
            >
              Producto
            </label>

            <input
              type="text"
              value={producto}
              onChange={(e) => setProducto(e.target.value)}
              placeholder="Ej. Leche Lala 1L"
              style={{
                width: "100%",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                padding: "8px 12px",
                fontSize: "14px",
                color: "#111",
                backgroundColor: "#f9fafb",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "4px",
              }}
            >
              Cantidad
            </label>

            <input
              type="number"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              style={{
                width: "100%",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                padding: "8px 12px",
                fontSize: "14px",
                color: "#111",
                backgroundColor: "#f9fafb",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            onClick={confirmarPedido}
            style={{
              backgroundColor: "#111",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "8px 20px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Confirmar Pedido
          </button>
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "24px",
          }}
        >
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#111",
              marginBottom: "12px",
            }}
          >
            Pedidos Registrados
          </h2>

          {pedidos.length === 0 ? (
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              No hay pedidos registrados aún.
            </p>
          ) : (
            pedidos.map((item, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  padding: "12px",
                  marginBottom: "10px",
                }}
              >
                <p
                  style={{
                    marginBottom: "6px",
                    fontWeight: 600,
                    color: "#111",
                  }}
                >
                  Pedido #{index + 1}
                </p>

                <p
                  style={{
                    marginBottom: "10px",
                    color: "#374151",
                  }}
                >
                  Producto: {item.producto}
                  <br />
                  Cantidad: {item.cantidad}
                </p>

                <button
                  onClick={() => eliminarPedido(index)}
                  style={{
                    backgroundColor: "#dc2626",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    cursor: "pointer",
                  }}
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}