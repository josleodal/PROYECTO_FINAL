import React, { useState } from "react"; // Importa React y useState desde React para el estado del componente
import { BsSend } from "react-icons/bs"; // Importa el icono BsSend de react-icons/bs
import useSendMessage from "../../hooks/useSendMessage"; // Importa el hook useSendMessage para enviar mensajes

// Componente MessageInput que permite al usuario enviar un mensaje
const MessageInput = () => {
  const [message, setMessage] = useState(""); // Estado para almacenar el mensaje que se está escribiendo
  const { loading, sendMessage } = useSendMessage(); // Obtiene la función sendMessage y el estado de carga del hook useSendMessage

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    if (!message) return; // Si el mensaje está vacío, no hacer nada
    await sendMessage(message); // Envía el mensaje utilizando la función sendMessage del hook useSendMessage
    setMessage(""); // Reinicia el estado del mensaje a vacío después de enviarlo
  };

  // Renderiza el componente MessageInput
  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <input
          type='text'
          className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
          placeholder='Envía un mensaje'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
          {/* Renderiza un spinner de carga si loading es verdadero, de lo contrario, renderiza el icono de enviar */}
          {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput; // Exporta el componente MessageInput

