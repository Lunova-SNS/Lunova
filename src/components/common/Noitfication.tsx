import { useEffect, useRef } from 'react';

interface NoitficationProps {
	isNotiOpened: boolean;
	setIsNotiOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const notifications = [
	'사용자 A님이 당신을 팔로우하기 시작했습니다!',
	'사용자 B님이 당신의 게시글을 좋아합니다.',
	'사용자 C님이 댓글을 남겼습니다.',
	'사용자 D님이 당신을 태그했습니다.',
	'사용자 E님이 친구 요청을 보냈습니다.',
	'사용자 A님이 당신을 팔로우하기 시작했습니다!',
	'사용자 B님이 당신의 게시글을 좋아합니다.',
	'사용자 C님이 댓글을 남겼습니다.',
	'사용자 D님이 당신을 태그했습니다.',
	'사용자 E님이 친구 요청을 보냈습니다.',
	'사용자 D님이 당신을 태그했습니다.',
	'사용자 E님이 친구 요청을 보냈습니다.',
	'사용자 A님이 당신을 팔로우하기 시작했습니다!',
	'사용자 B님이 당신의 게시글을 좋아합니다.',
	'사용자 C님이 댓글을 남겼습니다.',
	'사용자 D님이 당신을 태그했습니다.',
	'사용자 E님이 친구 요청을 보냈습니다.',
];

const Notification = ({ isNotiOpened, setIsNotiOpened }: NoitficationProps) => {
	const notiRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			if (notiRef.current && !notiRef.current.contains(e.target as Node)) {
				setIsNotiOpened(false);
			}
		};
		if (isNotiOpened) {
			window.addEventListener('click', onClick);
		}
		// cleanup 함수 반환
		return () => {
			window.removeEventListener('click', onClick);
		};
	}, [isNotiOpened, notiRef]);

	return (
		<>
			{isNotiOpened && (
				<>
					<div className='fixed left-0 top-0 -z-10 h-full w-full bg-black bg-opacity-50'></div>
					<div ref={notiRef} className='z-10 m-[15%] mt-[20%] flex items-center justify-center'>
						<div className='max-h-[60vh] min-h-[50vh] w-full overflow-hidden rounded-default bg-white'>
							<div className='flex flex-row justify-center py-3 text-base font-bold'>알림</div>
							<div className='flex h-[40vh] flex-col gap-2 overflow-y-scroll px-5'>
								{notifications.map((noti) => (
									<div className='flex justify-center rounded-sm bg-gray-200 p-[5px] text-xs'>
										{noti}
									</div>
								))}
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};
export default Notification;
