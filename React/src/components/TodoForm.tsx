import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { TodoFormProps } from '../models/Interfaces';
import DropdownMenu from './Dropdown';

const TodoForm: React.FC<TodoFormProps> = (props) => {
	const { selectedTodo, onUpdateHandler, updateVisible, handleUpdateCancel } =
		props;

	const [form] = Form.useForm();
	const [status, setStatus] = useState(selectedTodo.status);

	useEffect(() => {
		form.resetFields();
		setStatus(selectedTodo.status);
	}, [selectedTodo, form]);

	const onStatusChange = (newStatus: string) => {
		setStatus(newStatus);
	};

	return (
		<Modal
			title="Update Todo"
			open={updateVisible}
			onCancel={handleUpdateCancel}
			footer=""
		>
			{selectedTodo && (
				<Form
					form={form}
					layout="vertical"
					initialValues={{ ...selectedTodo, status }}
					onFinish={(values) =>
						onUpdateHandler({ ...values, status })
					}
				>
					<Form.Item label="Title" name="title">
						<Input />
					</Form.Item>
					<Form.Item label="Description" name="description">
						<Input />
					</Form.Item>
					<Form.Item label="Status" name="status">
						<DropdownMenu
							status={status}
							onStatusChange={onStatusChange}
						/>
					</Form.Item>
					<Button type="primary" htmlType="submit">
						Update
					</Button>
				</Form>
			)}
		</Modal>
	);
};

export default TodoForm;
