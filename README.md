# Music Project - Frontend

Este proyecto es el frontend de una aplicación web para gestionar y compartir música. Está realizado con React y Context para el estado global de la aplicación. Utiliza varias librerías para funcionalidades específicas:

- **Bootstrap** y **react-bootstrap**: Para los estilos de la aplicación.
- **react-hook-form**: Para el manejo de formularios.
- **axios**: Para el consumo de las APIs del backend.
- **jwt-decode**: Para el manejo de los tokens JWT.
- **react-data-table**: Para las tablas de datos.
- **react-icons**: Para los iconos.
- **sweetalert2**: Para los mensajes de alerta.
- **react-router-dom**: Para la navegación entre páginas.
- **wavesurfer.js**: Para las ondas de las canciones.
- **yup**: Para las validaciones de los formularios.

## Funcionalidades

La aplicación permite a un administrador realizar las siguientes acciones:

- Crear categorías de canciones.
- Cargar canciones que se suben a Cloudinary.
- Crear usuarios y asignarles un rol de admin o user.
- Activar o desactivar cuentas.
- Eliminar cuentas.
- Asignar las canciones que un usuario podrá ver y escuchar.

## Uso

Al iniciar sesión en la aplicación, el usuario tendrá acceso a un listado de todas las canciones disponibles y un reproductor para escuchar las mismas.

## Instalación

1. Clonar el repositorio Backend: `git clone https://github.com/pablopaul01/MusicProject-Back.git`
2. Instalar las dependencias del backend: `npm install`

3. Clonar el repositorio Frontend: `git clone https://github.com/pablopaul01/MusicProject-Front.git`
4. Instalar las dependencias del frontend: `npm install`


1. Iniciar el servidor: `npm start`
2. Iniciar el cliente: `npm start`

¡Listo! La aplicación estará disponible en `http://localhost:3000/.`


