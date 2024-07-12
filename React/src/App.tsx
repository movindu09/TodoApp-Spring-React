import './App.css'
import { NotificationProvider } from './NotificationContext'
import Home from './pages/Home'

import { Route, Routes } from 'react-router-dom';

function App() {

  return (
		<NotificationProvider>
			<Routes>
				{/* <Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} /> */}
				<Route path="/home" element={<Home />} />
			</Routes>
		</NotificationProvider>
  );
}

export default App
