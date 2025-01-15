import Logo from '@/assets/images/HeaderLogo.svg';
import { BiNotification } from 'react-icons/bi';
import { VscSettings } from 'react-icons/vsc';

export default function Header() {
	return (
		<>
			<div className='flex items-center justify-between bg-white'>
				<div className='mb-3 ml-default mt-1'>
					<img src={Logo} alt='AuraSphere' />
				</div>
				<div className='mr-default flex gap-6'>
					<BiNotification size={24} />
					<VscSettings size={24} />
				</div>
			</div>
		</>
	);
}
