import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

interface BackButtonProps {
	fallbackUrl?: string; // 이전 페이지가 없을 경우 이동할 URL
	className?: string; // 추가적인 CSS 클래스
}

export const BackButton: React.FC<BackButtonProps> = ({ fallbackUrl = '/', className = '' }) => {
	const navigate = useNavigate();

	const handleBack = () => {
		if (window.history.state && window.history.state.idx > 0) {
			navigate(-1);
		} else {
			navigate(fallbackUrl);
		}
	};

	return (
		<button onClick={handleBack} className={`flex items-center ${className}`}>
			<BsArrowLeft size='25px' />
		</button>
	);
};
