import mongoose from "mongoose"; // Importa el paquete mongoose para interactuar con MongoDB

// Función para conectar a la base de datos MongoDB
const connectToMongoDB = async () => {
	try {
		// Intenta conectar a la base de datos utilizando la URI proporcionada en las variables de entorno
		await mongoose.connect(process.env.MONGO_DB_URI);
		console.log("Connected to MongoDB"); // Si la conexión es exitosa, registra un mensaje de conexión exitosa
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message); // Si hay algún error en la conexión, registra un mensaje de error
	}
};

export default connectToMongoDB; // Exporta la función connectToMongoDB para que pueda ser utilizada en otros archivos
