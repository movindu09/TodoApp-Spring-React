import { SetStateAction, useContext, useState } from 'react';
import { Menu } from 'antd';
import {
	DashboardOutlined,
	HomeOutlined,
	LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = ({
	showHome,
	showDashboard,
	showDashboard2,
	showLogin,
	showRegister,
	showLogout,
}: {
	showHome: boolean;
	showDashboard: boolean;
	showDashboard2: boolean;
	showLogin: boolean;
	showRegister: boolean;
	showLogout: boolean;
}) => {
	const [current, setCurrent] = useState<string>('');
	const navigate = useNavigate();
	const { logout } = useContext(AuthContext);

	const onClick = (e: { key: SetStateAction<string> }) => {
		setCurrent(e.key);
	};

	const items = [
		showHome && {
			label: 'Home',
			key: 'home',
			icon: <HomeOutlined />,
			onClick: () => {
				navigate('/home');
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
			label: 'Users',
			key: 'users',
			icon: <DashboardOutlined />,
			onClick: () => {
				navigate('/home');
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
				navigate('/signup');
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
			className="nav"
		/>
	);
};

export default Navbar;
