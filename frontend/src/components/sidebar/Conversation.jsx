import { useSocketContext } from "../../context/SocketContext"; // Importa el hook useSocketContext para obtener el estado del socket
import useConversation from "../../zustand/useConversation"; // Importa el hook useConversation para manejar la conversación seleccionada

// Componente Conversation que muestra una conversación en la lista de conversaciones
const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation(); // Obtiene la conversación seleccionada y la función para establecerla del hook useConversation

  // Determina si la conversación actual está seleccionada
  const isSelected = selectedConversation?._id === conversation._id;
  
  // Obtiene el estado de los usuarios en línea del contexto del socket
  const { onlineUsers } = useSocketContext(); 

  // Determina si el usuario de la conversación está en línea
  const isOnline = onlineUsers.includes(conversation._id);

  // Renderiza el componente Conversation
  return (
    <>
      {/* Contenedor de la conversación */}
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
          ${isSelected ? "bg-sky-500" : ""} // Aplica un fondo diferente si la conversación está seleccionada
        `}
        onClick={() => setSelectedConversation(conversation)} // Establece la conversación seleccionada al hacer clic en ella
      >
        {/* Avatar del usuario */}
        <div className='w-12 rounded-full'>
          <img src={conversation.profilePic} alt='user avatar' />
        </div>
      </div>

      {/* Detalles de la conversación */}
      <div className='flex flex-col flex-1'>
        <div className='flex gap-3 justify-between'>
          <p className='font-bold text-gray-200'>{conversation.fullName}</p> {/* Nombre del usuario */}
          <span className='text-xl'>{emoji}</span> {/* Emoji asociado con la conversación */}
        </div>
      </div>

      {/* Renderiza una línea divisoria si no es el último elemento */}
      {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    </>
  );
};
export default Conversation; // Exporta el componente Conversation


