import { Navigate, Route, Routes } from "react-router-dom"; // Importa componentes y funciones de react-router-dom para manejar rutas
import "./App.css"; // Importa el archivo de estilos CSS de la aplicación
import Home from "./pages/home/Home"; // Importa el componente Home desde la ruta específica
import Login from "./pages/login/Login"; // Importa el componente Login desde la ruta específica
import SignUp from "./pages/signup/SignUp"; // Importa el componente SignUp desde la ruta específica
import { Toaster } from "react-hot-toast"; // Importa el componente Toaster de react-hot-toast para mostrar notificaciones
import { useAuthContext } from "./context/AuthContext"; // Importa el hook useAuthContext desde el contexto de autenticación

function App() { // Define el componente App
	const { authUser } = useAuthContext(); // Obtiene el usuario autenticado del contexto de autenticación

	return (
		<div className='p-4 h-screen flex items-center justify-center'> {/* Contenedor principal de la aplicación */}
			<Routes> {/* Componente para definir las rutas de la aplicación */}
				{/* Ruta para la página de inicio */}
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				{/* Ruta para la página de inicio de sesión */}
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				{/* Ruta para la página de registro */}
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
			</Routes>
			<Toaster /> {/* Componente para mostrar notificaciones */}
		</div>
	);
}

export default App; // Exporta el componente App
