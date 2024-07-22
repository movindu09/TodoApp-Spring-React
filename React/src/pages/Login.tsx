import React, { useContext } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import { AuthContext } from '../context/AuthContext';
import { LoginValues } from '../models/Interfaces';
import '../styles/Login.css';
import Navbar from '../components/Navbar';
import {jwtDecode} from 'jwt-decode';
import { userLogin } from '../api/axios';

const { Text, Title } = Typography;

const Login: React.FC = () => {
	const [form] = Form.useForm();
	const { successNotification, errorNotification } = useNotification();
	const { setToken, setRole } = useContext(AuthContext);
	const navigate = useNavigate();

	const onFinish = async (values: LoginValues) => {
		try {
			const response = await userLogin(values.email, values.password);
			console.log(response);
			if (response) {
				const { token, refreshToken } = response;
				localStorage.setItem('token', token);
				console.log('token', token);
				localStorage.setItem('refreshToken', refreshToken);
				console.log('refreshToken', refreshToken);
				setToken(token);
				const decodedToken: { role: string } = jwtDecode(token);
				setRole(decodedToken.role);
				localStorage.setItem('role', decodedToken.role);
				successNotification('Login successful');
				navigate('/home');
			}
		} catch (error: any) {
			if (error.response && error.response.data) {
				if (error.response.status === 500) {
					const errorMessage = error.response.data.message;
					errorNotification('Login failed', errorMessage);
				} else {
					const errorMessages = Object.values(error.response.data);
					errorNotification('Login failed', errorMessages.join(' '));
				}
			} else {
				errorNotification(
					'Login failed',
					'An unexpected error occurred.'
				);
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
				showLogin={false}
				showRegister={true}
			/>
			<section className="section">
				<div className="container">
					<div className="header">
						<Title>Login</Title>
					</div>
					<Form
						form={form}
						name="login_form"
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						layout="vertical"
						requiredMark="optional"
					>
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
							rules={[{ message: 'Please input your Password!' }]}
						>
							<Input.Password
								prefix={<LockOutlined />}
								type="password"
								placeholder="Password"
							/>
						</Form.Item>
						<Form.Item style={{ marginBottom: '0px' }}>
							<Button block type="primary" htmlType="submit">
								Login
							</Button>
							<div className="signup">
								<Text>Don't have an account?</Text>{' '}
								<Link to="/signup">Sign up</Link>
							</div>
						</Form.Item>
					</Form>
				</div>
			</section>
		</div>
	);
};

export default Login;
