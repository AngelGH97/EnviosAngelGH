import { useState } from "react";
import { envios as enviosData } from "../data/envios.js";
import { clientes } from "../data/clientes.js";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  const [opcion, setOpcion] = useState("envios");
  const [envios, setEnvios] = useState(enviosData);
  const [modalEnvio, setModalEnvio] = useState(null);

  const agregarEnvio = (nuevo) => {
    setEnvios(prev => [...prev, { id: prev.length + 1, ...nuevo }]);
    setOpcion("envios");
  };

  const totalEnvios = envios.length;
  const enTransito = envios.filter(e => e.estado === "En tránsito").length;
  const entregados = envios.filter(e => e.estado === "Entregado").length;

  const renderContenido = () => {
    switch (opcion) {
      case "envios":
        return (
          <div className="row g-3">
            {envios.map(e => (
              <div key={e.id} className="col-md-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">
                      <span 
                        style={{ cursor: "pointer", textDecoration: "underline", color: "#0d6efd" }}
                        onClick={() => setModalEnvio(e)}
                      >
                        {e.guia}
                      </span>
                    </h5>
                    <p className="card-text">
                      <strong>Cliente:</strong> {clientes.find(c => c.id === e.clienteId)?.nombre || "Desconocido"} <br />
                      <strong>Origen:</strong> {e.origen} <br />
                      <strong>Destino:</strong> {e.destino} <br />
                      <strong>Estado:</strong> 
                      <span className={`badge ms-2 ${e.estado==="Entregado"?"bg-success":"bg-primary"}`}>
                        {e.estado}
                      </span>
                    </p>
                    <small className="text-muted">Fecha: {e.fecha}</small>
                  </div>
                </div>
              </div>
            ))}

            {/* Modal */}
            {modalEnvio && (
              <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Detalle Envío {modalEnvio.guia}</h5>
                      <button type="button" className="btn-close" onClick={() => setModalEnvio(null)}></button>
                    </div>
                    <div className="modal-body">
                      <p><strong>Cliente:</strong> {clientes.find(c => c.id === modalEnvio.clienteId)?.nombre}</p>
                      <p><strong>Origen:</strong> {modalEnvio.origen}</p>
                      <p><strong>Destino:</strong> {modalEnvio.destino}</p>
                      <p><strong>Estado:</strong> {modalEnvio.estado}</p>
                      <p><strong>Fecha:</strong> {modalEnvio.fecha}</p>
                    </div>
                    <div className="modal-footer">
                      <button className="btn btn-secondary" onClick={() => setModalEnvio(null)}>Cerrar</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "nuevo":
        return <NuevoEnvioForm agregarEnvio={agregarEnvio} />;

      case "detalle":
        return <h2>Detalle del envío</h2>;

      default:
        return <h2>Bienvenido</h2>;
    }
  };

  return (
    <div 
      className="d-flex vh-100"
      style={{ 
        background: `
          radial-gradient(circle at 20% 20%, rgba(34,197,94,0.3), transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(190, 54, 54, 0.83), transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 60%),
          #0f172a
        `,
        overflow: 'hidden'
      }}
    >
      {/* Sidebar */}
      <div className="bg-success text-white d-flex flex-column p-3" style={{ width: '220px' }}>
        <h4 className="text-center mb-4">Envios Angel GH📦</h4>
        <button className="btn btn-dark text-white mb-2" onClick={() => setOpcion("envios")}>Ver envíos</button>
        <button className="btn btn-dark text-white mb-2" onClick={() => setOpcion("nuevo")}>Nuevo envío</button>
        <button className="btn btn-danger mt-auto" onClick={() => { localStorage.removeItem("logged"); window.location.href = "/Login"; }}>
          Cerrar sesión
        </button>
      </div>

      {/* Contenedor dinámico */}
      <div className="flex-grow-1 p-4" style={{ overflowY: 'auto' }}>
        
        {/* Panel de estadísticas */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card text-center shadow-sm p-3">
              <h6>Total de envíos</h6>
              <h3>{totalEnvios}</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center shadow-sm p-3">
              <h6>En tránsito</h6>
              <h3>{enTransito}</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center shadow-sm p-3">
              <h6>Entregados</h6>
              <h3>{entregados}</h3>
            </div>
          </div>
        </div>

        {/* Contenido dinámico */}
        {renderContenido()}
      </div>
    </div>
  );
}

// Formulario de nuevo envío
function NuevoEnvioForm({ agregarEnvio }) {
  const [form, setForm] = useState({
    guia: "",
    clienteId: 1,
    origen: "",
    destino: "",
    estado: "En tránsito",
    fecha: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarEnvio(form);
    setForm({ guia: "", clienteId: 1, origen: "", destino: "", estado: "En tránsito", fecha: "" });
  };

  return (
    <div className="card p-4 shadow-sm">
      <h4>Agregar nuevo envío</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Guía</label>
          <input className="form-control" name="guia" value={form.guia} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Cliente</label>
          <select className="form-select" name="clienteId" value={form.clienteId} onChange={handleChange}>
            {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
        </div>
        <div className="mb-3">
          <label>Origen</label>
          <input className="form-control" name="origen" value={form.origen} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Destino</label>
          <input className="form-control" name="destino" value={form.destino} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Estado</label>
          <select className="form-select" name="estado" value={form.estado} onChange={handleChange}>
            <option value="En tránsito">En tránsito</option>
            <option value="Entregado">Entregado</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Fecha</label>
          <input type="date" className="form-control" name="fecha" value={form.fecha} onChange={handleChange} required />
        </div>
        <button className="btn btn-primary">Agregar</button>
      </form>
    </div>
  );
}
