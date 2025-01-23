import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import '@/assets/carousel/postCaroucel.css';
import { NextButton, PrevButton, usePrevNextButtons } from '@/components/common/PostCarouselArrow';
// import { DotButton, useDotButton } from '@/components/common/useDotButton';
type PropType = {
	slides: string[];
	options?: EmblaOptionsType;
};

const PostCarousel: React.FC<PropType> = (props) => {
	const { slides, options } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()]);

	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
		usePrevNextButtons(emblaApi);
	// const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

	return (
		<div className='embla'>
			<div className='embla__viewport' ref={emblaRef}>
				<div className='embla__container'>
					{slides.map((file) => (
						<div className='embla__slide' key={uuidv4()}>
							<div className='embla__slide'>
								<img className='embla__slide__img' src={file} alt='Your alt text' />
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='embla__controls'>
				<div className='embla__buttons'>
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
			</div>
		</div>
	);
};

export default PostCarousel;
