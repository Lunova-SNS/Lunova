import { BackButton } from '@/components/common/BackButton';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { SlLogout } from 'react-icons/sl';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';

export const SettingPage = () => {
	const [imgFile, setImgFile] = useState<File>();
	const [previewImg, setPreviewImg] = useState<string>('');

	const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;

		const file = e.target.files[0];

		if (file) {
			let image = URL.createObjectURL(file);
			setPreviewImg(image);
			setImgFile(file);
		}
	};

	return (
		<div className='min-w-full'>
			<div className='mx-default pb-6 pt-5'>
				<BackButton overrideBack={true} />
				<h1 className='pt-2 text-[20px] font-bold'>설정하기</h1>
			</div>

			<div className='min-h-screen min-w-full rounded-t-[10px] bg-white px-[30px]'>
				{/* 프로필 사진 및 닉네임 설정 */}
				<section className='mb-[20px] pt-[30px]'>
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
							<Input backgroundColor='bg-white' value={'nickname'} />
						</div>
					</div>

					<Button>저장</Button>
				</section>

				<hr className='mb-[20px] border border-gray-300' />

				{/* 비밀번호 재설정 */}
				<section>
					<div className='flex w-[128px] items-center justify-between'>
						<RiLockPasswordLine />
						<div className='text-[16px] font-semibold'>비밀번호 재설정</div>
					</div>

					{/* 프로필 사진 및 닉네임 설정 */}
					<div className='my-[14px] flex flex-col items-center justify-between'>
						<div className='mb-[16px] min-w-full'>
							<Input type='password' placeholder='현재 비밀번호' backgroundColor='bg-white' />
						</div>

						<div className='mb-[16px] min-w-full'>
							<Input type='password' placeholder='새로운 비밀번호' backgroundColor='bg-white' />
						</div>

						<div className='mb-[16px] min-w-full'>
							<Input
								type='password'
								placeholder='새로운 비밀번호 확인'
								backgroundColor='bg-white'
							/>
						</div>
					</div>

					<Button>저장</Button>
				</section>

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
