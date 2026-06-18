"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "@/components/Sidebar";

type Pedido = {
  producto: string;
  cantidad: number;
};

export default function PedidosPage() {
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const confirmarPedido = async () => {
    if (!producto.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Producto requerido",
        text: "Selecciona o escribe un producto.",
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
        title: "Pedido enviado",
        text: "Tu pedido fue registrado correctamente.",
      });

      setProducto("");
      setCantidad(1);
    }
  };

  const verPedido = (pedido: Pedido) => {
    Swal.fire({
      title: "Detalle del Pedido",
      html: `
        <div style="text-align:left">
          <p><strong>Producto:</strong> ${pedido.producto}</p>
          <p><strong>Cantidad:</strong> ${pedido.cantidad}</p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Cerrar",
    });
  };

  const eliminarPedido = async (index: number) => {
    const result = await Swal.fire({
      title: "¿Cancelar pedido?",
      text: "Esta acción eliminará el pedido.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      setPedidos(pedidos.filter((_, i) => i !== index));

      Swal.fire({
        icon: "success",
        title: "Pedido eliminado",
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
      <Sidebar active="Pedidos" role="cliente" />

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
            Selecciona el producto y la cantidad que deseas ordenar.
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
            Mis Pedidos
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
                    color: "#374151",
                    fontWeight: 600,
                  }}
                >
                  Pedido #{index + 1}
                </p>

                <p
                  style={{
                    marginBottom: "10px",
                    color: "#6b7280",
                  }}
                >
                  {item.producto} - {item.cantidad} piezas
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <button
                    onClick={() => verPedido(item)}
                    style={{
                      backgroundColor: "#2563eb",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    Ver
                  </button>

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
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
