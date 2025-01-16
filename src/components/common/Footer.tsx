import { GrHomeRounded } from 'react-icons/gr';
import { CgAddR } from 'react-icons/cg';
import { CgProfile } from 'react-icons/cg';

export default function Footer() {
	return (
		<div className='flex h-12 justify-between bg-white'>
			<div className='mx-default flex w-full items-center'>
				<div>
					<GrHomeRounded size={26.5} />
				</div>
				<div className='flex flex-grow justify-center'>
					<CgAddR size={33} />
				</div>
				<div>
					<CgProfile size={32} />
				</div>
			</div>
		</div>
	);
}
