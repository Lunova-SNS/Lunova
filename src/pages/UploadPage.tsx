import { BiPlus } from 'react-icons/bi';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import { BackButton } from '@/components/common/BackButton';
import { useParams } from 'react-router-dom';
import UploadCarousel from '@/components/uploadPage/UploadCarousel';
import { useToastStore } from '@/stores/useToastStore';
import { client } from '@/axios/instance';

export interface FileObj {
	fileObject: File;
	previewURL: string;
	type: string;
}

const UploadPage = () => {
	const [fileList, setFileList] = useState<FileObj[]>([]);
	const [text, setText] = useState('');
	const [isDragging, setIsDragging] = useState(false);
	const { postId } = useParams<{ postId?: string }>();
	const maxLength = 150;
	const { showToast } = useToastStore(); // toast 컴포넌트 사용

	const handleTextCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		// 텍스트 카운트
		if (Number(text) > 0) {
			setText(e.target.value);
		}
	};

	const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setIsDragging(false);
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setIsDragging(false);
		if (event.dataTransfer.files) {
			handleSaveFiles(event.dataTransfer.files);
		}
	};

	const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		handleSaveFiles(event.target.files); //파일 선택 input이 변경될 때 실행
	};

	const handleSaveFiles = (files: FileList | null) => {
		const newFileList: FileObj[] = []; //새로운 filelist 배열을 담기 위해 생성

		if (!files) return;

		let imageCount = fileList.filter((file) => file.type === 'image').length;
		let videoCount = fileList.filter((file) => file.type === 'video').length;

		for (let i = 0; i < files.length; i++) {
			const preview = URL.createObjectURL(files[i]);
			const fileType = files[i].type.split('/')[0];
			const fileSizeMB = files[i].size / (1024 * 1024);

			//동영상 50mb, 이미지 5mb
			if (fileType === 'video') {
				if (videoCount >= 1 || fileSizeMB > 50) {
					showToast({
						message: '동영상 첨부 제한에 도달했습니다.',
						type: 'success',
					});
					URL.revokeObjectURL(preview);
					continue;
				}

				newFileList.push({ fileObject: files[i], previewURL: preview, type: fileType });
				videoCount += 1;
			} else {
				//image 파일 처리
				if (imageCount >= 5 || fileSizeMB > 10) {
					URL.revokeObjectURL(preview);
					showToast({
						message: '사진 첨부 제한에 도달했습니다.',
						type: 'success',
					});
					continue;
				}
				newFileList.push({
					fileObject: files[i],
					previewURL: preview,
					type: fileType,
				});
				imageCount += 1;
			}
		}
		console.log(newFileList);
		setFileList((prev) => [...prev, ...newFileList]);
	};

	useEffect(() => {
		return () => {
			fileList.forEach((item) => {
				URL.revokeObjectURL(item.previewURL);
			});
		};
	}, []);

	const handleFileUpload = async () => {
		try {
			if (fileList.length === 0) {
				showToast({
					message: '사진을 한 장 이상 첨부해주세요!',
					type: 'error',
				});
				return;
			}

			const payload = fileList.map((file) => {
				return { fileName: file.fileObject.name, contentType: file.fileObject.type };
			});

			const response = await client.post('/s3/url', payload);
			console.log(response.data);
		} catch (error) {}
	};

	console.log(fileList);

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
