import { Routes, Route } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import CommonLayout from './layouts/CommonLayout';
function App() {
	return (
		<Routes>
			<Route element={<CommonLayout />}>
				<Route path='/' element={<MainPage />} />
			</Route>
		</Routes>
	);
}

export default App;
