import axios from 'axios';
import { AuthContext } from './context/AuthContext';

const BASE_URL = 'http://localhost:8090/api';

const api = axios.create({
	baseURL: BASE_URL,
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const refreshToken = localStorage.getItem('refreshToken');
			if (refreshToken) {
				try {
					const response = await axios.post(
						`${BASE_URL}/v1/auth/refresh-token`,
						{
							refreshToken,
						}
					);
					const { token } = response.data;
					localStorage.setItem('token', token);
					api.defaults.headers.common[
						'Authorization'
					] = `Bearer ${token}`;
					return api(originalRequest);
				} catch (error) {
					// Refresh token is expired or invalid
					localStorage.removeItem('token');
					localStorage.removeItem('refreshToken');
					window.location.href = '/login';
				}
			}
		}
		return Promise.reject(error);
	}
);

export default api;
