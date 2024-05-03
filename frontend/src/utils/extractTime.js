// Exporta la función extractTime
export function extractTime(dateString) {
	// Convierte la cadena de fecha en un objeto Date
	const date = new Date(dateString);
	// Extrae las horas y las minutos del objeto Date y asegura que tengan dos dígitos
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	// Retorna la hora en formato HH:mm
	return `${hours}:${minutes}`;
}

// Función auxiliar para añadir un cero delante de números de un solo dígito
function padZero(number) {
	// Convierte el número a cadena y añade un cero al principio si tiene menos de dos dígitos
	return number.toString().padStart(2, "0");
}
