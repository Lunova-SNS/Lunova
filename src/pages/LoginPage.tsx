import logo from '@/assets/images/HeaderLogo.svg';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({ mode: 'onChange' });
	// @ts-expect-error expected behavior
	const [emailChecked, setemailChecked] = useState<string>('asd@asd.com');
	// @ts-expect-error expected behavior
	const [passwordChecked, setPasswordChecked] = useState<string>('Qkraltjs819!');
	const navigate = useNavigate();
	// @ts-expect-error expected behavior
	const onSubmit = (data) => {
		console.log(data);
		if (data.emailLogin !== emailChecked) {
			setError('emailLogin', { message: '이메일이 일치하지 않습니다.' });
			return;
		}
		if (data.passwordLogin !== passwordChecked) {
			setError('passwordLogin', { message: '비밀번호를 다시 입력해주세요.' });
			return;
		}
		alert('로그인 성공');
		navigate('/');
		return data;
	};

	return (
		<div className='mx-default flex flex-col items-center'>
			{/* AuraSphere 로고 */}
			<img className='w-full pb-[43px] pl-4 pt-[30px]' src={logo} alt='AuraSphereLogo' />

			{/* 자체 로그인 */}
			<form onSubmit={handleSubmit(onSubmit)} className='min-w-full'>
				<div className='mb-[16px] w-full'>
					<Input
						placeholder='이메일'
						type='email'
						{...register('emailLogin', {
							required: '이메일을 입력하세요.',
						})}
						isValid={errors.emailLogin && false}
						errorMessage={errors.emailLogin?.message}
					/>
				</div>

				<div className='mb-[30px] w-full'>
					<Input
						placeholder='비밀번호'
						type='password'
						{...register('passwordLogin', {
							required: '비밀번호를 입력하세요.',
						})}
						isValid={errors.passwordLogin && false}
						errorMessage={errors.passwordLogin?.message}
					/>
				</div>

				<Button type='submit'>로그인</Button>
			</form>

			<p className='my-[32px] text-base font-semibold text-[#757575]'>또는</p>

			{/* 소셜 로그인 */}
			<button
				className='mb-[7px] min-h-[46px] min-w-full rounded-default bg-amber-300 text-lg font-semibold duration-300 hover:bg-[#f1e757] active:scale-95'
				type='button'
			>
				카카오
			</button>

			<button
				className='mb-[37px] min-h-[46px] min-w-full rounded-default bg-green-400 text-lg font-semibold duration-300 hover:bg-[#64f06b] active:scale-95'
				type='button'
			>
				네이버
			</button>

			<button type='button' className='mb-[19px] text-base font-semibold'>
				비밀번호를 잊으셨나요?
			</button>

			<p className='text-base font-semibold'>
				계정이 없으신가요?{' '}
				<button onClick={() => navigate('/signup')} type='button' className='text-[#4B8CD7]'>
					회원가입하기
				</button>
			</p>
		</div>
	);
};
