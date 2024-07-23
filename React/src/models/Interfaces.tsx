export interface Todo {
	id: string;
	title: string;
	description: string;
	status: string;
}

export interface TodoTableProps {
	data: Todo[];
	showModal: () => void;
	showUpdateModal: (record: Todo) => void;
	isModalOpen: boolean;
	handleCancel: () => void;
	updateVisible: boolean;
	handleUpdateCancel: () => void;
	selectedTodo: Todo;
	handleDelete: (id: string) => void;
	showViewModal: (record: Todo) => void;
	handleViewCancel: () => void;
	viewVisible: boolean;
	selectedViewTodo: Todo;
	cancel: () => void;
	role: string | null;
}

export interface TodoFormProps {
	selectedTodo: Todo;
	onUpdateHandler: (values: Todo) => void;
	updateVisible: boolean;
	handleUpdateCancel: () => void;
}

export interface PopModalProps {
	isModalOpen: boolean;
	handleOk: () => void;
	handleCancel: () => void;
	title: string;
}

export interface DropdownMenuProps {
	status: string;
	onStatusChange: (value: string) => void;
}

export interface NotificationContextProps {
	successNotification: (message: string, description?: string) => void;
	errorNotification: (message: string, description?: string) => void;
}

export interface NotificationProviderProps {
	children: React.ReactNode;
}

export interface LoginValues {
	email: string;
	password: string;
}

export interface SignUpValues {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: string;
}

export interface AuthContextProps {
	token: string | null;
	setToken: (value: string | null) => void;
	logout: () => void;
	role: string | null;
	setRole: (value: string | null) => void;
}