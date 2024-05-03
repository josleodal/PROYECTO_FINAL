import express from "express"; // Importa el paquete express para la creación de rutas
import { login, logout, signup } from "../controllers/auth.controller.js"; // Importa los controladores de autenticación

const router = express.Router(); // Crea un nuevo enrutador de express

// Ruta para el registro de usuarios
router.post("/signup", signup);

// Ruta para el inicio de sesión de usuarios
router.post("/login", login);

// Ruta para cerrar sesión de usuarios
router.post("/logout", logout);

export default router; // Exporta el enrutador para su uso en otros archivos
