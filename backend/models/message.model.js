import mongoose from "mongoose"; // Importa el paquete mongoose para interactuar con MongoDB

// Define el esquema del mensaje
const messageSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId, // Tipo de dato para el ID del remitente
			ref: "User", // Referencia al modelo de usuario
			required: true, // El remitente es obligatorio
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId, // Tipo de dato para el ID del destinatario
			ref: "User", // Referencia al modelo de usuario
			required: true, // El destinatario es obligatorio
		},
		message: {
			type: String, // Tipo de dato para el contenido del mensaje
			required: true, // El contenido del mensaje es obligatorio
		},
		// createdAt, updatedAt
	},
	{ timestamps: true } // Opciones del esquema para incluir marcas de tiempo automáticas
);

// Crea el modelo Message utilizando el esquema definido
const Message = mongoose.model("Message", messageSchema);

export default Message; // Exporta el modelo Message para que pueda ser utilizado en otros archivos
