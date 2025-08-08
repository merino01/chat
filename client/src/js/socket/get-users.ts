const chattingUsers = {
	userId: '',
	partnerId: ''
};

export const getUsers = () => {
	return chattingUsers;
};

export const setUsers = (userId: string, partnerId: string) => {
	chattingUsers.userId = userId;
	chattingUsers.partnerId = partnerId;
};
