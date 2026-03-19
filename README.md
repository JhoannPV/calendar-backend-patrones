# Calendar Backend

API REST para la aplicacion de calendario. Gestiona autenticacion con JWT y operaciones CRUD de eventos usando MongoDB.

## Caracteristicas

- Registro e inicio de sesion de usuarios.
- Renovacion de token JWT.
- Creacion, consulta, actualizacion y eliminacion de eventos.
- Autorizacion: solo el autor puede editar o eliminar su evento.
- Arquitectura basada en capas (dominio, infraestructura, presentacion).

## Stack Tecnologico

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JSON Web Tokens
- Docker Compose (opcional)

## Requisitos

- Node.js 22 o superior recomendado
- npm
- MongoDB local o remoto
- Docker (opcional)

## Instalacion

1. Clonar el repositorio:

	git clone https://github.com/JhoannPV/calendar-backend-patrones.git
	cd calendar-backend-patrones

2. Instalar dependencias:

	npm install

3. Configurar variables de entorno:

- Copiar .env.template a .env.
- Configurar puerto, conexion de MongoDB y clave JWT.

Para generar una clave JWT en Linux, macOS o Git Bash:

	openssl rand -hex 32

## Scripts

- Desarrollo:

	npm run dev

- Build:

	npm run build

- Produccion:

	npm start

## Docker

Para iniciar backend y base de datos con Docker Compose:

	docker compose up -d

## Endpoints Base

- /api/auth
- /api/events