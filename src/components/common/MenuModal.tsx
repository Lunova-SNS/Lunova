import { CiMenuKebab } from 'react-icons/ci';

interface MenuModalProps {
	isMenuOpened: boolean;
	setIsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
	menuRef: React.RefObject<HTMLDivElement | null>;
}

const MenuModal = ({ isMenuOpened, setIsMenuOpened, menuRef }: MenuModalProps) => {
	return (
		<>
			<div
				ref={menuRef}
				className='absolute right-0 top-6 z-20 rounded-sm bg-subColor p-2 shadow-lg'
			>
				<div className='flex h-9 w-9 flex-col items-center justify-center'>
					<li className='cursor-pointer list-none border-b border-gray-300 p-1 text-sm font-medium'>
						수정
					</li>
					<li className='cursor-pointer list-none p-1 text-sm font-medium'>삭제</li>
				</div>
			</div>
		</>
	);
};

export default MenuModal;
