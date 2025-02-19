import { BiPlus } from 'react-icons/bi';
import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import { BackButton } from '@/components/common/BackButton';
import { useParams } from 'react-router-dom';
import UploadCarousel from '@/components/uploadPage/UploadCarousel';
import { useFileUpload } from '@/hooks/uploadPage/useFileUpload';

const UploadPage = () => {
	const [text, setText] = useState('');
	const { postId } = useParams<{ postId?: string }>();
	const maxLength = 150;

	const {
		fileList,
		isDragging,
		handleDragEnter,
		handleDragLeave,
		handleDrop,
		handleFileInput,
		handleFileUpload,
	} = useFileUpload();

	const handleTextCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		// 텍스트 카운트
		if (Number(text) > 0) {
			setText(e.target.value);
		}
	};

	return (
		<div
			className={`mx-default flex min-h-[100svh] flex-col ${isDragging ? 'bg-gray-200 opacity-25' : ''}`}
		>
			<header className='pt-5'>
				<div className='pb-2'>
					<BackButton />
				</div>
				<h1 className='pb-1 text-xl font-bold'>{postId ? '게시글 수정' : '게시글 생성'}</h1>
			</header>
			<main className='flex h-auto w-full grow flex-col items-center pb-10'>
				<div className='flex h-auto min-w-[300px] grow flex-col items-center justify-around'>
					<div className='flex flex-col items-end'>
						<label
							htmlFor='file'
							className='mb-3 flex w-5 cursor-pointer justify-center rounded-sm bg-mainColor duration-300 hover:bg-hoverColor active:scale-95'
						>
							<BiPlus color='white' size={20} />
						</label>
						<input
							type='file'
							name='file'
							id='file'
							multiple
							accept='image/* ,video/*'
							className='hidden'
							onFocus={(e) => (e.currentTarget.value = '')}
							onChange={handleFileInput}
							required
						/>
						<div
							className='h-auto w-[300px] rounded-default border-2 border-mainColor bg-white'
							onDragEnter={handleDragEnter}
							onDragOver={handleDragEnter}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
						>
							<UploadCarousel slides={fileList} />
						</div>
						<div className='my-auto mb-auto text-xs text-subText'>
							* 사진 최소 1장, 최대 5장 (장당 5MB 제한) / 동영상 1개까지 첨부 가능 (10MB 제한)
						</div>
					</div>
					<div className='relative flex h-full grow flex-col pt-4'>
						<textarea
							id='description'
							name='description'
							maxLength={150}
							minLength={0}
							wrap='hard'
							onChange={handleTextCount}
							placeholder='오늘의 아우라를 표현해보세요 ✨'
							className='mb-9 h-full min-h-28 w-[300px] grow resize-none rounded-default p-2 text-base focus:border-hoverColor focus:outline-none focus:ring-2 focus:ring-subColor'
						/>
						<div className='absolute bottom-11 right-2 text-sm text-subText'>
							{maxLength - text.length} / {maxLength}
						</div>
					</div>
					<Button children={'업로드'} onClick={handleFileUpload}></Button>
				</div>
			</main>
		</div>
	);
};
export default UploadPage;
