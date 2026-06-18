"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!nombre || !usuario || !correo || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos",
      });
      return;
    }

    await Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: `Bienvenido ${nombre}`,
      confirmButtonText: "Aceptar",
    });

    setNombre("");
    setUsuario("");
    setCorreo("");
    setPassword("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f4f6",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "360px",
          backgroundColor: "#fff",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          padding: "32px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: "#111",
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "12px",
            marginBottom: "24px",
          }}
        >
          Crear Cuenta
        </h1>

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
            Nombre completo
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
            Usuario
          </label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
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
            Correo electrónico
          </label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
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
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          onClick={handleRegister}
          style={{
            width: "100%",
            backgroundColor: "#111",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "10px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            marginTop: "8px",
          }}
        >
          Registrarse
        </button>

        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            marginTop: "16px",
            color: "#6b7280",
          }}
        >
          ¿Ya tienes cuenta?{" "}
          <a
            href="/login"
            style={{
              color: "#111",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}

