import User from "../models/user.model.js"; // Importa el modelo de usuario

// Controlador para obtener usuarios para la barra lateral
export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id; // Obtiene el ID del usuario autenticado de la solicitud

		// Busca todos los usuarios excepto el usuario autenticado y excluye la contraseña
		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		// Devuelve la lista de usuarios filtrados en la respuesta
		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error en getUsersForSidebar: ", error.message); // Registra cualquier error en la consola
		res.status(500).json({ error: "Internal server error" }); // Devuelve un error 500 si hay un error interno del servidor
	}
};
