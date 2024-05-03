import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Importación de rutas
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

// Importación de la función para conectar a MongoDB y la instancia de socket.io
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const __dirname = path.resolve(); // Establece el directorio base

const PORT = process.env.PORT || 6000; // Define el puerto del servidor

app.use(express.json()); // Middleware para analizar solicitudes JSON
app.use(cookieParser()); // Middleware para analizar cookies

// Configuración de las rutas para diferentes partes de la aplicación
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Configuración de Express para servir archivos estáticos desde el directorio de distribución del frontend
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Ruta de comodín para servir el archivo index.html desde el directorio de distribución en cualquier ruta no definida previamente
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Inicio del servidor en el puerto especificado y conexión a MongoDB
server.listen(PORT, () => {
  connectToMongoDB(process.env.MONGO_DB_URI); // Conexión a la base de datos MongoDB
  console.log(`Server Running on port ${PORT}`);
});
