import React, { createContext, useContext } from 'react';
import { notification } from 'antd';
import {
	NotificationContextProps,
	NotificationProviderProps,
} from './models/Interfaces.tsx';

const NotificationContext = createContext<NotificationContextProps | undefined>(
	undefined
);

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
	children,
}) => {
	const openNotification = (
		type: 'success' | 'error',
		message: string,
		description?: string
	) => {
		notification[type]({
			message,
			description,
		});
	};

	const successNotification = (message: string, description?: string) => {
		notification.destroy();
		openNotification('success', message, description);
	};

	const errorNotification = (message: string, description?: string) => {
		notification.destroy();
		openNotification('error', message, description);
	};

	return (
		<NotificationContext.Provider
			value={{ successNotification, errorNotification }}
		>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotification = (): NotificationContextProps => {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error(
			'useNotification must be used within a NotificationProvider'
		);
	}
	return context;
};
