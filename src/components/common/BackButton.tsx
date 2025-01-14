import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

interface BackButtonProps {
	fallbackUrl?: string; // 이전 페이지가 없을 경우 이동할 URL
	className?: string; // 추가적인 CSS 클래스
	onClick?: () => void; // 추가적으로 실행할 함수
	overrideBack?: boolean; // 이전 페이지 대신 fallbackUrl로 이동할지 여부
}

export const BackButton: React.FC<BackButtonProps> = ({
	fallbackUrl = '/',
	className = '',
	onClick,
	overrideBack = false,
}) => {
	const navigate = useNavigate();

	const handleBack = () => {
		if (overrideBack) {
			// overrideBack이 true면 fallbackUrl로 이동
			navigate(fallbackUrl);
		} else if (window.history.state && window.history.state.idx > 0) {
			// history가 존재하면 뒤로 가기
			navigate(-1);
		} else {
			// fallbackUrl로 이동
			navigate(fallbackUrl);
		}
	};

	return (
		<button
			onClick={() => {
				if (onClick) onClick(); // 추가 함수 실행
				handleBack(); // handleBack 호출
			}}
			className={`flex items-center ${className}`}
		>
			<BsArrowLeft size='25px' />
		</button>
	);
};
