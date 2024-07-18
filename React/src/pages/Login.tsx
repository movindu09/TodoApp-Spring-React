import React, { useContext } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useNotification } from '../NotificationContext';
import { AuthContext } from '../hooks/AuthContext';
import { AuthContextProps, LoginValues } from '../models/Interfaces';
import '../styles/Login.css';
import Navbar from '../components/Navbar';
import { jwtDecode } from 'jwt-decode';
const { Text, Title } = Typography;

const Login: React.FC<AuthContextProps> = () => {
	const [form] = Form.useForm();
	const { successNotification, errorNotification } = useNotification();
	const { setToken, setRole } = useContext(AuthContext);
	const navigate = useNavigate();

	

	const onFinish = async (values: LoginValues) => {
		const { email, password } = values;
		console.log('Success:', values);
		try {
			const response = await axios.post(
				'http://localhost:8090/api/v1/auth/signin',
				{
					email,
					password,
				}
			);
			console.log(response.data);
			if (response) {
                const { token } = response.data;
                localStorage.setItem('token', token);
                setToken(token);
				const decodedToken: { role: string } = jwtDecode(token);
				const role = decodedToken.role;
                localStorage.setItem('role', role);
                setRole(role);
				console.log(role);
                successNotification('Login successful');
				navigate('/home');
            }
		} catch (error: any) {
			console.log('Error:', error);
			if (error.response && error.response.data) {
				if (error.response.status === 500) {
					const errorMessage = error.response.data.message;
					errorNotification('Login failed', errorMessage);
				} else {
					const errorMessages = Object.values(error.response.data);
					errorNotification('Login failed', errorMessages.join(''));
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
							rules={[
								{
									message: 'Please input your Password!',
								},
							]}
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
