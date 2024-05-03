import React from "react"; // Importa React para utilizar elementos de JSX
import ReactDOM from "react-dom/client"; // Importa ReactDOM para renderizar componentes en el DOM
import App from "./App.jsx"; // Importa el componente principal de la aplicación
import "./index.css"; // Importa los estilos CSS del índice
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter para envolver la aplicación con el enrutador de React
import { AuthContextProvider } from "./context/AuthContext.jsx"; // Importa AuthContextProvider para proporcionar el contexto de autenticación a la aplicación
import { SocketContextProvider } from "./context/SocketContext.jsx"; // Importa SocketContextProvider para proporcionar el contexto del socket a la aplicación

// Renderiza la aplicación en el DOM
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode> {/* Modo estricto de React */}
		<BrowserRouter> {/* Proveedor del enrutador de React */}
			<AuthContextProvider> {/* Proveedor del contexto de autenticación */}
				<SocketContextProvider> {/* Proveedor del contexto del socket */}
					<App /> {/* Componente principal de la aplicación */}
				</SocketContextProvider>
			</AuthContextProvider>
		</BrowserRouter>
	</React.StrictMode> 
);
