import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextProps } from '../models/Interfaces';

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
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
