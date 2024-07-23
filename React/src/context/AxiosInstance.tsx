import axios from 'axios';


const baseURL = import.meta.env.VITE_BASE_URL;
const authURL = import.meta.env.VITE_AUTH_URL;

console.log('Base URL:', baseURL);
console.log('Auth URL:', authURL);

const api = axios.create({
	baseURL: baseURL,
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
	(response) => {
		return response;
	},
	async (error) => {
		const { response } = error;
		const originalRequest = error.config;

		if (response && response.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true;

			const oldRefreshToken = localStorage.getItem('refreshToken');
			if (!oldRefreshToken) {
				console.error('No refresh token found');
				return Promise.reject(error);
			}

			try {
				const refreshResponse = await axios.post(`${authURL}/refresh`, {
					token: oldRefreshToken,
				});

				console.log('Refresh API response:', refreshResponse.data);

				const { token, refreshToken } = refreshResponse.data;

				localStorage.setItem('token', token);
				localStorage.setItem('refreshToken', refreshToken);
				api.defaults.headers['Authorization'] = `Bearer ${token}`;

				originalRequest.headers['Authorization'] = `Bearer ${token}`;
				return api(originalRequest);
			} catch (refreshError) {
				console.error('Error during token refresh:', refreshError);
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export default api;
