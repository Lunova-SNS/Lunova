import DropDown from '@/components/MainPage/DropDown';
import { RiArrowDropDownLine } from 'react-icons/ri';

export default function mainPage() {
	return (
		<>
			<div>
				<div className='mt-2 flex flex-row'>
					<RiArrowDropDownLine size={25} />
					<DropDown />
				</div>
			</div>
		</>
	);
}
