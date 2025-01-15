import { PiAsteriskSimpleBold } from 'react-icons/pi';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

export const EmailPassword = () => {
	return (
		<div className='flex min-w-full flex-col'>
			{/* 이메일 */}
			<div className='mb-[16px] flex min-w-full justify-end'>
				<div className='flex-grow'>
					<Input placeholder='이메일' />
				</div>
				<Button
					className='ml-[15px]'
					minWidth='min-w-[72px]'
					fontBold='font-medium'
					textSize='text-base'
				>
					중복 확인
				</Button>
			</div>

			{/* 비밀번호 */}
			<div className='mb-[16px] min-w-full'>
				<Input placeholder='비밀번호' />
			</div>

			<div className='mb-[30px] min-w-full'>
				<Input placeholder='비밀번호 확인' />
			</div>

			{/* 도움말 */}
			<div className='flex text-xs font-light text-[#757575]'>
				<PiAsteriskSimpleBold size='10px' />
				<div className='ml-[2px] mt-[-1px]'>
					<p>비밀번호는 최소 8자 이상,</p>
					<p>소문자, 대문자, 숫자, 특수 문자(!@#$%^&*)를 각각 하나 이상 포함하세요.</p>
				</div>
			</div>
		</div>
	);
};
