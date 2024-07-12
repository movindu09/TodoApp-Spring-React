import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import axios from 'axios';
import { Todo } from '../models/Interfaces';
import { useNotification } from '../NotificationContext';
import TodoTable from '../components/TodoTable';
import TodoForm from '../components/TodoForm';


const initialState: Todo = {
	id: '',
	title: '',
	description: '',
	status: '',
};

const Home: React.FC = () => {
	const [lists, setLists] = useState<Todo[]>([]);
	const [visible, setVisible] = useState(false);
	const [updateVisible, setUpdateVisible] = useState(false);
	const [selectedTodo, setSelectedTodo] = useState<Todo>(initialState);
	const [viewVisible, setViewVisible] = useState(false);
	const [selectedViewTodo, setSelectedViewTodo] =	useState<Todo>(initialState);
	const { successNotification, errorNotification } = useNotification();

	const showModal = () => {
		setVisible(true);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	const showViewModal = (record: Todo) => {
		setSelectedViewTodo(record);
		setViewVisible(true);
	};

	const handleUpdateCancel = () => {
		setUpdateVisible(false);
	};

	const showUpdateModal = (record: Todo) => {
		setSelectedTodo(record);
		setUpdateVisible(true);
	};

	const handleViewCancel = () => {
		setViewVisible(false);
	};

	useEffect(() => {
		const fetchTodos = async () => {
			try {
				const response = await axios.get(
					'http://localhost:8090/api/todos'
				);
				setLists(response.data);
				console.log(response.data);
				successNotification('Data has been loaded successfully.');
			} catch (error) {
				console.log(error);
				errorNotification('Unable to get the data.');
			}
		};
		fetchTodos();
	}, [successNotification, errorNotification]);

	const handleDelete = async (id: string) => {
		console.log(id);
		try {
			await axios.delete(`http://localhost:8090/api/todos/${id}`);
			const updatedRecords = lists.filter((record) => record.id !== id);
			setLists(updatedRecords);
			successNotification('Successfully deleted to-do item');
		} catch (error) {
			console.error('Error deleting to-do item:', error);
			errorNotification('Unable to delete to-do item.');
		}
	};

	const onFinishHandler = async (values: Todo) => {
		try {
			const response = await axios.post(
				'http://localhost:8090/api/todos',
				values
			);
			setLists([response.data, ...lists]);
			successNotification('Successfully added user record.');
		} catch (error) {
			console.log('Error creating to-do:', error);
			errorNotification('Unable to add the user record.');
		}
	};

	const onUpdateHandler = async (values: Todo) => {
		const id = selectedTodo.id;
		try {
			const response = await axios.put(
				`http://localhost:8090/api/todos/${id}`,
				values
			);
			const updatedRecords = lists.map((record) =>
				record.id === selectedTodo.id ? response.data : record
			);
			setLists(updatedRecords);
			setUpdateVisible(false);
			successNotification('Successfully changed user record.');
		} catch (error) {
			console.log(error);
			errorNotification('Unable to change user record.');
		}
	};

	return (
		<div>
			<div className="Heading">
				<h1>ToDo - List</h1>
			</div>
			<div style={{ width: '500px', margin: 'auto', padding: '20px' }}>
				<Form
					layout="vertical"
					onFinish={onFinishHandler}
					initialValues={selectedTodo}
					className="form-container"
				>
					<Form.Item label="Title" name="title">
						<Input />
					</Form.Item>
					<Form.Item label="Description" name="description">
						<Input />
					</Form.Item>
					<Form.Item name="status" label="Status">
						<Select>
							<Select.Option value="pending">
								Pending
							</Select.Option>
							<Select.Option value="complete">
								Complete
							</Select.Option>
						</Select>
					</Form.Item>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form>
			</div>

			<TodoTable
				data={lists}
				showModal={showModal}
				showUpdateModal={showUpdateModal}
				isModalOpen={visible}
				handleCancel={handleCancel}
				updateVisible={updateVisible}
				handleUpdateCancel={handleUpdateCancel}
				selectedTodo={selectedTodo}
				handleDelete={handleDelete}
				showViewModal={showViewModal}
				handleViewCancel={handleViewCancel}
				viewVisible={viewVisible}
				selectedViewTodo={selectedViewTodo}
                cancel={handleCancel}
			/>

			<TodoForm
				selectedTodo={selectedTodo}
				onUpdateHandler={onUpdateHandler}
				updateVisible={updateVisible}
				handleUpdateCancel={handleUpdateCancel}
			/>
		</div>
	);
};

export default Home;