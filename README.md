
# Aplicación de Chat con Tecnología MERN y Socket.io

¡Bienvenido a nuestra aplicación de chat desarrollada con tecnología MERN (MongoDB, Express, React, Node.js) y con la ayuda de Socket.io para la comunicación en tiempo real!

## Características

-   **Tecnologías utilizadas:** MERN + Socket.io + TailwindCSS + Daisy UI
-   **Autenticación y autorización con JWT**
-   **Mensajería en tiempo real con Socket.io**
-   **Estado en línea de los usuarios (Socket.io y Context de React)**
-   **Gestión de estado global con Zustand**

## Dependencias

Para el correcto funcionamiento de la aplicación, necesitarás instalar las siguientes dependencias tanto para el frontend como para el backend. Estas dependencias están listadas en los archivos `package.json` de cada parte del proyecto.

## Dependencias para el Backend

-   **bcryptjs**: Librería para el hash de contraseñas.
-   **cookie-parser**: Middleware para analizar cookies en las solicitudes HTTP.
-   **cors**: Middleware para permitir solicitudes entre diferentes dominios.
-   **dotenv**: Módulo para cargar variables de entorno desde un archivo `.env`.
-   **express**: Marco de aplicación web de Node.js.
-   **jsonwebtoken**: Implementación de JSON Web Tokens (JWT) para autenticación.
-   **mongoose**: Biblioteca de modelado de objetos MongoDB para Node.js.
-   **socket.io**: Biblioteca para aplicaciones web en tiempo real basadas en WebSocket.

## Dependencias para el Frontend

Estas son las dependencias que necesitarás para el frontend de la aplicación:

-   **react**: Librería principal de React para construir interfaces de usuario.
-   **react-dom**: Paquete para manipular el DOM en aplicaciones web React.
-   **react-hot-toast**: Librería para mostrar notificaciones tostadas en React.
-   **react-icons**: Biblioteca que proporciona iconos para usar en aplicaciones React.
-   **react-router-dom**: Paquete que proporciona enrutamiento DOM para aplicaciones React.
-   **socket.io-client**: Cliente para usar con Socket.io para aplicaciones en tiempo real.
-   **zustand**: Biblioteca para la gestión de estado global en React.



### Setup .env file


PORT=...
MONGO_DB_URI=...
JWT_SECRET=...
NODE_ENV=...
```

### Usar npm install para dependencias


npm install


### Usar npm start para activar 


npm start

