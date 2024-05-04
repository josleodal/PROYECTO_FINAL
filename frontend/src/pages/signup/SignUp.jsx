// Importación del componente Link desde react-router-dom para manejar enlaces
import { Link } from "react-router-dom";

// Importación del componente GenderCheckbox desde el archivo local
import GenderCheckbox from "./GenderCheckbox";

// Importación del hook useState desde React
import { useState } from "react";

// Importación del hook useSignup desde el archivo local
import useSignup from "../../hooks/useSignup";

// Definición del componente SignUp
const SignUp = () => {
    // Estado local para almacenar los datos del formulario
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });

    // Desestructuración del hook useSignup para obtener las funciones loading y signup
    const { loading, signup } = useSignup();

    // Función para manejar el cambio en el checkbox de género
    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    };

    // Retorno del JSX que representa el formulario de registro
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Registro <span className='text--500 text-purple-500'> ChatFinal</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="p-2">
                        <input
                            type='text'
                            placeholder='Escriba un nombre'
                            className='w-full input input-bordered  h-10'
                            value={inputs.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                    </div>

                    <div className="p-2">
                        <input
                            type='text'
                            placeholder='Escriba un usuario'
                            className='w-full input  flex flex-start input-bordered h-10'
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>

                    <div className="p-2">
                        <input
                            type='password'
                            placeholder='Escribe una Contraseña'
                            className='w-full input input-bordered h-10'
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>

                    <div className="p-2">
                        <input
                            type='password'
                            placeholder='Confirma la contraseña'
                            className='w-full input input-bordered h-10'
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                    </div>

                    {/* Renderización del componente GenderCheckbox */}
                    <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

                    {/* Enlace al componente de login */}
                    <Link
                        to={"/login"}
                        className='text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block'
                        href='#'
                    >
                        ¿Tienes una cuenta?
                    </Link>

                    {/* Botón para enviar el formulario */}
                    <div>
                        <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
                            {loading ? <span className='loading loading-spinner'></span> : "Registrate"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Exportación del componente SignUp
export default SignUp;
