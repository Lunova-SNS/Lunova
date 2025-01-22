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
		clearErrors,
		setError,
		formState: { errors },
	} = useForm({ mode: 'onChange' });
	// @ts-expect-error expected behavior
	const [emailChecked, setemailChecked] = useState<string>('asd@asd.com');
	// @ts-expect-error expected behavior
	const [nickNameChecked, setNickNameChecked] = useState<string>('박미선');
	// @ts-expect-error expected behavior
	const [numberChecked, setNumberChecked] = useState<string>('123456');
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [isNickNameChecked, setIsNickNameChecked] = useState<boolean>(false);
	// @ts-expect-error expected behavior
	const [sections, setSections] = useState<string[]>(['emailPassword', 'nickName']);
	const [sectionsCount, setSectionsCount] = useState<number>(0);
	const navigate = useNavigate();
	// @ts-expect-error expected behavior
	const onSubmit1 = (data) => {
		console.log(data);
		if (data.email === emailChecked) {
			setError('email', { message: '중복된 이메일이 존재합니다. 다른 이메일을 사용해주세요.' });
			return;
		}

		setIsSubmitting(true);

		if (isSubmitting && data.numberCheck !== numberChecked) {
			setError('numberCheck', { message: '인증번호가 일치하지 않습니다.' });
			return;
		}

		watch('numberCheck') && sectionsCount === 0
			? setSectionsCount((prev) => prev + 1)
			: navigate('#', { replace: true });

		return data;
	};
	// @ts-expect-error expected behavior
	const onSubmit2 = (data) => {
		if (!isNickNameChecked) {
			setError('nickName', { message: '중복 확인을 먼저 해주세요.' });
			return;
		}

		setIsNickNameChecked(true);
		watch('nickName') && sectionsCount === 1
			? navigate('/login', { replace: true })
			: navigate('#', { replace: true });
		alert('회원가입에 성공하셨습니다.');
		return data;
	};

	return (
		<div className='min-w-full px-[30px]'>
			<div className='pt-5'>
				<BackButton
					onClick={() => setSectionsCount((prev) => prev - 1)}
					overrideBack={true}
					fallbackUrl={sections[sectionsCount] === 'emailPassword' ? '/login' : '/signup'}
				/>

				<h1 className='pt-2 text-[20px] font-bold'>
					{sections[sectionsCount] === 'emailPassword'
						? '회원가입'
						: sections[sectionsCount] === 'nickName'
							? '사용자 이름 만들기'
							: false}
				</h1>
			</div>

			<section className='my-[22px] flex flex-col items-center'>
				{sections[sectionsCount] === 'emailPassword' ? (
					<form onSubmit={handleSubmit(onSubmit1)} className='flex min-w-full flex-col'>
						{/* 이메일 */}
						<div className='mb-[16px] min-w-full'>
							<Input
								placeholder='이메일'
								{...register('email', {
									required: '이메일은 필수입니다.',
									pattern: {
										value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
										message: '이메일 형식이 올바르지 않습니다.',
									},
								})}
								isValid={errors.email && false}
								errorMessage={errors.email?.message}
								successMessage={watch('email') && '사용 가능한 이메일입니다.'}
							/>
						</div>

						{/* 비밀번호 */}
						<div className='mb-[16px] min-w-full'>
							<Input
								type='password'
								placeholder='비밀번호'
								{...register('password', {
									required: '비밀번호는 필수입니다.',
									minLength: {
										value: 8,
										message: '비밀번호는 8자 이상이어야 합니다.',
									},
									pattern: {
										value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/,
										message: '소문자, 대문자, 숫자, 특수 문자를 포함해야 합니다.',
									},
								})}
								isValid={errors.password && false}
								errorMessage={errors.password?.message}
								successMessage={watch('password') && '사용 가능한 비밀번호입니다.'}
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
								isValid={errors.passwordConfirm && false}
								errorMessage={errors.passwordConfirm?.message}
								successMessage={watch('passwordConfirm') && '비밀번호가 일치합니다.'}
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

						{isSubmitting && (
							<div className='mb-[20px] flex min-w-full items-center justify-end'>
								<div className='flex-grow'>
									<Input
										placeholder='인증번호'
										{...register('numberCheck', {
											required: '인증번호를 입력해주세요.',
										})}
										isValid={errors.numberCheck && false}
										errorMessage={errors.numberCheck?.message}
									/>
								</div>
								<div className='ml-[4px] flex text-xs font-light text-[#757575]'>
									<PiAsteriskSimpleBold size='10px' />
									<div className='ml-[2px] mt-[-1px]'>
										<p>입력하신 이메일로</p>
										<p>인증번호 보냈습니다.</p>
									</div>
								</div>
							</div>
						)}

						<Button type='submit'>다음</Button>
					</form>
				) : sections[sectionsCount] === 'nickName' ? (
					<form onSubmit={handleSubmit(onSubmit2)} className='min-w-full'>
						<div className='mb-[30px] flex min-w-full justify-end'>
							<div className='flex-grow'>
								<Input
									placeholder='사용자 이름'
									{...register('nickName', {
										required: '사용자 이름은 필수입니다.',
										pattern: {
											value: /^[가-힣a-zA-Z0-9]{2,8}$/,
											message: '글자는 2자 ~ 8자',
										},
									})}
									isValid={errors.nickName && false}
									errorMessage={errors.nickName?.message}
									successMessage={
										watch('nickName') && isNickNameChecked && '사용 가능한 사용자 이름입니다.'
									}
								/>
							</div>
							<Button
								onClick={() => {
									if (watch('nickName') === nickNameChecked) {
										setIsNickNameChecked(false);

										setError('nickName', {
											message: '중복된 사용자 이름이 존재합니다. 다른 이름을 사용해주세요.',
										});
									} else {
										setIsNickNameChecked(true);
										clearErrors('nickName');
									}
								}}
								className='ml-[15px]'
								minWidth='min-w-[72px]'
								fontBold='font-medium'
								textSize='text-base'
							>
								중복 확인
							</Button>
						</div>

						<Button type='submit'>다음</Button>
					</form>
				) : (
					false
				)}
			</section>
		</div>
	);
};
