import Carousel from '@/components/uploadPage/Carousel';
import { BiPlus } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { FileItem } from '@/types/uploadPage';
import { Button } from '@/components/common/Button';
import { BackButton } from '@/components/common/BackButton';
import { useParams } from 'react-router-dom';

const UploadPage = () => {
	const [fileList, setFileList] = useState<FileItem[]>([]);
	const [text, setText] = useState('');

	const { post_id } = useParams<{ post_id?: string }>();
	const maxLength = 150;

	const handleTextCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.target.value);
	};

	const handleSaveFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const newFileList: FileItem[] = [];
		const files = event.target.files;
		if (!files) return;

		let imageCount = fileList.filter((file) => file.type === 'image').length;
		let videoCount = fileList.filter((file) => file.type === 'video').length;

		for (let i = 0; i < files.length; i++) {
			const preview = URL.createObjectURL(files[i]);
			const fileType = files[i].type.split('/')[0];
			const fileSizeMB = files[i].size / (1024 * 1024);

			//동영상 50mb, 이미지 5mb
			if (fileType === 'video') {
				const videoElement = document.createElement('video');
				videoElement.src = preview;

				if (videoCount > 0) {
					// alert('동영상은 최대 1개만 업로드할 수 있습니다.');
					URL.revokeObjectURL(preview);
				} else if (fileSizeMB > 50) {
					// alert('동영상 크기는 50MB를 초과할 수 없습니다.');
					URL.revokeObjectURL(preview);
				}

				newFileList.push({ fileObject: files[i], previewURL: preview, type: fileType });
				videoCount++;
			} else {
				//image 파일 처리
				if (imageCount >= 5) {
					// alert('이미지는 최대 5장까지만 업로드할 수 있습니다.');
					URL.revokeObjectURL(preview);
				} else if (fileSizeMB > 10) {
					// alert('이미지 크기는 10MB를 초과할 수 없습니다.');
					URL.revokeObjectURL(preview);
				}

				newFileList.push({
					fileObject: files[i],
					previewURL: preview,
					type: fileType,
				});
				imageCount++;
			}
		}
		if (imageCount > 5) {
			alert('이미지는 최대 5장까지만 업로드할 수 있습니다.');
		} else if (videoCount > 0) {
			alert('동영상은 최대 1개만 업로드할 수 있습니다.');
		}
		setFileList((prev) => [...prev, ...newFileList]);
	};

	// const deleteFile = (index: number) => {
	// 	const temFilelist = [...fileList];
	// 	temFilelist.splice(index, 1);
	// 	setFileList(temFilelist);
	// };

	useEffect(() => {
		return () => {
			fileList.forEach((item) => {
				URL.revokeObjectURL(item.previewURL);
			});
		};
	}, [fileList]);

	const Previews = fileList.map((file) => file.previewURL);

	console.log(Previews);
	console.log(fileList);

	//이미지 삭제 구현, 텍스트 제한 표기, 사진 및 동영상 제한 표기

	return (
		<>
			<div className='mx-default'>
				<header className='pt-5'>
					<div className='pb-2'>
						<BackButton />
					</div>
					<h1 className='pb-1 text-xl font-bold'>{post_id ? '게시글 수정' : '게시글 생성'}</h1>
				</header>
				<main className='flex justify-center'>
					<div className='flex max-w-[300px] flex-col items-end'>
						<div className='flex flex-col items-end'>
							<label
								htmlFor='file'
								className='mb-3 flex w-5 cursor-pointer justify-center rounded-sm bg-mainColor duration-300 hover:bg-[#629ada] active:scale-95'
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
								onChange={handleSaveFiles}
								required
							/>
							<div className='h-[304px] w-[300px] rounded-default border-2 border-mainColor bg-white'>
								<Carousel slides={Previews} />
							</div>
							<div className='mb-2 mt-1 text-xs text-subText'>
								* 사진 최소 1장, 최대 5장 (장당 5MB 제한) / 동영상 1개까지 첨부 가능 (10MB 제한)
							</div>
						</div>
						<div className='relative inline-block'>
							<textarea
								id='description'
								name='description'
								maxLength={150}
								minLength={0}
								wrap='hard'
								onChange={handleTextCount}
								placeholder='오늘의 아우라를 표현해보세요 ✨'
								className='mb-8 h-28 w-[300px] resize-none rounded-default p-2 text-base focus:border-[#9DC6F5] focus:outline-none focus:ring-2 focus:ring-[#9DC6F5]'
							></textarea>
							<div className='absolute bottom-11 right-2 text-sm text-subText'>
								{maxLength - text.length} / {maxLength}
							</div>
						</div>

						<Button children={'업로드'}></Button>
					</div>
				</main>
			</div>
		</>
	);
};
export default UploadPage;
