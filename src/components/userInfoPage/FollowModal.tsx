import { BackButton } from '../common/BackButton';

type Props = {
	isClick: boolean;
	setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FollowModal = ({ isClick, setIsClick, setIsOpen }: Props) => {
	return (
		<div onClick={() => setIsOpen(false)} className='absolute left-0 top-0 z-20 min-w-full'>
			<div
				onClick={(e) => e.stopPropagation()}
				className='m-[20px] rounded-default bg-white p-[14px]'
			>
				<BackButton overrideBack fallbackUrl='#' onClick={() => setIsOpen(false)} />

				<div className='my-[14px] flex justify-center gap-3'>
					<button
						onClick={() => setIsClick(true)}
						className={`flex min-h-[36px] flex-grow items-center justify-center rounded-[5px] duration-200 ${isClick && 'bg-[#B6D4F6] bg-opacity-80'} text-base font-semibold hover:bg-[#B6D4F6] hover:bg-opacity-80`}
					>
						팔로워
					</button>
					<button
						onClick={() => setIsClick(false)}
						className={`flex min-h-[36px] flex-grow items-center justify-center rounded-[5px] duration-200 ${!isClick && 'bg-[#B6D4F6] bg-opacity-80'} text-base font-semibold hover:bg-[#B6D4F6] hover:bg-opacity-80`}
					>
						팔로잉
					</button>
				</div>

				<ul className='min-h-[61vh] rounded-[15px] bg-[#9DC6F5] bg-opacity-10 px-[23px] py-[8px]'>
					{Array.from({ length: 4 }).map((_, i) => (
						<li className='my-[15px] flex items-center justify-between' key={i}>
							<div className='flex items-center gap-2'>
								<div className='h-[32px] w-[32px] rounded-full'>
									<img
										className='h-[32px] w-[32px] rounded-full object-cover'
										src='https://picsum.photos/32/32'
										alt='프로필'
									/>
								</div>

								<p className='text-base font-semibold'>nickname</p>
							</div>

							<button className='h-[20px] w-[54px] rounded-[4px] bg-[#9DC6F5] text-[10px] font-semibold active:scale-95'>
								{isClick ? '팔로워 삭제' : '팔로우 취소'}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
