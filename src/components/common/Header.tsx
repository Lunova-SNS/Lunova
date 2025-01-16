import Logo from '@/assets/images/HeaderLogo.svg';
import { useState } from 'react';
import { BiNotification } from 'react-icons/bi';
import { VscSettings } from 'react-icons/vsc';
import Notification from './Noitfication';

export default function Header() {
	const [isNotiOpened, setIsNotiOpened] = useState<boolean>(false);
	const handleNotification = () => {
		setIsNotiOpened(!isNotiOpened);
	};
	return (
		<>
			<div className='flex items-center justify-between bg-white'>
				<div className='mb-3 ml-default mt-1'>
					<img src={Logo} alt='AuraSphere' />
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
					<VscSettings size={24} />
				</div>
			</div>
			<Notification isNotiOpened={isNotiOpened} setIsNotiOpened={setIsNotiOpened} />
		</>
	);
}
