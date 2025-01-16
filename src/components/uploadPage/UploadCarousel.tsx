import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import { NextButton, PrevButton, usePrevNextButtons } from '@/components/uploadPage/CarouselArrow';
import '@/assets/carousel/uploadCarousel.css';

type PropType = {
	slides: string[];
	options?: EmblaOptionsType;
};

const UploadCarousel: React.FC<PropType> = (props) => {
	const { slides, options } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()]);

	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
		usePrevNextButtons(emblaApi);

	return (
		<div className='embl'>
			<div className='embl__viewport' ref={emblaRef}>
				<div className='embl__container'>
					{slides.map((index) => (
						<div className='embl__slide' key={index}>
							<img className='embl__slide__img' src={index} alt='Your alt text' />
						</div>
					))}
				</div>
			</div>
			<div className='embl__controls'>
				<div className='embl__buttons'>
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
				{/* <div className='embla__dots'></div> */}
			</div>
		</div>
	);
};

export default UploadCarousel;
