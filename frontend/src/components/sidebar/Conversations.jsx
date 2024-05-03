import useGetConversations from "../../hooks/useGetConversations"; // Importa el hook useGetConversations para obtener las conversaciones
import { getRandomEmoji } from "../../utils/emojis"; // Importa la función getRandomEmoji para obtener un emoji aleatorio
import Conversation from "./Conversation"; // Importa el componente Conversation para renderizar cada conversación

// Componente Conversations que muestra la lista de conversaciones
const Conversations = () => {
	const { loading, conversations } = useGetConversations(); // Obtiene las conversaciones y el estado de carga del hook useGetConversations

	// Renderiza el componente Conversations
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{/* Mapea cada conversación y renderiza un componente Conversation para cada una */}
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()} // Asigna un emoji aleatorio a cada conversación
					lastIdx={idx === conversations.length - 1} // Indica si es la última conversación en la lista
				/>
			))}
			{/* Muestra un indicador de carga si se están cargando las conversaciones */}
			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations; // Exporta el componente Conversations

