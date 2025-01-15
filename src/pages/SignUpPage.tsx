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
		<div className='min-w-full px-[30px]'>
			<div className='pt-5'>
				<BackButton
					onClick={() => setSectionCount((prev) => prev - 1)}
					overrideBack={true}
					fallbackUrl={section[sectionCount.toString()] === 'emailPassword' ? '/login' : '/signup'}
				/>

				<h1 className='pt-2 text-[20px] font-bold'>
					{section[sectionCount.toString()] === 'emailPassword'
						? '회원가입'
						: section[sectionCount.toString()] === 'userName'
							? '이름 입력'
							: section[sectionCount.toString()] === 'nickName'
								? '사용자 이름 만들기'
								: false}
				</h1>
			</div>

			<section className='my-[22px] flex flex-col items-center'>
				{section[sectionCount.toString()] === 'emailPassword' ? (
					<EmailPassword />
				) : section[sectionCount.toString()] === 'userName' ? (
					<div className='mb-[16px] min-w-full'>
						<Input placeholder='이름' />
					</div>
				) : section[sectionCount.toString()] === 'nickName' ? (
					<div className='mb-[16px] min-w-full'>
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
	);
};
