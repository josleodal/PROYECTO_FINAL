import jwt from "jsonwebtoken"; // Importa la librería jwt para la manipulación de tokens JWT

// Función para generar un token JWT y establecerlo como una cookie en la respuesta
const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, { // Genera un token JWT con el ID de usuario y la clave secreta
		expiresIn: "15d", // Establece la expiración del token a 15 días
	});

	res.cookie("jwt", token, { // Establece una cookie llamada "jwt" en la respuesta con el token JWT
		maxAge: 15 * 24 * 60 * 60 * 1000, // Duración máxima de la cookie en milisegundos (15 días)
		httpOnly: true, // La cookie solo es accesible a través de HTTP y no por JavaScript en el navegador (previene ataques XSS)
		sameSite: "strict", // La cookie solo se enviará en solicitudes del mismo sitio (previene ataques CSRF)
		secure: process.env.NODE_ENV !== "development", // La cookie solo se enviará a través de HTTPS en entornos de producción
	});
};

export default generateTokenAndSetCookie; // Exporta la función generateTokenAndSetCookie para su uso en otros archivos
