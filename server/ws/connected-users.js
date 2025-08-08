const usersSockets = new Map();

export const addUserSocket = (userId, socket) => {
	usersSockets.set(userId, socket);
	console.log(`Socket added for user ${userId}. Total connected users: ${usersSockets.size}`);
};

export const removeUserSocket = (userId) => {
	usersSockets.delete(userId);
	console.log(`Socket removed for user ${userId}. Total connected users: ${usersSockets.size}`);
};

export const getUserSocket = (userId) => {
	return usersSockets.get(userId);
};
