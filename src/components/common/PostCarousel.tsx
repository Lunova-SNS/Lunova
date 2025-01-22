import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import { DotButton, useDotButton } from '@/components/common/useDotButton';

type PropType = {
	slides: string[];
	options?: EmblaOptionsType;
};

const PostCarousel: React.FC<PropType> = (props) => {
	const { slides, options = { loop: false } } = props;
	console.log('slides', slides, 'options', options);
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()]);
	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
	console.log(emblaApi);
	return (
		<div className='relative mx-auto max-w-[48rem]'>
			<div className='overflow-hidden' ref={emblaRef}>
				<div className='overflow-hidden'>
					<div className='-ml-[calc(var(16px)*1)] flex h-[300px] touch-pan-y touch-pinch-zoom'>
						{slides.map((file) => (
							<div className='w-full min-w-0 flex-none translate-x-0 transform' key={uuidv4()}>
								<div className='w-full min-w-0 flex-none translate-x-0 transform'>
									<img
										className='block h-[var(300px)] w-full select-none rounded-none object-cover'
										src={file}
										alt='Your alt text'
									/>
								</div>
							</div>
						))}
					</div>
					<div className='mt-6 grid grid-cols-[auto_1fr] justify-between gap-4'>
						<div className='-mr-[calc((2.6rem-1.4rem)/2)] flex flex-wrap items-center justify-end'>
							{scrollSnaps.map((_, index) => (
								<DotButton
									key={index}
									onClick={() => onDotButtonClick(index)}
									className={`flex h-10 w-10 items-center justify-center rounded-full ${
										index === selectedIndex
											? 'after:shadow-[inset_0_0_0_0.2rem_black]'
											: 'after:shadow-[inset_0_0_0_0.2rem_theme(colors.blue-500)]'
									} after:h-3.5 after:w-3.5 after:rounded-full after:content-['']`}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostCarousel;
