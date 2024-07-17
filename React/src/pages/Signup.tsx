import { Button, Form, Input, Select, Typography } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useNotification } from '../NotificationContext';
import '../styles/Signup.css';
import Navbar from '../components/Navbar';
import { SignUpValues } from '../models/Interfaces';

const { Text, Title } = Typography;

const Signup = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const { successNotification, errorNotification } = useNotification();

	const onFinish = async (values: SignUpValues) => {
		console.log('Success:', values);
		const { firstName, lastName, email, password, role } = values;

		try {
			const response = await axios.post(
				'http://localhost:8090/api/v1/auth/signup',
				{
					firstName,
					lastName,
					email,
					password,
					role,
				}
			);
			console.log('response', response.data);

			if (response.status === 201) {
				successNotification('Successfully created user');
				navigate('/login');
			}
		} catch (error: any) {
			console.log('Error:', error);
			if (error.response && error.response.data) {
				const errorMessages = Object.values(error.response.data);
				errorNotification(
					'Cannot create user',
					errorMessages.join('')
				);
			} else {
				errorNotification('Cannot create user', error.message);
			}
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<div>
			<Navbar
				showDashboard={false}
				showLogout={false}
				showHome={false}
				showDashboard2={false}
				showLogin={true}
				showRegister={false}
			/>
			<section className="section">
				<div className="container">
					<div className="header">
						<Title>Sign up</Title>
					</div>
					<Form
						form={form}
						name="normal_signup"
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						layout="vertical"
						requiredMark="optional"
					>
						<Form.Item
							name="firstName"
							rules={[
								{
									message: 'Please input your First Name!',
								},
							]}
						>
							<Input
								prefix={<UserOutlined />}
								placeholder="First Name"
							/>
						</Form.Item>
						<Form.Item
							name="lastName"
							rules={[
								{
									message: 'Please input your Last Name!',
								},
							]}
						>
							<Input
								prefix={<UserOutlined />}
								placeholder="Last Name"
							/>
						</Form.Item>
						<Form.Item
							name="email"
							rules={[
								{
									type: 'email',

									message: 'Please input your Email!',
								},
							]}
						>
							<Input
								prefix={<MailOutlined />}
								placeholder="Email"
							/>
						</Form.Item>
						<Form.Item
							name="password"
							extra="Password needs to be at least 8 characters."
							rules={[
								{
									message: 'Please input your Password!',
								},
								{
									min: 8,
									message:
										'Password must be at least 8 characters!',
								},
							]}
						>
							<Input.Password
								prefix={<LockOutlined />}
								type="password"
								placeholder="Password"
							/>
						</Form.Item>
						<Form.Item name="role" label="Role">
							<Select>
								<Select.Option value="USER">User</Select.Option>
								<Select.Option value="ADMIN">
									Admin
								</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item style={{ marginBottom: '0px' }}>
							<Button block type="primary" htmlType="submit">
								Sign up
							</Button>
							<div className="signup">
								<Text>Already have an account?</Text>{' '}
								<Link to="/login">Sign in</Link>
							</div>
						</Form.Item>
					</Form>
				</div>
			</section>
		</div>
	);
};

export default Signup;
