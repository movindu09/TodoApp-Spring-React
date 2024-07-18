/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const BASE_URL = 'http://localhost:8090/api';

const getTodos = async (token: string) => {
	const response = await axios.get(`${BASE_URL}/todos`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

const deleteTodo = async (id: string, token: string) => {
	await axios.delete(`${BASE_URL}/todos/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const createTodo = async (todo: any, token: string) => {
	const response = await axios.post(`${BASE_URL}/todos`, todo, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

const updateTodo = async (id: string, todo: any, token: string) => {
	const response = await axios.put(`${BASE_URL}/todos/${id}`, todo, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

const userLogin = async (email: string, password: string) => {
	const response = await axios.post(
		'http://localhost:8090/api/v1/auth/signin',
		{
			email,
			password,
		}
	);
	return response.data;
};

const userSignup = async (
	firstName: string,
	lastName: string,
	email: string,
	password: string,
	role: string
) => {
	const response = await axios.post(
		'http://localhost:8090/api/v1/auth/signup',
		{
			firstName,
			lastName,
			email,
			password,
			role,
		}
	);
	return response.data;
};

export { getTodos, deleteTodo, createTodo, updateTodo, userLogin, userSignup };
