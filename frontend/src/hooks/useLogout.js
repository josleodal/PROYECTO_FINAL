import { useState } from "react"; // Importa el hook useState de React
import { useAuthContext } from "../context/AuthContext"; // Importa el contexto de autenticación desde el archivo AuthContext
import toast from "react-hot-toast"; // Importa la función toast de la librería "react-hot-toast"

const useLogout = () => { // Define el hook personalizado useLogout
	const [loading, setLoading] = useState(false); // Inicializa el estado loading para controlar el estado de carga
	const { setAuthUser } = useAuthContext(); // Obtiene la función setAuthUser del contexto de autenticación

	const logout = async () => { // Define la función de cierre de sesión
		setLoading(true); // Establece el estado de carga como verdadero mientras se realiza el cierre de sesión
		try {
			const res = await fetch("/api/auth/logout", { // Realiza una solicitud HTTP POST para cerrar sesión
				method: "POST",
				headers: { "Content-Type": "application/json" }, // Establece el tipo de contenido como JSON
			});
			const data = await res.json(); // Convierte la respuesta en formato JSON

			if (data.error) { // Si hay un error en la respuesta, lanza una excepción con el mensaje de error recibido
				throw new Error(data.error);
			}

			localStorage.removeItem("chat-user"); // Elimina los datos del usuario del almacenamiento local del navegador
			setAuthUser(null); // Establece el usuario autenticado como nulo en el contexto de autenticación
		} catch (error) {
			toast.error(error.message); // Muestra un mensaje de error utilizando la función toast si se produce un error
		} finally {
			setLoading(false); // Establece el estado de carga como falso, independientemente de si se produjo un error o no
		}
	};

	return { loading, logout }; // Devuelve el estado de carga y la función de cierre de sesión
};
export default useLogout; // Exporta el hook useLogout
