import React, { useEffect } from 'react';
import { useToastStore } from '@/stores/useToastStore';

const Toast: React.FC = () => {
	const { message, type, isVisible, onClick, hideToast } = useToastStore();

	useEffect(() => {
		if (isVisible) {
			const timer = setTimeout(() => {
				hideToast();
			}, 3000); // 3초 후 토스트 숨기기
			return () => clearTimeout(timer); // 언마운트 시 타이머 정리
		}
	}, [isVisible, hideToast]);

	if (!isVisible || !message) return null;

	return (
		<div
			className={`${type === 'error' ? 'bg-error' : 'bg-mainColor'} fixed right-3 top-16 z-[1000] cursor-pointer rounded-md px-2 py-2 text-[11px] font-semibold ${type === 'error' ? 'text-white' : 'text-gray-700'} shadow-md`}
			onClick={onClick} // 토스트 메시지 클릭 시, navigate 등 넣기
		>
			{message}
		</div>
	);
};

export default Toast;
