import { useEffect, useRef } from "react"; // Importa useEffect y useRef desde React para efectos secundarios y referencias
import useGetMessages from "../../hooks/useGetMessages"; // Importa el hook useGetMessages para obtener los mensajes
import MessageSkeleton from "../skeletons/MessageSkeleton"; // Importa el componente MessageSkeleton para mostrar esqueletos de mensajes
import Message from "./Message"; // Importa el componente Message para mostrar mensajes reales
import useListenMessages from "../../hooks/useListenMessages"; // Importa el hook useListenMessages para escuchar nuevos mensajes

// Componente Messages que muestra los mensajes de la conversación
const Messages = () => {
	const { messages, loading } = useGetMessages(); // Obtiene los mensajes y el estado de carga del hook useGetMessages
	useListenMessages(); // Escucha nuevos mensajes utilizando el hook useListenMessages
	const lastMessageRef = useRef(); // Crea una referencia para el último mensaje

	// Efecto secundario que se ejecuta cuando cambian los mensajes
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" }); // Desplaza la vista hasta el último mensaje suavemente
		}, 100);
	}, [messages]); // Este efecto depende de los mensajes

	// Renderiza el componente Messages
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading &&
				messages.length > 0 &&
				messages.map((message, index) => (
					<div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
						<Message message={message} /> {/* Renderiza el componente Message para cada mensaje */}
					</div>
				))}

			{/* Muestra esqueletos de mensajes durante el estado de carga */}
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

			{/* Muestra un mensaje cuando no hay mensajes y no se está cargando */}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Envía un mensaje para empezar una conversación</p>
			)}
		</div>
	);
};
export default Messages; // Exporta el componente Messages
