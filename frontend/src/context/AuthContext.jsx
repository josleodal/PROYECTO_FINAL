import { createContext, useContext, useState } from "react";

// Crea un contexto de autenticación
export const AuthContext = createContext();

// Crea un hook personalizado para acceder al contexto de autenticación
export const useAuthContext = () => {
	// Utiliza el hook useContext para acceder al contexto AuthContext
	return useContext(AuthContext);
};

// Crea un proveedor de contexto de autenticación
export const AuthContextProvider = ({ children }) => {
	// Define el estado inicial del usuario autenticado, obtenido del localStorage si está disponible
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

	// Proporciona el contexto de autenticación a los componentes hijos
	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};
