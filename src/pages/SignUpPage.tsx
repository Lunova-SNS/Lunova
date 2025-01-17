import { BackButton } from '@/components/common/BackButton';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PiAsteriskSimpleBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

export const SignUpPage = () => {
	const {
		register,
		handleSubmit,
		watch,
		trigger,
		formState: { errors },
	} = useForm();

	const [emailChecked, setemailChecked] = useState<string>('');

	const [section, setSection] = useState<{ [key: string]: string }>({
		0: 'emailPassword',
		1: 'nickName',
	});

	const [sectionCount, setSectionCount] = useState<number>(0);
	const navigate = useNavigate();

	const onSubmit = (data) => {
		console.log(data);
	};

	console.log(errors.email);

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
					<form onSubmit={handleSubmit(onSubmit)} className='flex min-w-full flex-col'>
						{/* 이메일 */}
						<div className='mb-[16px] flex min-w-full justify-end'>
							<div className='flex-grow'>
								<Input
									placeholder='이메일'
									{...register('email', {
										required: '이메일은 필수입니다.',
										pattern: {
											value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
											message: '이메일 형식이 올바르지 않습니다.',
										},
										validate: (value) =>
											value === emailChecked
												? '중복된 이메일이 존재합니다. 다른 이메일을 사용해주세요.'
												: true,
									})}
									isValid={errors.email && false}
									errorMessage={errors.email?.message}
								/>
							</div>
							<Button
								onClick={() => {
									trigger('email');
									// api 호출. response.state로 errorMessage에 붙일 예정
									setemailChecked(() => 'asd@asd.com');
								}}
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
							<Input
								type='password'
								placeholder='비밀번호'
								{...register('password', {
									required: '비밀번호는 필수입니다.',
								})}
							/>
						</div>

						<div className='mb-[30px] min-w-full'>
							<Input
								type='password'
								placeholder='비밀번호 확인'
								{...register('passwordConfirm', {
									required: '비밀번호 확인은 필수입니다.',
									validate: (value) =>
										value === watch('password') ? true : '비밀번호가 일치하지 않습니다.',
								})}
							/>
						</div>

						{/* 도움말 */}
						<div className='mb-[20px] flex text-xs font-light text-[#757575]'>
							<PiAsteriskSimpleBold size='10px' />
							<div className='ml-[2px] mt-[-1px]'>
								<p>비밀번호는 최소 8자 이상,</p>
								<p>소문자, 대문자, 숫자, 특수 문자(!@#$%^&*)를 각각 하나 이상 포함하세요.</p>
							</div>
						</div>

						<Button
							type='submit'
							onClick={() => {
								sectionCount < 2 ? setSectionCount((prev) => prev + 1) : navigate('/');
							}}
						>
							다음
						</Button>
					</form>
				) : section[sectionCount.toString()] === 'nickName' ? (
					<div className='min-w-full'>
						<div className='mb-[30px] flex min-w-full justify-end'>
							<div className='flex-grow'>
								<Input placeholder='사용자 이름' />
							</div>
							<Button
								onClick={() => {
									trigger('email');
									// api 호출. response.state로 errorMessage에 붙일 예정
									setemailChecked(() => 'asd@asd.com');
								}}
								className='ml-[15px]'
								minWidth='min-w-[72px]'
								fontBold='font-medium'
								textSize='text-base'
							>
								중복 확인
							</Button>
						</div>

						<Button
							type='submit'
							onClick={() => {
								sectionCount < 1 ? setSectionCount((prev) => prev + 1) : navigate('/');
							}}
						>
							다음
						</Button>
					</div>
				) : (
					false
				)}
			</section>
		</div>
	);
};
