import mongoose from "mongoose"; // Importa el paquete mongoose para interactuar con MongoDB

// Define el esquema de la conversación
const conversationSchema = new mongoose.Schema(
	{
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId, // Tipo de dato para los IDs de los usuarios
				ref: "User", // Referencia al modelo de usuario
			},
		],
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId, // Tipo de dato para los IDs de los mensajes
				ref: "Message", // Referencia al modelo de mensaje
				default: [], // Valor predeterminado como un array vacío
			},
		],
	},
	{ timestamps: true } // Opciones del esquema para incluir marcas de tiempo automáticas
);

// Crea el modelo Conversation utilizando el esquema definido
const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation; // Exporta el modelo Conversation para que pueda ser utilizado en otros archivos
