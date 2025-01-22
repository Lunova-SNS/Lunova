import { GrHomeRounded } from 'react-icons/gr';
import { CgAddR } from 'react-icons/cg';
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
	const navigate = useNavigate();
	return (
		<div className='flex h-12 justify-between bg-white'>
			<div className='mx-default flex w-full items-center'>
				<div className='cursor-pointer'>
					<GrHomeRounded
						size={26.5}
						onClick={() => {
							navigate('/');
						}}
					/>
				</div>
				<div className='flex flex-grow justify-center'>
					<span className='cursor-pointer'>
						<CgAddR
							size={33}
							onClick={() => {
								navigate('/uploadPage');
							}}
						/>
					</span>
				</div>
				<div className='cursor-pointer'>
					<span className='cursor-pointer'>
						<CgProfile
							size={32}
							onClick={() => {
								navigate('/userinfo');
							}}
						/>
					</span>
				</div>
			</div>
		</div>
	);
}
