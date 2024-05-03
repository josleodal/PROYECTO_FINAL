import mongoose from "mongoose"; // Importa el paquete mongoose para interactuar con MongoDB

// Define el esquema del usuario
const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String, // Tipo de dato para el nombre completo del usuario
			required: true, // El nombre completo es obligatorio
		},
		username: {
			type: String, // Tipo de dato para el nombre de usuario
			required: true, // El nombre de usuario es obligatorio
			unique: true, // El nombre de usuario debe ser único en la base de datos
		},
		password: {
			type: String, // Tipo de dato para la contraseña del usuario
			required: true, // La contraseña es obligatoria
			minlength: 6, // La contraseña debe tener al menos 6 caracteres
		},
		gender: {
			type: String, // Tipo de dato para el género del usuario
			required: true, // El género es obligatorio
			enum: ["male", "female"], // El género debe ser "male" o "female"
		},
		profilePic: {
			type: String, // Tipo de dato para la URL de la imagen de perfil del usuario
			default: "", // Valor predeterminado para la imagen de perfil
		},
		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true } // Opciones del esquema para incluir marcas de tiempo automáticas
);

// Crea el modelo User utilizando el esquema definido
const User = mongoose.model("User", userSchema);

export default User; // Exporta el modelo User para que pueda ser utilizado en otros archivos
