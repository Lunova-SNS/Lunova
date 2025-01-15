// MainLayout.tsx
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
	return (
		<div className='flex min-h-screen flex-col'>
			{/* Header: 고정 영역 */}
			<header className='z-100 fixed top-0 w-full min-w-[360px] max-w-[767px]'>
				<Header />
			</header>

			{/* Main Content */}
			<main className='mb-[48px] mt-[67px]'>
				<Outlet />
			</main>

			{/* Footer: 고정 영역 */}
			<div className='z-100 fixed bottom-0 w-full min-w-[360px] max-w-[767px]'>
				<Footer />
			</div>
		</div>
	);
};

export default MainLayout;
