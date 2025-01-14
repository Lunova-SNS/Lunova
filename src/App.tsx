import { Routes, Route } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import CommonLayout from './layouts/CommonLayout';
import Header from './components/Header';
import Footer from './components/Footer';
import MainLayout from './layouts/MainLayout';
import UploadPage from './pages/UploadPage';

function App() {
	return (
		<Routes>
			<Route element={<CommonLayout />}>
				<Route element={<MainLayout />}>
					<Route path='/' element={<MainPage />} />
				</Route>

				<Route path='/header' element={<Header />} />
				<Route path='/footer' element={<Footer />} />
				<Route path='/uploadPage' element={<UploadPage />} />
			</Route>
		</Routes>
	);
}

export default App;
