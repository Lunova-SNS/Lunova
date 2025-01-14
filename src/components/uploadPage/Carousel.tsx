import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import { NextButton, PrevButton, usePrevNextButtons } from '@/components/uploadPage/CarouselArrow';
import '@/assets/carousel/carousel.css';

type PropType = {
	slides: string[];
	options?: EmblaOptionsType;
};

const Carousel: React.FC<PropType> = (props) => {
	const { slides, options } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()]);

	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
		usePrevNextButtons(emblaApi);

	return (
		<div className='embla'>
			<div className='embla__viewport' ref={emblaRef}>
				<div className='embla__container'>
					{slides.map((index) => (
						<div className='embla__slide' key={index}>
							<img className='embla__slide__img' src={index} alt='Your alt text' />
						</div>
					))}
				</div>
			</div>
			<div className='embla__controls'>
				<div className='embla__buttons'>
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
				{/* <div className='embla__dots'></div> */}
			</div>
		</div>
	);
};

export default Carousel;
