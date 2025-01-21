import { MouseEventHandler } from 'react';
import { create } from 'zustand';

// Toast message 사용법 (예시)
// 1. const { showToast } = useToastStore();

		// 2. showToast({
		// 	message: '사진 첨부 제한에 도달했습니다.',
		// 	color: 'bg-subColor',
		// 	onClick: () => {
		// 		navigate('/');
// 	}

interface ToastState {
	message: string | null;
	color: string;
	isVisible: boolean;
	onClick?: MouseEventHandler<HTMLDivElement> | undefined;
	showToast: (toast: { message: string; color: string; onClick?: () => void }) => void;

	hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
	message: null,
	color: 'bg-subColor', // 기본 색상 (파란색)
	isVisible: false,
	onClick: undefined,
	showToast: ({
		message,
		color,
		onClick,
	}: {
		message: string;
		color: string;
		onClick?: () => void;
	}) => set({ message, color, isVisible: true, onClick }),
	hideToast: () =>
		set({ message: null, color: 'bg-blue-500', isVisible: false, onClick: undefined }),
}));
