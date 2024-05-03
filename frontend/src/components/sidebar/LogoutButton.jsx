import { BiLogOut } from "react-icons/bi"; // Importa el icono de logout desde react-icons
import useLogout from "../../hooks/useLogout"; // Importa el hook useLogout para manejar el proceso de logout

// Componente LogoutButton que muestra un botón de logout
const LogoutButton = () => {
	const { loading, logout } = useLogout(); // Obtiene el estado de carga y la función de logout del hook useLogout

	// Renderiza el componente LogoutButton
	return (
		<div className='mt-auto'>
			{/* Renderiza el icono de logout o un indicador de carga según el estado */}
			{!loading ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} /> // Icono de logout
			) : (
				<span className='loading loading-spinner'></span> // Indicador de carga
			)}
		</div>
	);
};
export default LogoutButton; // Exporta el componente LogoutButton
