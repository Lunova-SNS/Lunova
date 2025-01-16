import { CgProfile } from 'react-icons/cg';
import { AiOutlineHeart } from 'react-icons/ai';
import PostCarousel from './postCarousel';
import { useEffect, useRef, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import MenuModal from './MenuModal';
import { CiMenuKebab } from 'react-icons/ci';
// import { FaRegComments } from 'react-icons/fa';

interface PostProps {
	post: {
		id: number; // 게시물 ID
		username: string; // 사용자 이름
		profileImage: string; // 프로필 이미지 URL
		postImages: string[]; // 게시물 이미지 배열
		text: string; // 게시물 텍스트
	};
}

const Post = ({ post }: PostProps) => {
	const [isHeartClicked, setIsHeartClicked] = useState<boolean>(false);
	const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const onClickHeart = () => {
		setIsHeartClicked(!isHeartClicked);
	};
	const onClickMenu = () => {
		setIsMenuOpened(!isMenuOpened);
	};
	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setIsMenuOpened(false);
			}
		};
		if (isMenuOpened) {
			window.addEventListener('click', onClick);
		}
		// cleanup 함수 반환
		return () => {
			window.removeEventListener('click', onClick);
		};
	}, [isMenuOpened, menuRef]);
	console.log(isMenuOpened);

	return (
		<>
			<div className='h-[492px] rounded-default bg-white'>
				<div className='mt-3 w-screen'>
					{/* 게시글 헤더 부분 */}
					<div className='mx-[4vw] flex h-[46px] items-center justify-between'>
						<div className='flex flex-row items-center gap-[2vw]'>
							{post.profileImage ? (
								<img
									src={post.profileImage}
									alt={`${post.username} 프로필`}
									className='w-8 rounded-2xl'
								/>
							) : (
								<CgProfile size={33} />
							)}
							<div className='text-base'>{post.username}</div>
						</div>

						<div className='relative'>
							{/* 메뉴 아이콘 */}
							<div className='relative'>
								<CiMenuKebab
									size={20}
									onClick={(e) => {
										e.stopPropagation();
										onClickMenu();
									}}
								/>
							</div>
							{/* 메뉴 모달 */}
							{isMenuOpened && (
								<MenuModal
									isMenuOpened={isMenuOpened}
									setIsMenuOpened={setIsMenuOpened}
									menuRef={menuRef}
								/>
							)}
						</div>
					</div>
					{/* 캐러셀 파트 */}
					<div>
						<PostCarousel slides={post.postImages} />
					</div>
					<div className='h-[84px]'>
						<div className='mx-[20px] mt-4 flex flex-row justify-between'>
							<div className='text-base font-bold'>{post.username}</div>
							<div className='flex gap-3'>
								<div onClick={onClickHeart}>
									{isHeartClicked ? (
										<AiFillHeart size={20} color='#E0786D' />
									) : (
										<AiOutlineHeart size={20} />
									)}
								</div>
								{/* <div>
									<FaRegComments size={20} />
								</div> */}
							</div>
						</div>
						<div className='mx-[20px] mt-3 text-sm font-medium'>{post.text}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Post;
