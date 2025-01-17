import Logo from '@/assets/images/HeaderLogo.svg';
import { useState } from 'react';
import { BiNotification } from 'react-icons/bi';
import { VscSettings } from 'react-icons/vsc';
import Notification from './Noitfication';
import { useNavigate } from 'react-router-dom';

export default function Header() {
	const [isNotiOpened, setIsNotiOpened] = useState<boolean>(false);
	const handleNotification = () => {
		setIsNotiOpened(!isNotiOpened);
	};
	const navigate = useNavigate();
	return (
		<>
			<div className='flex items-center justify-between bg-white'>
				<div className='mb-3 ml-default mt-1'>
					<img
						src={Logo}
						alt='AuraSphere'
						onClick={() => {
							navigate('/');
						}}
					/>
				</div>
				<div className='mr-default flex gap-6'>
					<BiNotification
						size={24}
						onClick={(e) => {
							e.stopPropagation();
							handleNotification();
						}}
						type='button'
						className='cursor-pointer'
					/>
					<VscSettings
						size={24}
						onClick={() => {
							navigate('/setting');
						}}
					/>
				</div>
			</div>
			<Notification isNotiOpened={isNotiOpened} setIsNotiOpened={setIsNotiOpened} />
		</>
	);
}
