import './App.css';
import { NotificationProvider } from './NotificationContext';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthContext, AuthProvider } from './hooks/AuthContext';
import { useContext } from 'react';


function App() {
	const authContext = useContext(AuthContext);
	return (
		<AuthProvider>
			<NotificationProvider>
				<Routes>
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login {...authContext} />} />
					<Route path="/home" element={<Home />} />
				</Routes>
			</NotificationProvider>
		</AuthProvider>
	);
}

export default App;
