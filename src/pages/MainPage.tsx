import { CommentModal } from '@/components/common/post/CommentModal';
import Post from '@/components/common/post/Post';
import DropDown from '@/components/mainPage/DropDown';
import { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

export default function MainPage() {
	const [isCommentClicked, setIsCommentClicked] = useState<boolean>(false);

	const onClickComment = () => {
		setIsCommentClicked(!isCommentClicked);
	};

	console.log(isCommentClicked);
	const dummyPosts = Array.from({ length: 5 }, (_, index) => ({
		id: index + 1,
		username: `User${index + 1}`,
		profileImage: `https://picsum.photos/50/50?random=${index + 1}`,
		postImages: Array.from(
			{ length: Math.floor(Math.random() * 5) + 1 }, // 각 게시물마다 1~5장의 이미지 랜덤 생성
			(_, imgIndex) => `https://picsum.photos/360/360?random=${index * 10 + imgIndex}`
		),
		text: `더미 텍스트 ${index + 1}번 게시글입니다.`,
	}));

	return (
		<div className='h-full w-full'>
			<div className='mt-2 flex h-6 flex-row'>
				<RiArrowDropDownLine size={25} />
				<DropDown />
			</div>
			{isCommentClicked && (
				<>
					<div
						className='fixed inset-0 z-40 bg-black bg-opacity-50'
						onClick={() => setIsCommentClicked(false)} // 클릭 시 모달 닫기
					></div>
					<div className='fixed z-50 mt-[11px] h-[74%] w-full max-w-[767px]'>
						<CommentModal
							isCommentClicked={isCommentClicked}
							setIsCommentClicked={setIsCommentClicked}
						/>
					</div>
				</>
			)}
			<div className='relative mt-2'>
				{dummyPosts.map((post) => (
					<Post key={post.id} post={post} onClickComment={onClickComment} />
				))}
			</div>
		</div>
	);
}
