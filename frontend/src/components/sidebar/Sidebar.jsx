import Conversations from "./Conversations"; // Importa el componente Conversations para mostrar la lista de conversaciones
import LogoutButton from "./LogoutButton"; // Importa el componente LogoutButton para permitir al usuario cerrar sesión
import SearchInput from "./SearchInput"; // Importa el componente SearchInput para permitir al usuario buscar conversaciones

// Componente Sidebar que contiene el componente SearchInput, Conversations y LogoutButton
const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'> {/* Contenedor principal */}
			<SearchInput /> {/* Componente SearchInput para buscar conversaciones */}
			<div className='divider px-3'></div> {/* Línea divisoria */}
			<Conversations /> {/* Componente Conversations para mostrar la lista de conversaciones */}
			<LogoutButton /> {/* Componente LogoutButton para permitir al usuario cerrar sesión */}
		</div>
	);
};
export default Sidebar; // Exporta el componente Sidebar
