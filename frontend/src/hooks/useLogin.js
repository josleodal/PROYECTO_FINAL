import { useState } from "react"; // Importa el hook useState de React
import toast from "react-hot-toast"; // Importa la función toast de la librería "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"; // Importa el contexto de autenticación desde el archivo AuthContext

const useLogin = () => { // Define el hook personalizado useLogin
	const [loading, setLoading] = useState(false); // Inicializa el estado loading para controlar el estado de carga
	const { setAuthUser } = useAuthContext(); // Obtiene la función setAuthUser del contexto de autenticación

	const login = async (username, password) => { // Define la función de inicio de sesión
		const success = handleInputErrors(username, password); // Valida los campos de entrada antes de continuar
		if (!success) return; // Si hay errores en la entrada, no continúes con el inicio de sesión

		setLoading(true); // Establece el estado de carga como verdadero mientras se realiza el inicio de sesión
		try {
			const res = await fetch("/api/auth/login", { // Realiza una solicitud HTTP POST para iniciar sesión
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }), // Envía el nombre de usuario y la contraseña en el cuerpo de la solicitud
			});

			const data = await res.json(); // Convierte la respuesta en formato JSON

			if (data.error) { // Si hay un error en la respuesta, lanza una excepción con el mensaje de error recibido
				throw new Error(data.error);
			}

			localStorage.setItem("chat-user", JSON.stringify(data)); // Almacena los datos del usuario en el almacenamiento local del navegador
			setAuthUser(data); // Establece el usuario autenticado en el contexto de autenticación
		} catch (error) {
			toast.error(error.message); // Muestra un mensaje de error utilizando la función toast si se produce un error
		} finally {
			setLoading(false); // Establece el estado de carga como falso, independientemente de si se produjo un error o no
		}
	};

	return { loading, login }; // Devuelve el estado de carga y la función de inicio de sesión
};
export default useLogin; // Exporta el hook useLogin

function handleInputErrors(username, password) { // Define una función para manejar errores de entrada
	if (!username || !password) { // Comprueba si se han proporcionado tanto el nombre de usuario como la contraseña
		toast.error("Rellene todos los campos"); // Muestra un mensaje de error si alguno de los campos está vacío
		return false; // Retorna false para indicar que hay errores de entrada
	}

	return true; // Retorna true si no hay errores de entrada
}
