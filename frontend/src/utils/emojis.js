// Lista de emojis divertidos
export const funEmojis = [
	"👾", "⭐", "🌟", "🎉", "🎊", "🎈", "🎁", "🎂", "🎄", "🎃", "🎗", "🎟", "🎫", "🎖", "🏆", "🏅", "🥇", "🥈", "🥉", "⚽", "🏀",
	"🏈", "⚾", "🎾", "🏐", "🏉", "🎱", "🏓", "🏸", "🥅", "🏒", "🏑", "🏏", "⛳", "🏹", "🎣", "🥊", "🥋", "🎽", "⛸", "🥌", "🛷", 
	"🎿", "⛷", "🏂", "🏋️", "🤼", "🤸", "🤺", "⛹️", "🤾", "🏌️", "🏇", "🧘"
];

// Función para obtener un emoji aleatorio de la lista
export const getRandomEmoji = () => {
	return funEmojis[Math.floor(Math.random() * funEmojis.length)]; // Retorna un emoji aleatorio
};
