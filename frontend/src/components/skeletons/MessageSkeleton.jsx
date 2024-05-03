// Componente MessageSkeleton utilizado para mostrar un esqueleto de mensaje mientras se carga el contenido real
const MessageSkeleton = () => {
	return (
	  <> {/* Fragmento para envolver los elementos */}
		{/* Sección de información del remitente */}
		<div className='flex gap-3 items-center'> {/* Contenedor de la información del remitente */}
		  <div className='skeleton w-10 h-10 rounded-full shrink-0'></div> {/* Avatar del remitente */}
		  <div className='flex flex-col gap-1'> {/* Contenedor de detalles del remitente */}
			<div className='skeleton h-4 w-40'></div> {/* Nombre del remitente */}
			<div className='skeleton h-4 w-40'></div> {/* Detalle adicional del remitente */}
		  </div>
		</div>

		{/* Sección de información del tiempo */}
		<div className='flex gap-3 items-center justify-end'> {/* Contenedor de la información del tiempo */}
		  <div className='flex flex-col gap-1'> {/* Contenedor de detalles del tiempo */}
			<div className='skeleton h-4 w-40'></div> {/* Marca de tiempo */}
		  </div>
		  <div className='skeleton w-10 h-10 rounded-full shrink-0'></div> {/* Icono de remitente */}
		</div>
	  </> 
	);
};
  
export default MessageSkeleton; // Exporta el componente MessageSkeleton
