import { useRef, useState } from 'react';
import useDetectClose from './useDetectClose';

const DropDown = () => {
	const dropDownRef = useRef<HTMLUListElement>(null);
	const [isOpen, setIsOpen] = useDetectClose({ dropDownRef, initialState: false });
	const [isSelected, setIsSelected] = useState('내가 팔로우한 사람의 게시글');

	const handleSelectedText = (e: React.MouseEvent<HTMLLIElement>) => {
		const selectedText = (e.target as HTMLLIElement).innerText;
		setIsSelected(selectedText);
		setIsOpen(false);
	};
	console.log(isOpen);
	return (
		<div className='w-44'>
			<button onClick={() => setIsOpen(!isOpen)} className='text-base font-semibold'>
				{isSelected}
			</button>
			{isOpen && (
				<ul ref={dropDownRef} className='h-24 w-40 rounded-default bg-subColor text-sm'>
					<li onClick={handleSelectedText}>
						내가 <span className='pointer-events-none font-semibold'>팔로우</span>한 사람의 게시글
					</li>
					<li onClick={handleSelectedText}>
						많은 사람들이 본 <span className='pointer-events-none font-semibold'>조회수</span> 순
					</li>
					<li onClick={handleSelectedText}>
						많은 사랑을 받은 <span className='pointer-events-none font-semibold'>좋아요</span> 순
					</li>
					<li onClick={handleSelectedText}>
						유저들이 주목한 <span className='pointer-events-none font-semibold'>댓글 </span> 순
					</li>
				</ul>
			)}
		</div>
	);
};

export default DropDown;
