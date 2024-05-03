import { useEffect, useState } from "react"; // Importa los hooks useEffect y useState de React
import toast from "react-hot-toast"; // Importa la librería toast de react-hot-toast para mostrar mensajes de error o éxito en la aplicación

// Definición del hook personalizado useGetConversations
const useGetConversations = () => {
	// Estado para controlar el estado de carga y almacenar las conversaciones
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	// Efecto para obtener las conversaciones del servidor cuando el componente se monta
	useEffect(() => {
		// Función asincrónica para obtener las conversaciones
		const getConversations = async () => {
			setLoading(true); // Establece loading en true para indicar que se está cargando la información
			try {
				const res = await fetch("/api/users"); // Realiza una solicitud GET al servidor para obtener las conversaciones
				const data = await res.json(); // Convierte la respuesta en formato JSON
				if (data.error) {
					// Si la respuesta contiene un error, lanza una excepción con el mensaje de error
					throw new Error(data.error);
				}
				setConversations(data); // Almacena las conversaciones en el estado
			} catch (error) {
				// Maneja cualquier error que ocurra durante la obtención de las conversaciones
				toast.error(error.message); // Muestra un mensaje de error utilizando la librería toast
			} finally {
				setLoading(false); // Establece loading en false una vez que se completa la solicitud, independientemente de si fue exitosa o no
			}
		};

		getConversations(); // Llama a la función para obtener las conversaciones cuando el componente se monta
	}, []); // El efecto se ejecuta solo una vez al montar el componente, ya que el array de dependencias está vacío

	// Devuelve el estado de carga y la lista de conversaciones para ser utilizados por los componentes
	return { loading, conversations };
};

export default useGetConversations; // Exporta el hook personalizado useGetConversations
