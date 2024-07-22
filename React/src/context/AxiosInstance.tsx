import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:8090',
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

		if (response && response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			const refreshToken = localStorage.getItem('refreshToken');
			if (!refreshToken) {
				console.error('No refresh token found');
				return Promise.reject(error);
			}

			try {
				const refreshResponse = await axios.post(
					'http://localhost:8090/api/v1/auth/refresh',
					{ token: refreshToken }
				);

				console.log('Refresh API response:', refreshResponse.data);

				const { token, newRefreshToken } = refreshResponse.data;

				localStorage.setItem('token', token);
				localStorage.setItem('refreshToken', newRefreshToken);
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
