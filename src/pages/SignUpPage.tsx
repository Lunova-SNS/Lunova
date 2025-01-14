import { BackButton } from '@/components/common/BackButton';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { EmailPassword } from '@/components/signUpPage/EmailPassword';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignUpPage = () => {
	const [section, setSection] = useState<{ [key: string]: string }>({
		0: 'emailPassword',
		1: 'userName',
		2: 'nickName',
	});

	const [sectionCount, setSectionCount] = useState<number>(0);
	const navigate = useNavigate();

	return (
		<div className='mx-default flex flex-col items-center'>
			<BackButton
				onClick={() => setSectionCount((prev) => prev - 1)}
				overrideBack={true}
				fallbackUrl={section[sectionCount.toString()] === 'emailPassword' ? '/login' : '/signup'}
				className='absolute left-[30px] top-[38px]'
			/>

			<div className='mt-[66px] min-w-full'>
				<h1 className='text-[20px] font-bold'>
					{section[sectionCount.toString()] === 'emailPassword'
						? '회원가입'
						: section[sectionCount.toString()] === 'userName'
							? '이름 입력'
							: section[sectionCount.toString()] === 'nickName'
								? '사용자 이름 만들기'
								: false}
				</h1>

				<section className='my-[22px]'>
					{section[sectionCount.toString()] === 'emailPassword' ? (
						<EmailPassword />
					) : section[sectionCount.toString()] === 'userName' ? (
						<div className='mb-[16px]'>
							<Input placeholder='이름' />
						</div>
					) : section[sectionCount.toString()] === 'nickName' ? (
						<div className='mb-[16px]'>
							<Input placeholder='사용자 이름' />
						</div>
					) : (
						false
					)}
				</section>

				<Button
					onClick={() => {
						sectionCount < 2 ? setSectionCount((prev) => prev + 1) : navigate('/');
					}}
				>
					다음
				</Button>
			</div>
		</div>
	);
};
