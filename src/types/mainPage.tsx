import { RefObject } from 'react';

export interface UseDetectCloseProps {
	dropDownRef: RefObject<HTMLUListElement | null>;
	initialState: boolean;
}
