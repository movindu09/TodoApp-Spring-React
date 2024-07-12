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
