import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext"; // Importa el hook useAuthContext del contexto de autenticación
import io from "socket.io-client"; // Importa el cliente de socket.io para establecer la conexión con el servidor

// Crea un nuevo contexto para el socket
const SocketContext = createContext();

// Crea un hook personalizado para acceder al contexto del socket
export const useSocketContext = () => {
	// Utiliza el hook useContext para acceder al contexto SocketContext
	return useContext(SocketContext);
};

// Proveedor del contexto del socket
export const SocketContextProvider = ({ children }) => {
	// Estado para almacenar el socket y la lista de usuarios en línea
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext(); // Obtiene el usuario autenticado del contexto de autenticación

	// Efecto para establecer la conexión del socket cuando el usuario se autentica
	useEffect(() => {
		if (authUser) {
			// Establece la conexión del socket con el servidor
			const socket = io("http://localhost:3000/", {
				query: {
					userId: authUser._id, // Envía el ID de usuario al servidor para identificar al usuario
				},
			});

			setSocket(socket); // Almacena el socket en el estado

			// Configura un listener para actualizar la lista de usuarios en línea
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			// Devuelve una función de limpieza para cerrar la conexión del socket cuando el componente se desmonta
			return () => socket.close();
		} else {
			// Si no hay usuario autenticado, cierra la conexión del socket y establece el socket en null
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]); // Ejecuta el efecto cada vez que cambia el usuario autenticado

	// Proporciona el contexto del socket y la lista de usuarios en línea a los componentes hijos
	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
