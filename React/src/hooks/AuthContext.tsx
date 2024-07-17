import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextProps } from '../models/Interfaces';

export const AuthContext = createContext<AuthContextProps >({
	userName: null,
	setUserName: () => {},
	token: null,
	setToken: () => {},
	logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [userName, setUserName] = useState<string | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		const checkAuth = () => {
			if(token){
				navigate('/home')
			} 
		};

		checkAuth();
	}, [navigate, token]);

	const logout = () => {
		localStorage.removeItem('token');
		setUserName(null);
		setToken(null);
		navigate('/login');
	};

	return (
		<AuthContext.Provider
			value={{ userName, setUserName, token, setToken, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
