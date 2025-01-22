import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UseDetectCloseProps } from '@/types/mainPage';
type UseDetectCloseReturn = [boolean, Dispatch<SetStateAction<boolean>>];

const useDetectClose = ({
	dropDownRef,
	initialState = false,
}: UseDetectCloseProps): UseDetectCloseReturn => {
	const [isOpen, setIsOpen] = useState<boolean>(initialState);

	useEffect(() => {
		const onClickOutside = (e: MouseEvent) => {
			if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		if (isOpen) {
			window.addEventListener('click', onClickOutside);
		}
		// cleanup 함수 반환
		return () => {
			window.removeEventListener('click', onClickOutside);
		};
	}, [isOpen, dropDownRef]);

	return [isOpen, setIsOpen];
};

export default useDetectClose;
