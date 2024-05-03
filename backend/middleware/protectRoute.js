import jwt from "jsonwebtoken"; // Importa la librería jwt para la manipulación de tokens JWT
import User from "../models/user.model.js"; // Importa el modelo de usuario

// Middleware para proteger rutas
const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt; // Obtiene el token JWT de las cookies de la solicitud

		// Si no se proporciona ningún token, devuelve un error de no autorizado
		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		// Verifica y decodifica el token JWT utilizando la clave secreta
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Si el token no es válido, devuelve un error de no autorizado
		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		// Busca al usuario en la base de datos utilizando el ID del usuario codificado en el token
		const user = await User.findById(decoded.userId).select("-password");

		// Si no se encuentra el usuario, devuelve un error de usuario no encontrado
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Establece el usuario en el objeto de solicitud para que esté disponible en las rutas protegidas
		req.user = user;

		next(); // Llama a la siguiente función de middleware o controlador
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message); // Registra cualquier error en la consola
		res.status(500).json({ error: "Internal server error" }); // Devuelve un error 500 si hay un error interno del servidor
	}
};

export default protectRoute; // Exporta el middleware protectRoute para que pueda ser utilizado en otros archivos
