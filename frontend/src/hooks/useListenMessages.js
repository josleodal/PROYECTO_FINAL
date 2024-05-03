import { useEffect } from "react"; // Importa el hook useEffect de React

import { useSocketContext } from "../context/SocketContext"; // Importa el hook useSocketContext desde el contexto del socket
import useConversation from "../zustand/useConversation"; // Importa el hook useConversation desde un archivo personalizado

import notificationSound from "../assets/sounds/notification.mp3"; // Importa el sonido de notificación desde un archivo de sonido

const useListenMessages = () => { // Define el hook personalizado useListenMessages
	const { socket } = useSocketContext(); // Obtiene el socket del contexto del socket
	const { messages, setMessages } = useConversation(); // Obtiene los mensajes y la función para establecer los mensajes del hook useConversation

	useEffect(() => { // Hook useEffect para manejar efectos secundarios
		socket?.on("newMessage", (newMessage) => { // Escucha el evento "newMessage" del socket
			newMessage.shouldShake = true; // Añade una propiedad shouldShake al nuevo mensaje para indicar que debe vibrar
			const sound = new Audio(notificationSound); // Crea un nuevo elemento de audio con el sonido de notificación
			sound.play(); // Reproduce el sonido de notificación
			setMessages([...messages, newMessage]); // Añade el nuevo mensaje a la lista de mensajes
		});

		return () => socket?.off("newMessage"); // Desregistra el evento "newMessage" del socket cuando el componente se desmonta
	}, [socket, setMessages, messages]); // Ejecuta el efecto cuando cambia el socket, la función setMessages o los mensajes

};
export default useListenMessages; // Exporta el hook useListenMessages
