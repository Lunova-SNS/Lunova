import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import CommonLayout from './layouts/CommonLayout';
import MainLayout from './layouts/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { SettingPage } from './pages/SettingPage';
import { UserInfoPage } from './pages/UserInfoPage';
import UploadPage from './pages/UploadPage';
import { useEffect } from 'react';

function App() {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname === '/login' || location.pathname === '/signup') {
			navigate(location.pathname, { replace: true });
		} else {
			console.log('현재 경로:', location.pathname);
		}
	}, [location.pathname, navigate]);

	return (
		<Routes>
			<Route element={<CommonLayout />}>
				<Route element={<MainLayout />}>
					<Route path='/' element={<MainPage />} />
					<Route path='/userinfo' element={<UserInfoPage />} />
				</Route>
				<Route path='/uploadPage' element={<UploadPage />} />/
				<Route path='/uploadPage/:postId' element={<UploadPage />} />/
				<Route path='/login' element={<LoginPage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/setting' element={<SettingPage />} />
			</Route>
		</Routes>
	);
}

export default App;
