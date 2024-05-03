import { useState } from "react"; // Importa el hook useState de React
import toast from "react-hot-toast"; // Importa la función toast de la librería "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"; // Importa el contexto de autenticación desde el archivo AuthContext

const useSignup = () => { // Define el hook personalizado useSignup
	const [loading, setLoading] = useState(false); // Inicializa el estado loading para controlar el estado de carga
	const { setAuthUser } = useAuthContext(); // Obtiene la función setAuthUser del contexto de autenticación

	const signup = async ({ fullName, username, password, confirmPassword, gender }) => { // Define la función para registrar un nuevo usuario
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender }); // Valida los campos de entrada antes de continuar
		if (!success) return; // Si hay errores en la entrada, no continúes con el registro

		setLoading(true); // Establece el estado de carga como verdadero mientras se realiza el registro
		try {
			const res = await fetch("/api/auth/signup", { // Realiza una solicitud HTTP POST para registrar un nuevo usuario
				method: "POST",
				headers: { "Content-Type": "application/json" }, // Establece el tipo de contenido como JSON
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }), // Envía los datos del nuevo usuario en el cuerpo de la solicitud en formato JSON
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

	return { loading, signup }; // Devuelve el estado de carga y la función de registro
};
export default useSignup; // Exporta el hook useSignup

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) { // Define una función para manejar errores de entrada
	if (!fullName || !username || !password || !confirmPassword || !gender) { // Comprueba si se han proporcionado todos los campos necesarios
		toast.error("Por favor rellene los datos"); // Muestra un mensaje de error si falta algún campo
		return false; // Retorna false para indicar que hay errores de entrada
	}

	if (password !== confirmPassword) { // Comprueba si las contraseñas coinciden
		toast.error("La contraseña no coincide"); // Muestra un mensaje de error si las contraseñas no coinciden
		return false; // Retorna false para indicar que hay errores de entrada
	}

	if (password.length < 6) { // Comprueba si la contraseña es lo suficientemente larga
		toast.error("LA contraseñana debe tener 6 caracteres mínimo"); // Muestra un mensaje de error si la contraseña es demasiado corta
		return false; // Retorna false para indicar que hay errores de entrada
	}

	return true; // Retorna true si no hay errores de entrada
}
