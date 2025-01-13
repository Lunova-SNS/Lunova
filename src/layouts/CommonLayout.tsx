import { Outlet } from 'react-router-dom';

export default function CommonLayout() {
	return (
		<>
			<div className='mx-auto h-[800px] w-[360px] bg-backColor'>
				<Outlet />
			</div>
		</>
	);
}
