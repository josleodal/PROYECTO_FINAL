import { useEffect } from "react"; // Importa el hook useEffect de React para efectos secundarios
import useConversation from "../../zustand/useConversation"; // Importa el hook useConversation de Zustand para gestionar el estado de la conversación
import MessageInput from "./MessageInput"; // Importa el componente MessageInput para enviar mensajes
import Messages from "./Messages"; // Importa el componente Messages para mostrar los mensajes de la conversación
import { TiMessages } from "react-icons/ti"; // Importa el icono TiMessages de react-icons/ti
import { useAuthContext } from "../../context/AuthContext"; // Importa el contexto de autenticación para obtener datos del usuario autenticado

// Componente MessageContainer que representa el contenedor de mensajes
const MessageContainer = () => {
	// Obtiene el estado de la conversación seleccionada y la función para establecer la conversación seleccionada del hook useConversation
	const { selectedConversation, setSelectedConversation } = useConversation();

	// Efecto secundario que se ejecuta al montar y desmontar el componente
	useEffect(() => {
		// Función de limpieza que se ejecuta al desmontar el componente para restablecer la conversación seleccionada
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]); // La función de limpieza depende de setSelectedConversation

	// Renderiza el componente MessageContainer
	return (
		<div className='md:min-w-[450px] flex flex-col'>
			{!selectedConversation ? ( // Si no hay una conversación seleccionada, muestra el componente NoChatSelected
				<NoChatSelected />
			) : (
				<> {/* Si hay una conversación seleccionada, muestra la cabecera, los mensajes y el componente MessageInput */}
					{/* Header */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
					</div>
					<Messages /> {/* Componente para mostrar los mensajes */}
					<MessageInput /> {/* Componente para enviar mensajes */}
				</>
			)}
		</div>
	);
};
export default MessageContainer; // Exporta el componente MessageContainer

// Componente NoChatSelected que se muestra cuando no hay una conversación seleccionada
const NoChatSelected = () => {
	const { authUser } = useAuthContext(); // Obtiene el usuario autenticado del contexto de autenticación
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Bienvenido 👋 {authUser.fullName} ❄</p> {/* Muestra un mensaje de bienvenida con el nombre del usuario autenticado */}
				<p>Selecciona un chat para empezar una conversación</p> {/* Muestra un mensaje para seleccionar una conversación para empezar a chatear */}
				<TiMessages className='text-3xl md:text-6xl text-center' /> {/* Muestra el icono TiMessages */}
			</div>
		</div>
	);
};


