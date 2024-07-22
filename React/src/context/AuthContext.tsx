import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface AuthContextProps {
	token: string | null;
	setToken: (value: string | null) => void;
	logout: () => void;
	role: string | null;
	setRole: (value: string | null) => void;
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
		if (storedToken && storedRole) {
			setToken(storedToken);
			setRole(storedRole);
			navigate('/home');
		}
	}, [navigate]);


	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('role');
		localStorage.removeItem('refreshToken');
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
