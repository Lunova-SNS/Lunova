import { Outlet } from 'react-router-dom';

export default function CommonLayout() {
	return (
		<>
			<div className='mx-auto min-h-screen min-w-[360px] max-w-[767px] bg-backColor'>
				<Outlet />
			</div>
		</>
	);
}
