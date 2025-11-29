# Sistema de Envíos - Frontend

Este proyecto es un **Dashboard de Envíos** desarrollado en React con Bootstrap, que incluye:  
- Login con validación básica  
- Dashboard con sidebar fijo  
- Contenedor dinámico que muestra: lista de envíos, formulario de nuevo envío y detalle de envío  
- Modal para ver información detallada de cada envío  
- Tarjetas de estadísticas (total envíos, en tránsito, entregados)  
- Diseño visualmente atractivo con colores y difuminados  

---

## Tecnologías utilizadas

- **React 18**: Librería principal de frontend  
- **Bootstrap 5**: Estilos y componentes responsive  
- **React Router DOM v6**: Navegación y routing  
- **Vite**: Bundler y servidor de desarrollo rápido  

---

## Instalación paso a paso

1. Clonar el repositorio:  
```bash
git clone <URL_DEL_REPOSITORIO>
cd nombre-del-proyecto
npm install
npm install bootstrap
npm run dev
http://localhost:5173

Usuario: admin
Contraseña: 123


*** Decisiones técnicas importantes ****

Routing sin rutas protegidas: La redirección se maneja de forma sencilla solo usando useNavigate y localStorage para este tipo de proyecto .

Dashboard dinámico: Se maneja un useState para controlar qué sección mostrar (envíos, nuevo envío, detalle), .

Datos de ejemplo: Los clientes y envíos se guardan en archivos locales (data/clientes.js y data/envios.js) para facilitar la demostración sin backend.

Modal de detalle: Se implementa con Bootstrap, mostrando información al hacer click sobre la guía de un envío.

Diseño visual: Se utiliza un fondo difuminado en el Dashboard y tarjetas para estadísticas y opciones para hacerlo más presentable.