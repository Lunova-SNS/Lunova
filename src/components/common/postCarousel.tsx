import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import '@/assets/carousel/postCaroucel.css';

type PropType = {
	slides: string[];
	options?: EmblaOptionsType;
};

const PostCarousel: React.FC<PropType> = (props) => {
	const { slides, options } = props;
	const [emblaRef] = useEmblaCarousel(options, [Fade()]);

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
			<div className='embla__controls'></div>
		</div>
	);
};

export default PostCarousel;
