import { useState } from "react"; // Importa useState desde React para manejar el estado local
import { IoSearchSharp } from "react-icons/io5"; // Importa el icono de búsqueda desde react-icons
import useConversation from "../../zustand/useConversation"; // Importa el hook useConversation para manejar la conversación seleccionada
import useGetConversations from "../../hooks/useGetConversations"; // Importa el hook useGetConversations para obtener las conversaciones
import toast from "react-hot-toast"; // Importa la librería toast para mostrar mensajes de notificación

// Componente SearchInput que muestra un campo de búsqueda y un botón de búsqueda
const SearchInput = () => {
	const [search, setSearch] = useState(""); // Define el estado local para el término de búsqueda
	const { setSelectedConversation } = useConversation(); // Obtiene la función setSelectedConversation del hook useConversation
	const { conversations } = useGetConversations(); // Obtiene la lista de conversaciones del hook useGetConversations

	// Maneja la presentación del formulario de búsqueda
	const handleSubmit = (e) => {
		e.preventDefault(); // Evita el comportamiento por defecto del formulario
		if (!search) return; // Si el campo de búsqueda está vacío, no hace nada

		// Verifica que el término de búsqueda tenga al menos 3 caracteres
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long"); // Muestra un mensaje de error si el término de búsqueda es corto
		}

		// Busca una conversación que coincida con el término de búsqueda
		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		// Si se encuentra una conversación, la selecciona y limpia el campo de búsqueda
		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else {
			toast.error("No such user found!"); // Si no se encuentra una conversación, muestra un mensaje de error
		}
	};

	// Renderiza el componente SearchInput
	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
			{/* Campo de texto para ingresar el término de búsqueda */}
			<input
				type='text'
				placeholder='Buscar…'
				className='input input-bordered rounded-full'
				value={search}
				onChange={(e) => setSearch(e.target.value)} // Actualiza el estado del término de búsqueda al cambiar el valor del campo
			/>
			{/* Botón de búsqueda que activa la función de handleSubmit */}
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' /> {/* Icono de búsqueda */}
			</button>
		</form>
	);
};
export default SearchInput; // Exporta el componente SearchInput
