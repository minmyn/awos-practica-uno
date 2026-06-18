"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "@/components/Sidebar";

const productosIniciales = [
  {
    nombre: "Leche Lala 1L",
    categoria: "Lácteos",
    precio: "$28.50",
    stock: 40,
    estado: "Activo",
  },
  {
    nombre: "Frijol Negro 1kg",
    categoria: "Granos",
    precio: "$45.00",
    stock: 0,
    estado: "Activo",
  },
  {
    nombre: "Atún Dolores 140g",
    categoria: "Enlatados",
    precio: "$18.00",
    stock: 120,
    estado: "Activo",
  },
  {
    nombre: "Aceite Nutrioli 1L",
    categoria: "Aceites",
    precio: "$62.00",
    stock: 15,
    estado: "Inactivo",
  },
];

function stockStyle(s: number) {
  if (s === 0)
    return {
      backgroundColor: "#fee2e2",
      color: "#b91c1c",
      padding: "2px 8px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: 600,
    };

  if (s <= 20)
    return {
      backgroundColor: "#ffedd5",
      color: "#c2410c",
      padding: "2px 8px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: 600,
    };

  return {
    backgroundColor: "#dcfce7",
    color: "#15803d",
    padding: "2px 8px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 600,
  };
}

function estadoStyle(e: string) {
  return e === "Activo"
    ? {
        backgroundColor: "#dcfce7",
        color: "#15803d",
        padding: "2px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 600,
      }
    : {
        backgroundColor: "#fee2e2",
        color: "#b91c1c",
        padding: "2px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 600,
      };
}

export default function AdminProductosPage() {
  const [productos, setProductos] = useState(productosIniciales);

  const crearProducto = async () => {
    const { value } = await Swal.fire({
      title: "Nuevo Producto",
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre">
        <input id="categoria" class="swal2-input" placeholder="Categoría">
        <input id="precio" class="swal2-input" placeholder="Precio">
        <input id="stock" class="swal2-input" type="number" placeholder="Stock">
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const nombre = (
          document.getElementById("nombre") as HTMLInputElement
        ).value;

        const categoria = (
          document.getElementById("categoria") as HTMLInputElement
        ).value;

        const precio = (
          document.getElementById("precio") as HTMLInputElement
        ).value;

        const stock = Number(
          (document.getElementById("stock") as HTMLInputElement).value
        );

        if (!nombre || !categoria || !precio) {
          Swal.showValidationMessage("Completa todos los campos");
          return false;
        }

        return { nombre, categoria, precio, stock };
      },
    });

    if (value) {
      setProductos([
        ...productos,
        {
          ...value,
          estado: "Activo",
        },
      ]);

      Swal.fire({
        icon: "success",
        title: "Producto creado",
      });
    }
  };

  const editarProducto = async (index: number) => {
    const producto = productos[index];

    const { value } = await Swal.fire({
      title: "Editar Producto",
      html: `
        <input id="nombre" class="swal2-input" value="${producto.nombre}">
        <input id="categoria" class="swal2-input" value="${producto.categoria}">
        <input id="precio" class="swal2-input" value="${producto.precio}">
        <input id="stock" class="swal2-input" type="number" value="${producto.stock}">
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const nombre = (
          document.getElementById("nombre") as HTMLInputElement
        ).value;

        const categoria = (
          document.getElementById("categoria") as HTMLInputElement
        ).value;

        const precio = (
          document.getElementById("precio") as HTMLInputElement
        ).value;

        const stock = Number(
          (document.getElementById("stock") as HTMLInputElement).value
        );

        if (!nombre || !categoria || !precio) {
          Swal.showValidationMessage("Completa todos los campos");
          return false;
        }

        return { nombre, categoria, precio, stock };
      },
    });

    if (value) {
      const nuevosProductos = [...productos];

      nuevosProductos[index] = {
        ...nuevosProductos[index],
        nombre: value.nombre,
        categoria: value.categoria,
        precio: value.precio,
        stock: value.stock,
      };

      setProductos(nuevosProductos);

      Swal.fire({
        icon: "success",
        title: "Producto actualizado",
      });
    }
  };

  const eliminarProducto = async (index: number) => {
    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      text: productos[index].nombre,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const nuevosProductos = productos.filter((_, i) => i !== index);

      setProductos(nuevosProductos);

      Swal.fire({
        icon: "success",
        title: "Producto eliminado",
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
      <Sidebar active="Productos" role="admin" />

      <main style={{ flex: 1, padding: "24px" }}>
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "20px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Buscar producto..."
            style={{
              flex: 1,
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              padding: "8px 14px",
              fontSize: "14px",
              color: "#111",
              backgroundColor: "#fff",
            }}
          />

          <button
            onClick={crearProducto}
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
            + Nuevo Producto
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
              marginBottom: "16px",
            }}
          >
            Catálogo de Productos
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
                {[
                  "Nombre",
                  "Categoría",
                  "Precio",
                  "Stock",
                  "Estado",
                  "Acciones",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "0 8px 10px 0",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#6b7280",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {productos.map((p, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "12px 8px 12px 0" }}>{p.nombre}</td>
                  <td style={{ padding: "12px 8px 12px 0" }}>{p.categoria}</td>
                  <td style={{ padding: "12px 8px 12px 0" }}>{p.precio}</td>

                  <td style={{ padding: "12px 8px 12px 0" }}>
                    <span style={stockStyle(p.stock)}>
                      {p.stock} pzs
                    </span>
                  </td>

                  <td style={{ padding: "12px 8px 12px 0" }}>
                    <span style={estadoStyle(p.estado)}>
                      {p.estado}
                    </span>
                  </td>

                  <td style={{ padding: "12px 8px 12px 0" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => editarProducto(i)}
                        style={{
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          padding: "4px 14px",
                          cursor: "pointer",
                          backgroundColor: "#fff",
                        }}
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => eliminarProducto(i)}
                        style={{
                          backgroundColor: "#dc2626",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          padding: "4px 14px",
                          cursor: "pointer",
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