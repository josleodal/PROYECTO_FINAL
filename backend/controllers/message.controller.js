import Conversation from "../models/conversation.model.js"; // Importa el modelo de conversación
import Message from "../models/message.model.js"; // Importa el modelo de mensaje
import { getReceiverSocketId, io } from "../socket/socket.js"; // Importa funciones relacionadas con socket.io

// Controlador para enviar un mensaje
export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body; // Extrae el mensaje del cuerpo de la solicitud
		const { id: receiverId } = req.params; // Extrae el ID del destinatario de los parámetros de la solicitud
		const senderId = req.user._id; // Obtiene el ID del remitente de la solicitud (suponiendo que esté autenticado)

		// Busca si ya existe una conversación entre el remitente y el receptor
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		// Si no existe, crea una nueva conversación
		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		// Crea un nuevo mensaje con los datos proporcionados
		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		// Agrega el ID del nuevo mensaje a la conversación
		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// Guarda la conversación y el mensaje en la base de datos de forma paralela
		await Promise.all([conversation.save(), newMessage.save()]);

		// Funcionalidad de SOCKET IO IRÁ AQUÍ
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() se utiliza para enviar eventos a un cliente específico
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		// Devuelve el mensaje recién creado en la respuesta
		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error en sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Controlador para obtener todos los mensajes entre dos usuarios
export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params; // Extrae el ID del usuario con el que se está chateando
		const senderId = req.user._id; // Obtiene el ID del remitente de la solicitud (suponiendo que esté autenticado)

		// Busca la conversación entre el remitente y el usuario con el que se está chateando
		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NO ES UNA REFERENCIA, SINO MENSAJES REALES

		// Si no hay conversación, devuelve una lista vacía de mensajes
		if (!conversation) return res.status(200).json([]);

		// Devuelve los mensajes de la conversación en la respuesta
		const messages = conversation.messages;
		res.status(200).json(messages);
	} catch (error) {
		console.log("Error en getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
