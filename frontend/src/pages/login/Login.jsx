import { useState } from "react"; // Importa el hook useState de React
import { Link } from "react-router-dom"; // Importa el componente Link de react-router-dom para gestionar la navegación entre rutas
import useLogin from "../../hooks/useLogin"; // Importa el hook useLogin desde la ruta específica

const Login = () => { // Define el componente Login
	const [username, setUsername] = useState(""); // Inicializa el estado para el nombre de usuario
	const [password, setPassword] = useState(""); // Inicializa el estado para la contraseña

	const { loading, login } = useLogin(); // Obtiene el estado de carga y la función de inicio de sesión del hook useLogin

	const handleSubmit = async (e) => { // Define la función para manejar el envío del formulario de inicio de sesión
		e.preventDefault(); // Previene el comportamiento por defecto del envío del formulario
		await login(username, password); // Inicia sesión con el nombre de usuario y la contraseña proporcionados
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login
					<span className='text-purple-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}> {/* Se envía el formulario cuando se envía el formulario */}
					<div className="p-3">
						
						<input
							type='text'
							placeholder='Escriba su usuario'
							className='w-full input input-bordered h-10'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div className="p-3">
						
						<input
							type='password'
							placeholder='Escriba su contraseña'
							className='w-full input input-bordered h-10'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<Link to='/signup' className='text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"¿No"} tienes una cuenta? {/* Enlace para navegar a la página de registro si no tiene una cuenta */}
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2' disabled={loading}> {/* Botón de inicio de sesión */}
							{loading ? <span className='loading loading-spinner '></span> : "Login"} {/* Muestra un spinner de carga si está cargando */}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login; // Exporta el componente Login
