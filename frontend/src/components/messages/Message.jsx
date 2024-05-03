import { useAuthContext } from "../../context/AuthContext"; // Importa el hook useAuthContext del contexto de autenticación
import { extractTime } from "../../utils/extractTime"; // Importa la función extractTime de utilidades para extraer la hora de creación del mensaje
import useConversation from "../../zustand/useConversation"; // Importa el hook useConversation de zustand para obtener la conversación seleccionada

// Componente funcional Message que renderiza un mensaje en el chat
const Message = ({ message }) => {
	// Obtiene el usuario autenticado del contexto de autenticación
	const { authUser } = useAuthContext();
	// Obtiene la conversación seleccionada del estado utilizando el hook useConversation
	const { selectedConversation } = useConversation();
	// Determina si el mensaje fue enviado por el usuario autenticado
	const fromMe = message.senderId === authUser._id;
	// Formatea la hora de creación del mensaje
	const formattedTime = extractTime(message.createdAt);
	// Determina la clase CSS del chat (inicio o final) según si el mensaje fue enviado por el usuario autenticado
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	// Obtiene la URL de la imagen de perfil del remitente del mensaje
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	// Determina el color de fondo del globo de chat según si el mensaje fue enviado por el usuario autenticado
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
	// Determina si se debe aplicar la clase de sacudida al globo de chat
	const shakeClass = message.shouldShake ? "shake" : "";

	// Renderiza el componente Message
	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};

export default Message; // Exporta el componente Message
