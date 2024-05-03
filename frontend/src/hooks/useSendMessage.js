import { useState } from "react"; // Importa el hook useState de React
import useConversation from "../zustand/useConversation"; // Importa el hook useConversation desde un archivo personalizado
import toast from "react-hot-toast"; // Importa la función toast de la librería "react-hot-toast"

const useSendMessage = () => { // Define el hook personalizado useSendMessage
	const [loading, setLoading] = useState(false); // Inicializa el estado loading para controlar el estado de carga
	const { messages, setMessages, selectedConversation } = useConversation(); // Obtiene los mensajes, la función para establecer los mensajes y la conversación seleccionada del hook useConversation

	const sendMessage = async (message) => { // Define la función para enviar un mensaje
		setLoading(true); // Establece el estado de carga como verdadero mientras se envía el mensaje
		try {
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, { // Realiza una solicitud HTTP POST para enviar el mensaje a la conversación seleccionada
				method: "POST",
				headers: {
					"Content-Type": "application/json", // Establece el tipo de contenido como JSON
				},
				body: JSON.stringify({ message }), // Envía el mensaje en el cuerpo de la solicitud en formato JSON
			});
			const data = await res.json(); // Convierte la respuesta en formato JSON

			if (data.error) throw new Error(data.error); // Si hay un error en la respuesta, lanza una excepción con el mensaje de error recibido

			setMessages([...messages, data]); // Actualiza la lista de mensajes agregando el nuevo mensaje enviado
		} catch (error) {
			toast.error(error.message); // Muestra un mensaje de error utilizando la función toast si se produce un error
		} finally {
			setLoading(false); // Establece el estado de carga como falso, independientemente de si se produjo un error o no
		}
	};

	return { sendMessage, loading }; // Devuelve la función de enviar mensaje y el estado de carga
};
export default useSendMessage; // Exporta el hook useSendMessage
