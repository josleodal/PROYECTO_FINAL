// Definición del componente GenderCheckbox
const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	// Retorna la estructura del componente
	return (
		<div className='flex'> {/* Contenedor flex para alinear los checkboxes */}
			<div className='form-control'> {/* Contenedor del primer checkbox */}
				<label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""} `}>
					{/* Etiqueta del primer checkbox */}
					<span className='text-white'>Hombre</span> {/* Texto del primer checkbox */}
					<input
						type='checkbox'
						className='checkbox border-slate-900' // Checkbox
						checked={selectedGender === "male"} // Estado del checkbox según el género seleccionado
						onChange={() => onCheckboxChange("male")} // Función que se ejecuta cuando se cambia el estado del checkbox
					/>
				</label>
			</div>
			<div className='form-control'> {/* Contenedor del segundo checkbox */}
				<label className={`label gap-2 cursor-pointer  ${selectedGender === "female" ? "selected" : ""}`}>
					{/* Etiqueta del segundo checkbox */}
					<span className='text-white'>Mujer</span> {/* Texto del segundo checkbox */}
					<input
						type='checkbox'
						className='checkbox border-slate-900' // Checkbox
						checked={selectedGender === "female"} // Estado del checkbox según el género seleccionado
						onChange={() => onCheckboxChange("female")} // Función que se ejecuta cuando se cambia el estado del checkbox
					/>
				</label>
			</div>
		</div>
	);
};

export default GenderCheckbox; // Exporta el componente GenderCheckbox
