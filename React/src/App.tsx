import './App.css';
import { NotificationProvider } from './NotificationContext';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider } from './hooks/AuthContext';

function App() {
	return (
		<AuthProvider>
			<NotificationProvider>
				<Routes>
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/home" element={<Home />} />
				</Routes>
			</NotificationProvider>
		</AuthProvider>
	);
}

export default App;
