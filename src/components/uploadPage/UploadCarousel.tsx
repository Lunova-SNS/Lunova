import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import { NextButton, PrevButton, usePrevNextButtons } from '@/components/common/PostCarouselArrow';
import '@/assets/carousel/postCaroucel.css';
import { v4 as uuidv4 } from 'uuid';
interface FileObj {
	fileObject: File;
	previewURL: string;
	type: string;
}
type PropType = {
	slides: FileObj[];
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
					{slides.map((file) => (
						<div className='embl__slide' key={uuidv4()}>
							{file.type === 'image' ? (
								<img
									className='embl__slide__img'
									src={file.previewURL}
									alt='첨부하신 이미지의 미리보기를 볼 수 없습니다.'
								/>
							) : (
								<video className='embl__slide__img' autoPlay muted src={file.previewURL} />
							)}
						</div>
					))}
				</div>
				<div className='embl__controls'>
					<div className='embl__buttons'>
						<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
						<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default UploadCarousel;
