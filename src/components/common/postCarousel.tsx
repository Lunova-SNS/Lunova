import React from 'react';
import { v4 as uuidv4 } from 'uuid';
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
					{slides.map((file) => (
						<div className='embl__slide' key={uuidv4()}>
							<div className='embla__slide'>
								<img className='embla__slide__img h-[360] w-full' src={file} alt='Your alt text' />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default PostCarousel;
