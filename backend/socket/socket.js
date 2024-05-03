import { Server } from "socket.io"; // Importa la clase Server de socket.io para la gestión de sockets
import http from "http"; // Importa el módulo http para la creación de servidor HTTP
import express from "express"; // Importa el paquete express para la creación de la aplicación Express

const app = express(); // Crea una instancia de la aplicación Express

// Crea un servidor HTTP utilizando la aplicación Express
const server = http.createServer(app);

// Crea una instancia de Server de socket.io y la asocia con el servidor HTTP
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5000"], // Permite solicitudes CORS desde localhost en el puerto 3000
		methods: ["GET", "POST"], // Permite los métodos GET y POST
	},
});

// Función para obtener el ID del socket del receptor
export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId]; // Retorna el ID del socket del receptor basado en el ID del receptor
};

const userSocketMap = {}; // Mapa para almacenar los ID de sockets de los usuarios conectados {userId: socketId}

// Evento que se dispara cuando se establece una conexión con un cliente socket
io.on("connection", (socket) => {
	console.log("a user connected", socket.id); // Registra la conexión de un usuario y muestra su ID de socket

	const userId = socket.handshake.query.userId; // Obtiene el ID de usuario del handshake de socket
	if (userId != "undefined") userSocketMap[userId] = socket.id; // Asocia el ID de usuario con el ID de socket

	// Emite un evento 'getOnlineUsers' a todos los clientes conectados con el mapa actualizado de usuarios en línea
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// Maneja el evento 'disconnect' cuando un usuario se desconecta
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id); // Registra la desconexión de un usuario y muestra su ID de socket
		delete userSocketMap[userId]; // Elimina la entrada del usuario del mapa de ID de socket
		io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emite un evento 'getOnlineUsers' con el mapa actualizado de usuarios en línea
	});
});

export { app, io, server }; // Exporta la aplicación Express, la instancia de socket.io y el servidor HTTP para su uso en otros archivos
