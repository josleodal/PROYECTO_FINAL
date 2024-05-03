import bcrypt from "bcryptjs"; // Importa la librería bcrypt para el hash de contraseñas
import User from "../models/user.model.js"; // Importa el modelo de usuario
import generateTokenAndSetCookie from "../utils/generateToken.js"; // Importa una función para generar tokens JWT y establecer cookies

// Controlador para el registro de nuevos usuarios
export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body; // Extrae los datos del cuerpo de la solicitud

		// Comprueba si las contraseñas coinciden
		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		// Busca si el nombre de usuario ya existe en la base de datos
		const user = await User.findOne({ username });

		// Si el usuario ya existe, devuelve un error
		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// Genera el hash de la contraseña antes de almacenarla en la base de datos
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Define la URL del avatar según el género del usuario
		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		// Crea un nuevo usuario con los datos proporcionados
		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

		// Si se crea el usuario correctamente, genera un token JWT, lo establece como cookie y devuelve los detalles del usuario
		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Controlador para el inicio de sesión de usuarios existentes
export const login = async (req, res) => {
	try {
		const { username, password } = req.body; // Extrae el nombre de usuario y la contraseña del cuerpo de la solicitud
		const user = await User.findOne({ username }); // Busca el usuario en la base de datos
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || ""); // Compara la contraseña proporcionada con la almacenada en la base de datos

		// Si el usuario no existe o la contraseña es incorrecta, devuelve un error
		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		// Si el inicio de sesión es exitoso, genera un token JWT, lo establece como cookie y devuelve los detalles del usuario
		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Controlador para cerrar sesión de usuarios
export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 }); // Establece la cookie jwt con una fecha de expiración pasada, lo que eliminará la cookie del navegador
		res.status(200).json({ message: "Logged out successfully" }); // Devuelve un mensaje de éxito
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" }); // Devuelve un error si algo sale mal
	}
};
