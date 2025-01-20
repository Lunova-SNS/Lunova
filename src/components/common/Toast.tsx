// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface ToastProps {
// 	message: string;
// 	onMove: () => void;
// }

// const Toast: React.FC<ToastProps> = ({ message, onMove }) => {
// 	const navigate = useNavigate();

// 	// 일정 시간이 지나면 자동으로 닫히도록 설정 ⭐️
// 	useEffect(() => {
// 		const timer = setTimeout(onMove, 3000); // 3초 뒤에 사라짐
// 		return () => clearTimeout(timer);
// 	}, [onMove]);

// 	const handleRedirect = () => {
// 		onMove();
// 		navigate('/scraps');
// 	};

// 	return (
// 		<div className='fixed bottom-5 right-5 z-50 flex w-1/2 items-center justify-between space-x-4 rounded bg-gray-800 p-4 text-white shadow-md'>
// 			<p>{message}</p>
// 			<button onClick={handleRedirect} className='font-semibold text-orange-500 hover:underline'>
// 				스크랩 이동
// 			</button>
// 		</div>
// 	);
// };

// export default Toast;
