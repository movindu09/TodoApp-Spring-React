import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


export interface AuthContextProps {
	token: string | null;
	setToken: (value: string | null) => void;
	logout: () => void;
	role: string | null;
	setRole: (value: string | null) => void;
	refreshToken: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>(
	{} as AuthContextProps
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [token, setToken] = useState<string | null>(null);
	const [role, setRole] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		const storedRole = localStorage.getItem('role');
		if (storedToken) {
			setToken(storedToken);
			setRole(storedRole);
			navigate('/home');
		}
	}, [navigate]);

	const refreshToken = async () => {
		try {
			const refreshToken = localStorage.getItem('refreshToken');
			const response = await axios.post(
				'http://localhost:8090/api/v1/auth/refresh-token',
				{
					refreshToken,
				}
			);
			if (response.status === 200) {
				const { token } = response.data;
				localStorage.setItem('token', token);
				setToken(token);
				const decodedToken: { role: string } = jwtDecode(token);
				setRole(decodedToken.role);
			} else {
				logout();
			}
		} catch (error) {
			logout();
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('role');
		setToken(null);
		setRole(null);
		navigate('/login');
	};

	return (
		<AuthContext.Provider
			value={{
				token,
				setToken,
				role,
				setRole,
				logout,
				refreshToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
