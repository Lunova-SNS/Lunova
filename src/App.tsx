import { Routes, Route } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import CommonLayout from './layouts/CommonLayout';
import Header from './components/Header';
import Footer from './components/Footer';
import MainLayout from './layouts/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { SettingPage } from './pages/SettingPage';
import { UserInfoPage } from './pages/UserInfoPage';
import UploadPage from './pages/UploadPage';

function App() {
	return (
		<Routes>
			<Route element={<CommonLayout />}>
				<Route element={<MainLayout />}>
					<Route path='/' element={<MainPage />} />
					<Route path='/userinfo' element={<UserInfoPage />} />
				</Route>
				<Route path='/header' element={<Header />} />
				<Route path='/footer' element={<Footer />} />
				<Route path='/uploadPage' element={<UploadPage />} />/
				<Route path='/uploadPage/:post_id' element={<UploadPage />} />/
				<Route path='/login' element={<LoginPage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/setting' element={<SettingPage />} />
			</Route>
		</Routes>
	);
}

export default App;
