import { useNavigate, useParams } from 'react-router-dom';

interface MenuModalProps {
	isMenuOpened: boolean;
	setIsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
	menuRef: React.RefObject<HTMLDivElement | null>;
}

const MenuModal = ({ isMenuOpened, setIsMenuOpened, menuRef }: MenuModalProps) => {
	const navigate = useNavigate();
	const isMenuClicked = () => {
		setIsMenuOpened(!isMenuOpened);
	};
	const { postId } = useParams<{ post_id?: string }>();
	return (
		<>
			<div
				ref={menuRef}
				className='absolute right-0 top-6 z-20 h-[53px] w-[7vh] rounded-sm bg-subColor shadow-lg'
			>
				<div className='absolute right-1 top-2 flex h-9 w-[6vh] flex-col items-center justify-center text-center'>
					<button
						className='w-full rounded-sm border-gray-300 p-1 text-sm font-medium transition-transform duration-300 hover:bg-blue-200 hover:shadow-sm active:scale-95 active:bg-blue-300'
						onClick={() => {
							isMenuClicked();
							navigate(`/uploadPage/:${postId}`);
						}}
					>
						수정
					</button>
					<hr className='w-full border' />
					<button
						className='w-full rounded-sm border-gray-300 p-1 text-sm font-medium transition-transform duration-300 hover:bg-blue-200 hover:shadow-sm active:scale-95 active:bg-blue-300'
						onClick={() => {
							isMenuClicked();
						}}
					>
						삭제
					</button>
				</div>
			</div>
		</>
	);
};

export default MenuModal;
