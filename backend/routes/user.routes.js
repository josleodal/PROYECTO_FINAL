import express from "express"; // Importa el paquete express para la creación de rutas
import protectRoute from "../middleware/protectRoute.js"; // Importa el middleware de protección de ruta
import { getUsersForSidebar } from "../controllers/user.controller.js"; // Importa el controlador para obtener usuarios

const router = express.Router(); // Crea un nuevo enrutador de express

// Ruta para obtener usuarios para la barra lateral
router.get("/", protectRoute, getUsersForSidebar);

export default router; // Exporta el enrutador para su uso en otros archivos
