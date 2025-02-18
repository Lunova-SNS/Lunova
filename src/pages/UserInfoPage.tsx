import { FollowModal } from '@/components/userInfoPage/FollowModal';
import { useState } from 'react';
import { MdPhotoCamera } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export const UserInfoPage = () => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const [isClicked, setIsClicked] = useState<boolean>(true);
	const navigate = useNavigate();

	return (
		<div className='relative px-[20px] py-[18px]'>
			{/* 팔로워, 팔로잉 모달 */}
			{isOpened && (
				<FollowModal isClicked={isClicked} setIsClicked={setIsClicked} setIsOpened={setIsOpened} />
			)}

			{/* 유저 정보 프로필 */}
			<section className='mb-[26px] flex min-h-[136px] justify-start rounded-default bg-white p-[20px]'>
				<div
					onClick={() => navigate('/setting')}
					className='relative flex flex-col items-center justify-center'
				>
					<div className='group relative mb-[18px] h-[80px] w-[80px] rounded-full bg-subColor'>
						{/* 검은 바탕 */}
						<div className='absolute h-[80px] w-[80px] rounded-full bg-[#444444] opacity-0 group-hover:opacity-50'></div>

						{/* 아이콘 */}
						<div className='pointer-events-none absolute left-[26px] top-[26px] z-10 opacity-0 group-hover:opacity-100'>
							<MdPhotoCamera size={'30px'} color='#EAE8FF' />
						</div>

						<img
							className='h-[80px] w-[80px] rounded-full object-cover'
							src='https://picsum.photos/80/80'
							alt='프로필'
						/>
					</div>

					<p className='absolute -bottom-2 text-lg font-semibold'>nickname</p>
				</div>

				<div className='mx-[20px] flex flex-grow items-center justify-around gap-5'>
					<div className='flex flex-col items-center justify-center text-[10px] font-semibold'>
						<button disabled className='min-h-[38px] min-w-[48px] rounded-[5px] bg-subColor'>
							123
						</button>
						<p className='mt-[6px]'>게시물</p>
					</div>

					<div className='flex flex-col items-center justify-center text-[10px] font-semibold'>
						<button
							onClick={() => {
								setIsOpened(true);
								setIsClicked(true);
							}}
							type='button'
							className='min-h-[38px] min-w-[48px] rounded-[5px] bg-subColor'
						>
							14k
						</button>
						<p className='mt-[6px]'>팔로워</p>
					</div>

					<div className='flex flex-col items-center justify-center text-[10px] font-semibold'>
						<button
							onClick={() => {
								setIsOpened(true);
								setIsClicked(false);
							}}
							type='button'
							className='min-h-[38px] min-w-[48px] rounded-[5px] bg-subColor'
						>
							0
						</button>
						<p className='mt-[6px]'>팔로잉</p>
					</div>
				</div>
			</section>

			{/* 유저 게시글 */}
			<section className='h-[54vh] overflow-scroll rounded-default bg-white px-[12px] py-[16px]'>
				<div className='grid grid-flow-row grid-cols-3 gap-2'>
					{Array.from({ length: 12 }).map((_, i) => (
						<div className='mx-auto h-[90px] w-[90px] rounded-[5px]' key={i}>
							<img
								className='h-[90px] w-[90px] rounded-[5px] object-cover'
								src='https://picsum.photos/90/90'
								alt='게시물'
							/>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};
