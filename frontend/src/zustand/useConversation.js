import { create } from "zustand"; // Importa la función 'create' de la biblioteca Zustand

// Definición del hook 'useConversation' utilizando Zustand
const useConversation = create((set) => ({
	selectedConversation: null, // Estado para la conversación seleccionada, inicialmente establecido como null
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }), // Función para establecer la conversación seleccionada
	messages: [], // Estado para almacenar los mensajes de la conversación, inicialmente establecido como un array vacío
	setMessages: (messages) => set({ messages }), // Función para establecer los mensajes de la conversación
}));

export default useConversation; // Exporta el hook 'useConversation'
