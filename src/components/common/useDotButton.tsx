import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

type UseDotButtonType = {
	selectedIndex: number;
	scrollSnaps: number[];
	onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
	emblaApi: EmblaCarouselType | undefined,
	onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UseDotButtonType => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

	// Dot button click handler
	const onDotButtonClick = useCallback(
		(index: number) => {
			if (!emblaApi) return;
			emblaApi.scrollTo(index);
			if (onButtonClick) onButtonClick(emblaApi);
		},
		[emblaApi, onButtonClick]
	);

	// Initialize scrollSnaps and selectedIndex when emblaApi is available
	const onInit = useCallback((emblaApi: EmblaCarouselType) => {
		setScrollSnaps(emblaApi.scrollSnapList());
	}, []);

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		// Initialize once when emblaApi is ready
		onInit(emblaApi);
		onSelect(emblaApi);

		// Only register event listeners once
		const handleReInit = () => {
			onInit(emblaApi);
			onSelect(emblaApi);
		};

		emblaApi.on('reInit', handleReInit).on('select', onSelect);

		// Cleanup event listeners on unmount or when emblaApi changes
		return () => {
			emblaApi.off('reInit', handleReInit).off('select', onSelect);
		};
	}, [emblaApi, onInit, onSelect]);

	return {
		selectedIndex,
		scrollSnaps,
		onDotButtonClick,
	};
};

type PropType = ComponentPropsWithRef<'button'>;

export const DotButton: React.FC<PropType> = (props) => {
	const { children, ...restProps } = props;

	return (
		<button type='button' {...restProps}>
			{children}
		</button>
	);
};
