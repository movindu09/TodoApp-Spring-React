import { useContext, useState } from 'react';
import { Menu } from 'antd';
import {
	DashboardOutlined,
	HomeOutlined,
	LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Nav = ({
	showHome,
	showDashboard,
	showDashboard2,
	showLogin,
	showRegister,
	showLogout,
}) => {
	const [current, setCurrent] = useState();
	const navigate = useNavigate();
	const { logout } = useContext(AuthContext);

	const onClick = (e) => {
		setCurrent(e.key);
	};

	const items = [
		showHome && {
			label: 'Home',
			key: 'home',
			icon: <HomeOutlined />,
			onClick: () => {
				navigate('/');
			},
		},
		showDashboard && {
			label: 'Dashboard',
			key: 'dashboard',
			icon: <DashboardOutlined />,
			onClick: () => {
				navigate('/home');
			},
		},
		showDashboard2 && {
			label: 'Dashboard 2',
			key: 'dashboard2',
			icon: <DashboardOutlined />,
			onClick: () => {
				navigate('/dashboard');
			},
		},
		showLogin && {
			label: 'Login',
			key: 'login',
			icon: <LogoutOutlined />,
			onClick: () => {
				navigate('/login');
			},
		},
		showRegister && {
			label: 'Register',
			key: 'register',
			icon: <LogoutOutlined />,
			onClick: () => {
				navigate('/register');
			},
		},
		showLogout && {
			label: 'Logout',
			key: 'logout',
			icon: <LogoutOutlined />,
			onClick: () => {
				logout();
				navigate('/login');
			},
		},
	].filter(Boolean);

	return (
		<Menu
			onClick={onClick}
			selectedKeys={[current]}
			mode="horizontal"
			items={items}
			style={{ display: 'flex', justifyContent: 'right' }}
		/>
	);
};

export default Nav;
