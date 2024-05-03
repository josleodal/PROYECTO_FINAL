import { useEffect, useState } from "react"; // Importando los hooks necesarios de React
import useConversation from "../zustand/useConversation"; // Importando el hook useConversation desde un archivo personalizado
import toast from "react-hot-toast"; // Importando la función toast de la librería "react-hot-toast"

const useGetMessages = () => { // Definición del hook personalizado useGetMessages
    const [loading, setLoading] = useState(false); // Estado local para controlar el estado de carga
    const { messages, setMessages, selectedConversation } = useConversation(); // Extrayendo datos del hook useConversation

    useEffect(() => { // Hook useEffect para manejar efectos secundarios
        const getMessages = async () => { // Definición de la función asincrónica para obtener los mensajes
            setLoading(true); // Establecer el estado de carga como verdadero

            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`); // Haciendo una solicitud a la API para obtener los mensajes
                const data = await res.json(); // Convirtiendo la respuesta en formato JSON

                if (data.error) throw new Error(data.error); // Si hay un error en la respuesta, lanzar una excepción con el mensaje de error
                setMessages(data); // Actualizar el estado de los mensajes con los datos obtenidos
            } catch (error) {
                toast.error(error.message); // Mostrar un mensaje de error utilizando la función toast
            } finally {
                setLoading(false); // Establecer el estado de carga como falso, independientemente de si se produjo un error o no
            }
        };

        if (selectedConversation?._id) getMessages(); // Si hay una conversación seleccionada, obtener los mensajes
    }, [selectedConversation?._id, setMessages]); // El efecto se ejecuta cuando cambia el ID de la conversación seleccionada o cuando se actualiza el estado de los mensajes

    return { messages, loading }; // Devolver los mensajes y el estado de carga
};

export default useGetMessages; // Exportar el hook useGetMessages

