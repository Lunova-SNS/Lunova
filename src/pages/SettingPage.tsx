import { BackButton } from '@/components/common/BackButton';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { SlLogout } from 'react-icons/sl';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';

export const SettingPage = () => {
	const {
		register,
		handleSubmit,
		watch,
		clearErrors,
		setError,
		resetField,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			nickNameChange: '박미선',
			nowPassword: '',
			passwordReset: '',
			passwordResetConfirm: '',
		},
	});
	// @ts-expect-error expected behavior
	const [imgFile, setImgFile] = useState<File>();
	const [previewImg, setPreviewImg] = useState<string>('');
	// @ts-expect-error expected behavior
	const [nickNameChecked, setNickNameChecked] = useState<string>('박미선');

	const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;

		const file = e.target.files[0];

		if (file) {
			let image = URL.createObjectURL(file);
			setPreviewImg(image);
			setImgFile(file);
		}
	};
	// @ts-expect-error expected behavior
	const onSubmitProfile = (data) => {
		console.log(data);

		if (data.nickNameChange === nickNameChecked) {
			setError('nickNameChange', {
				message: '중복된 사용자 이름이 존재합니다. 다른 이름을 사용해주세요.',
			});
		} else {
			clearErrors('nickNameChange');
		}

		return data;
	};
	// @ts-expect-error expected behavior
	const onSubmitPassword = (data) => {
		console.log(data);

		if (data.nowPassword !== 'Qkraltjs819!') {
			setError('nowPassword', {
				message: '비밀번호가 일치하지 않습니다.',
			});
			resetField('passwordReset', { defaultValue: '' });
			resetField('passwordResetConfirm', { defaultValue: '' });
			return;
		}

		if (data.nowPassword === data.passwordReset) {
			setError('passwordReset', {
				message: '현재 비밀번호와는 다른 비밀번호를 입력하셔야 합니다.',
			});
			return;
		}

		if (watch('passwordReset') !== watch('passwordResetConfirm')) {
			setError('passwordResetConfirm', {
				message: '비밀번호가 일치하지 않습니다.',
			});
			return;
		}

		alert('비밀번호가 재설정 되었습니다.');
		return data;
	};

	return (
		<div className='min-w-full'>
			<div className='mx-default pb-6 pt-5'>
				<BackButton overrideBack={true} />
				<h1 className='pt-2 text-[20px] font-bold'>설정하기</h1>
			</div>

			<div className='min-h-screen min-w-full rounded-t-[10px] bg-white px-[30px]'>
				{/* 프로필 사진 및 닉네임 설정 */}
				<form onSubmit={handleSubmit(onSubmitProfile)} className='mb-[20px] pt-[30px]'>
					<div className='flex w-[100px] items-center justify-between'>
						<BiEdit />
						<div className='text-[16px] font-semibold'>프로필 수정</div>
					</div>

					<div className='my-[14px] flex h-[80px] items-center justify-between'>
						<label
							htmlFor='img'
							className='group relative h-[80px] w-[80px] cursor-pointer rounded-full bg-gray-200'
						>
							{/* 검은 바탕 */}
							<div className='absolute h-[80px] w-[80px] rounded-full bg-[#444444] opacity-0 group-hover:opacity-50'></div>

							{/* 아이콘 */}
							<div className='pointer-events-none absolute left-[26px] top-[26px] z-[20] opacity-0 group-hover:opacity-100'>
								<HiOutlinePhotograph size={'30px'} color='#D6E9FF' />
							</div>

							<img
								className='h-[80px] w-[80px] rounded-full object-cover'
								src={previewImg !== '' ? previewImg : 'https://picsum.photos/80/80'}
								alt='프로필'
							/>
						</label>

						<input
							onChange={onUploadImage}
							id='img'
							type='file'
							accept='image/*'
							className='hidden'
						/>

						<div className='ml-[12px] flex-grow'>
							<Input
								backgroundColor='bg-white'
								{...register('nickNameChange', {
									required: '사용자 이름은 필수입니다.',
									pattern: {
										value: /^[가-힣a-zA-Z0-9]{2,8}$/,
										message: '글자는 2자 ~ 8자',
									},
								})}
								isValid={errors.nickNameChange && false}
								errorMessage={errors.nickNameChange?.message}
								successMessage={
									watch('nickNameChange') !== nickNameChecked && '사용 가능한 사용자 이름입니다.'
								}
							/>
						</div>
					</div>

					<Button type='submit'>저장</Button>
				</form>

				<hr className='mb-[20px] border border-gray-300' />

				{/* 비밀번호 재설정 */}
				<form onSubmit={handleSubmit(onSubmitPassword)}>
					<div className='flex w-[128px] items-center justify-between'>
						<RiLockPasswordLine />
						<div className='text-[16px] font-semibold'>비밀번호 재설정</div>
					</div>

					<div className='my-[14px] flex flex-col items-center justify-between'>
						<div className='mb-[16px] min-w-full'>
							<Input
								type='password'
								placeholder='현재 비밀번호'
								backgroundColor='bg-white'
								{...register('nowPassword', {
									required: '현재 비밀번호를 입력해주세요.',
									validate: (value) =>
										value === 'Qkraltjs819!' ? true : '비밀번호가 일치하지 않습니다.',
								})}
								isValid={errors.nowPassword && false}
								errorMessage={errors.nowPassword?.message}
								successMessage={watch('nowPassword') === 'Qkraltjs819!' && '비밀번호가 일치합니다.'}
							/>
						</div>

						<div className='mb-[16px] min-w-full'>
							<Input
								type='password'
								placeholder='새로운 비밀번호'
								backgroundColor='bg-white'
								{...register('passwordReset', {
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
								isValid={errors.passwordReset && false}
								errorMessage={errors.passwordReset?.message}
								successMessage={watch('passwordReset') && '사용 가능한 비밀번호입니다.'}
							/>
						</div>

						<div className='mb-[16px] min-w-full'>
							<Input
								type='password'
								placeholder='새로운 비밀번호 확인'
								backgroundColor='bg-white'
								{...register('passwordResetConfirm', {
									required: '비밀번호 확인은 필수입니다.',
									validate: (value) =>
										value === watch('passwordReset') ? true : '비밀번호가 일치하지 않습니다.',
								})}
								isValid={errors.passwordResetConfirm && false}
								errorMessage={errors.passwordResetConfirm?.message}
								successMessage={watch('passwordResetConfirm') && '비밀번호가 일치합니다.'}
							/>
						</div>
					</div>

					<Button type='submit'>저장</Button>
				</form>

				<hr className='my-[20px] border border-gray-300' />

				{/* 로그아웃 */}
				<button type='button' className='flex w-[80px] items-center justify-between'>
					<SlLogout />
					<span className='text-[16px] font-semibold'>로그아웃</span>
				</button>

				<hr className='mt-[20px] border border-gray-300' />
			</div>
		</div>
	);
};
