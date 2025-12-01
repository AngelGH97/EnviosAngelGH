import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (usuario === "admin" && password === "123") {
      localStorage.setItem("logged", "true");
      navigate("/dashboard");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: `
          radial-gradient(circle at 25% 20%, rgba(34,197,94,0.5), transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(239,68,68,0.45), transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9), transparent 60%),
          #0f172a
        `,
      }}
    >
      <div className="card p-4 shadow" style={{ width: "380px", borderRadius: "14px" }}>
        <h2 className="text-center mb-4">📦 Sistema de Envíos</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              placeholder="admin"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
