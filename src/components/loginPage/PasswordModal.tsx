import { RiLockPasswordLine } from 'react-icons/ri';
import { BackButton } from '../common/BackButton';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { PiAsteriskSimpleBold } from 'react-icons/pi';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

type Props = {
	setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PasswordModal = ({ setIsOpened }: Props) => {
	const {
		register,
		handleSubmit,
		watch,
		setError,
		formState: { errors },
	} = useForm({ mode: 'onChange' });
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	// @ts-expect-error expected behavior
	const [numberChecked, setNumberChecked] = useState<string>('123456');

	// @ts-expect-error expected behavior
	const onSubmit = (data) => {
		console.log(data);

		setIsSubmitting(true);

		if (isSubmitting && data.passwordNumberCheck !== numberChecked) {
			setError('passwordNumberCheck', { message: '인증번호가 일치하지 않습니다.' });
			return;
		}

		if (watch('findEmail') && watch('passwordNumberCheck')) {
			alert('새로운 비밀번호는 Qwerasdf12# 입니다.');
			setIsOpened(false);
		}

		return data;
	};

	return (
		<div
			onClick={() => setIsOpened(false)}
			className='absolute left-0 top-0 z-20 min-h-screen min-w-full'
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className='m-[20px] rounded-default bg-white p-[14px]'
			>
				<BackButton overrideBack fallbackUrl='#' onClick={() => setIsOpened(false)} />

				<div className='mt-[30px] flex w-[128px] items-center justify-between'>
					<RiLockPasswordLine />
					<div className='text-[16px] font-semibold'>비밀번호 재발급</div>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className='mb-[80px] mt-[20px] flex flex-col items-center justify-between'
				>
					<div className='mb-[40px] min-w-full'>
						<Input
							type='email'
							placeholder='이메일'
							backgroundColor='bg-white'
							{...register('findEmail', {
								required: '이메일은 필수입니다.',
								pattern: {
									value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
									message: '이메일 형식이 올바르지 않습니다.',
								},
							})}
							isValid={errors.findEmail && false}
							errorMessage={errors.findEmail?.message}
						/>
					</div>

					{isSubmitting && (
						<div className='mb-[20px] flex min-w-full items-center justify-end'>
							<div className='flex-grow'>
								<Input
									placeholder='인증번호'
									backgroundColor='bg-white'
									{...register('passwordNumberCheck', {
										required: '인증번호를 입력해주세요.',
									})}
									isValid={errors.passwordNumberCheck && false}
									errorMessage={errors.passwordNumberCheck?.message}
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

					<Button type='submit'>저장</Button>
				</form>
			</div>
		</div>
	);
};
