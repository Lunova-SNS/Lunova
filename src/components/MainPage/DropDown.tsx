import { useRef, useState } from 'react';
import useDetectClose from '@/components/mainPage/useDetectClose';

const DropDown = () => {
	const dropDownRef = useRef<HTMLUListElement>(null);
	const [isOpen, setIsOpen] = useDetectClose({ dropDownRef, initialState: false });
	const [isSelected, setIsSelected] = useState('내가 팔로우한 사람의 게시글');

	const handleSelectedText = (e: React.MouseEvent<HTMLLIElement>) => {
		const selectedText = (e.target as HTMLLIElement).innerText;
		setIsSelected(selectedText);
		setIsOpen(false);
	};

	return (
		<div className='relative w-44'>
			<button
				onClick={(e) => {
					e.stopPropagation();
					setIsOpen(!isOpen);
				}}
				className='mb-2 text-base font-semibold'
			>
				{isSelected}
			</button>
			{isOpen && (
				<ul
					ref={dropDownRef}
					className='absolute top-full z-10 flex h-24 w-40 cursor-pointer flex-col items-center justify-center gap-[2px] rounded-default bg-subColor text-sm shadow-lg'
				>
					<li onClick={handleSelectedText}>
						내가 <span className='pointer-events-none font-semibold'>팔로우</span>한 사람의 게시글
					</li>
					<hr className='w-[115px]' />
					<li onClick={handleSelectedText}>
						많은 사람들이 본 <span className='pointer-events-none font-semibold'>조회수</span> 순
					</li>
					<hr className='pointer-events-none w-[115px]' />
					<li onClick={handleSelectedText}>
						많은 사랑을 받은 <span className='pointer-events-none font-semibold'>좋아요</span> 순
					</li>
					<hr className='pointer-events-none w-[115px]' />
					<li onClick={handleSelectedText}>
						유저들이 주목한 <span className='pointer-events-none font-semibold'>댓글 </span> 순
					</li>
				</ul>
			)}
		</div>
	);
};

export default DropDown;
