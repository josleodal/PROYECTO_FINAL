import express from "express"; // Importa el paquete express para la creación de rutas
import { getMessages, sendMessage } from "../controllers/message.controller.js"; // Importa los controladores para mensajes
import protectRoute from "../middleware/protectRoute.js"; // Importa el middleware de protección de ruta

const router = express.Router(); // Crea un nuevo enrutador de express

// Ruta para obtener los mensajes entre el usuario autenticado y otro usuario por su ID
router.get("/:id", protectRoute, getMessages);

// Ruta para enviar un mensaje a otro usuario por su ID
router.post("/send/:id", protectRoute, sendMessage);

export default router; // Exporta el enrutador para su uso en otros archivos
