import MessageContainer from "../../components/messages/MessageContainer"; // Importa el componente MessageContainer desde la ruta específica
import Sidebar from "../../components/sidebar/Sidebar"; // Importa el componente Sidebar desde la ruta específica

const Home = () => { // Define el componente Home
	return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebar /> {/* Renderiza el componente Sidebar */}
			<MessageContainer /> {/* Renderiza el componente MessageContainer */}
		</div>
	);
};
export default Home; // Exporta el componente Home
