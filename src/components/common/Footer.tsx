import { GrHomeRounded } from 'react-icons/gr';
import { CgAddR } from 'react-icons/cg';
import { CgProfile } from 'react-icons/cg';
import {  useNavigate } from 'react-router-dom';

export default function Footer() {
	const navigate = useNavigate();
	return (
		<div className='flex h-12 justify-between bg-white'>
			<div className='mx-default flex w-full items-center'>
				<div>
					<GrHomeRounded
						size={26.5}
						onClick={() => {
							navigate('/');
						}}
					/>
				</div>
				<div className='flex flex-grow justify-center'>
					<CgAddR
						size={33}
						onClick={() => {
							navigate('/uploadPage');
						}}
					/>
				</div>
				<div>
					<CgProfile
						size={32}
						onClick={() => {
							navigate('/userinfo');
						}}
					/>
				</div>
			</div>
		</div>
	);
}
