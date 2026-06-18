"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Swal from "sweetalert2";

const proveedoresIniciales = [
  {
    nombre: "Distribuidora Lala S.A.",
    telefono: "555-1234",
    taxId: "DLA123456",
  },
  {
    nombre: "Proveedor de Harinas Y",
    telefono: "555-5678",
    taxId: "PHY789012",
  },
  {
    nombre: "Enlatados del Norte",
    telefono: "555-9999",
    taxId: "END345678",
  },
];

export default function ProveedoresPage() {
  const [proveedores] = useState(proveedoresIniciales);

  const nuevoProveedor = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Nuevo Proveedor",
      html: `
        <input id="swal-nombre" class="swal2-input" placeholder="Nombre">
        <input id="swal-telefono" class="swal2-input" placeholder="Teléfono">
        <input id="swal-taxid" class="swal2-input" placeholder="Tax ID">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const nombre = (
          document.getElementById("swal-nombre") as HTMLInputElement
        ).value;

        const telefono = (
          document.getElementById("swal-telefono") as HTMLInputElement
        ).value;

        const taxId = (
          document.getElementById("swal-taxid") as HTMLInputElement
        ).value;

        if (!nombre || !telefono || !taxId) {
          Swal.showValidationMessage("Completa todos los campos");
          return false;
        }

        return { nombre, telefono, taxId };
      },
    });

    if (formValues) {
      Swal.fire({
        icon: "success",
        title: "Proveedor registrado",
        text: `${formValues.nombre} fue agregado correctamente.`,
      });
    }
  };

  const editarProveedor = async (
    proveedor: (typeof proveedoresIniciales)[0]
  ) => {
    const { value: formValues } = await Swal.fire({
      title: "Editar Proveedor",
      html: `
        <input id="swal-nombre" class="swal2-input" value="${proveedor.nombre}">
        <input id="swal-telefono" class="swal2-input" value="${proveedor.telefono}">
        <input id="swal-taxid" class="swal2-input" value="${proveedor.taxId}">
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const nombre = (
          document.getElementById("swal-nombre") as HTMLInputElement
        ).value;

        const telefono = (
          document.getElementById("swal-telefono") as HTMLInputElement
        ).value;

        const taxId = (
          document.getElementById("swal-taxid") as HTMLInputElement
        ).value;

        if (!nombre || !telefono || !taxId) {
          Swal.showValidationMessage("Completa todos los campos");
          return false;
        }

        return { nombre, telefono, taxId };
      },
    });

    if (formValues) {
      Swal.fire({
        icon: "success",
        title: "Proveedor actualizado",
        text: `${formValues.nombre} fue actualizado correctamente.`,
      });
    }
  };

  const eliminarProveedor = async (nombre: string) => {
    const result = await Swal.fire({
      title: "¿Eliminar proveedor?",
      text: nombre,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Proveedor eliminado",
        text: `${nombre} fue eliminado correctamente.`,
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
      <Sidebar active="Proveedores" role="admin" />

      <main style={{ flex: 1, padding: "24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "16px",
          }}
        >
          <button
            onClick={nuevoProveedor}
            style={{
              backgroundColor: "#111",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "8px 18px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            + Nuevo Proveedor
          </button>
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#111",
              marginBottom: "16px",
            }}
          >
            Proveedores
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                {["Nombre", "Teléfono", "Tax ID", "Acciones"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "0 8px 10px 0",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {proveedores.map((p, i) => (
                <tr
                  key={i}
                  style={{ borderBottom: "1px solid #f3f4f6" }}
                >
                  <td
                    style={{
                      padding: "12px 8px 12px 0",
                      color: "#2563eb",
                      fontWeight: 500,
                    }}
                  >
                    {p.nombre}
                  </td>

                  <td
                    style={{
                      padding: "12px 8px 12px 0",
                      color: "#6b7280",
                    }}
                  >
                    {p.telefono}
                  </td>

                  <td
                    style={{
                      padding: "12px 8px 12px 0",
                      color: "#374151",
                      fontFamily: "monospace",
                      fontSize: "13px",
                    }}
                  >
                    {p.taxId}
                  </td>

                  <td style={{ padding: "12px 8px 12px 0" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => editarProveedor(p)}
                        style={{
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          padding: "4px 14px",
                          fontSize: "13px",
                          cursor: "pointer",
                          backgroundColor: "#fff",
                          color: "#374151",
                        }}
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => eliminarProveedor(p.nombre)}
                        style={{
                          border: "none",
                          borderRadius: "6px",
                          padding: "4px 14px",
                          fontSize: "13px",
                          cursor: "pointer",
                          backgroundColor: "#dc2626",
                          color: "#fff",
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
