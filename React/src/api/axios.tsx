import api from '../context/AxiosInstance';

const todoURL = import.meta.env.VITE_TODO_URL;
const authURL = import.meta.env.VITE_AUTH_URL;

const getTodos = async (token:string) => {
	const response = await api.get(`${todoURL}/todos`);
	return response.data;
};

const deleteTodo = async (id: string, token: string) => {
	await api.delete(`${todoURL}/todos/${id}`);
};

const createTodo = async (todo: any, token: string) => {
	const response = await api.post(`${todoURL}/todos`, todo);
	return response.data;
};

const updateTodo = async (id: string, todo: any, token: string) => {
	const response = await api.put(`${todoURL}/todos/${id}`, todo);
	return response.data;
};

const userLogin = async (email: string, password: string) => {
	const response = await api.post(`${authURL}/signin`, { email, password });
	return response.data;
};

const userSignup = async (
	firstName: string,
	lastName: string,
	email: string,
	password: string,
	role: string
) => {
	const response = await api.post(`${authURL}/signup`, {
		firstName,
		lastName,
		email,
		password,
		role,
	});
	return response.data;
};

export { getTodos, deleteTodo, createTodo, updateTodo, userLogin, userSignup };
