import { RxArrowLeft } from 'react-icons/rx';
import Carousel from '@/components/uploadPage/Carousel';
import { BiPlus } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { FileItem } from '@/types/uploasdPage';

const UploadPage = () => {
	const [fileList, setFileList] = useState<FileItem[]>([]);
	// const [showPreviews, setShowPreviews] = useState<string[]>([]);

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
					alert('동영상은 최대 1개만 업로드할 수 있습니다.');
					URL.revokeObjectURL(preview);
				} else if (fileSizeMB > 50) {
					alert('동영상 크기는 50MB를 초과할 수 없습니다.');
					URL.revokeObjectURL(preview);
				}

				newFileList.push({ fileObject: files[i], previewURL: preview, type: fileType });
				videoCount++;
			} else {
				//image 파일 처리
				if (imageCount >= 5) {
					alert('이미지는 최대 5장까지만 업로드할 수 있습니다.');
					URL.revokeObjectURL(preview);
				} else if (fileSizeMB > 10) {
					alert('이미지 크기는 10MB를 초과할 수 없습니다.');
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

	// 	setShowPreviews((prevShowPreviews) => {
	// 		const remainingSlots = Math.max(5 - prevShowPreviews.length, 0);
	// 		return [...prevShowPreviews, ...newUrlLists.slice(0, remainingSlots)];
	// 	});

	// 	setFiles((prevFiles) => {
	// 		return [...prevFiles, ...newFiles.slice(0, remainingSlots)];
	// 	});
	// };

	// console.log(showPreviews);
	// console.log(files);

	// useEffect(() => {
	// 	return () => {
	// 		showPreviews.forEach((url) => URL.revokeObjectURL(url));
	// 	};
	// }, [showPreviews]);

	return (
		<>
			<div className='mx-default'>
				<header className='pt-10'>
					<div className='pb-6'>
						<RxArrowLeft size={26} />
					</div>
					<h1 className='pb-5 text-xl font-bold'>게시글 작성</h1>
				</header>
				<main className='flex justify-center'>
					<div className='flex max-w-[300px] flex-col items-end gap-3'>
						<label htmlFor='file' className='flex w-5 justify-center rounded-sm bg-mainColor'>
							<BiPlus />
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
						<div className='rounded-default h-[304px] w-[304px] border-2 border-mainColor bg-white'>
							<Carousel slides={Previews} />
						</div>
					</div>
				</main>
			</div>
		</>
	);
};
export default UploadPage;
