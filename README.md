# 🟡 Chat

Un chat en tiempo real, desarrollado con Vite (frontend) y Node.js + WebSocket (backend). Incluye soporte para múltiples usuarios, historial de mensajes, scroll automático y separación de mensajes no leídos.

## 🚀 Características

- Chat privado entre dos usuarios
- Historial de mensajes almacenado en SQLite
- WebSocket para comunicación en tiempo real
- Separador de mensajes no leídos

## 🛠️ Instalación y uso local

### 1. Clona el repositorio
```bash
git clone https://github.com/merino01/chat.git
cd chat
```

### 2. Instala dependencias
```bash
pnpm install
cd client && pnpm install && cd ..
cd server && pnpm install && cd ..
```

### 3. Inicializa la base de datos
```bash
cd server
pnpm run db:generate
cd ..
```

### 4. Arranca el frontend en modo desarrollo
```bash
cd client
pnpm run dev
```

### 5. Arranca el backend en modo desarrollo
```bash
cd server
pnpm run dev
```

## 🌐 Despliegue en producción

1. Haz build del frontend:
```bash
cd client
pnpm run build
```

2. El backend servirá los archivos estáticos de `client/dist` automáticamente.

3. Configura las variables de entorno en Vercel (o tu plataforma):
- `VITE_WS_URL` para el frontend
- `PORT` para el backend

## 📦 Estructura del proyecto

```plaintext
client/
  src/
    css/
    js/
    types/
  index.html
  ...
server/
  database/
  ws/
  services/
  ...
```

## ✨ Créditos y agradecimientos
- Inspiración visual: Cyberpunk 2077
- Desarrollado por @merino01

---

¡Disfruta el chat y que la red te acompañe! ⚡
