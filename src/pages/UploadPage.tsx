// import { RxArrowLeft } from 'react-icons/rx';
// import Carousel from '@/components/uploadPage/Carousel';
// import { BiPlus } from 'react-icons/bi';
// import { useState } from 'react';

// const UploadPage = () => {
// 	const [files, setFiles] = useState<File[]>([]);
// 	const [previewUrl, setPreviewUrl] = useState<string[]>();

// 	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		const fileArr = e.target.files;
// 		if (!fileArr) return;

// 		let imgFiles: File[] = [];
// 		let file;
// 		let filesLength = fileArr.length > 5 ? 5 : fileArr.length;

// 		for (let i = 0; i < filesLength; i++) {
// 			file = fileArr[i];
// 			imgFiles[i] = file;
// 			files.length === 0 ? setFiles([...imgFiles]) : setFiles(files.concat([...imgFiles]));
// 		}
// 		console.log('files',files);
// 		console.log('fileArr',fileArr);
// 		console.log('imgFiles',imgFiles);

// 		e.target.value = '';
// 	};

// 	return (
// 		<>
// 			<div className='mx-default'>
// 				<header className='pt-10'>
// 					<div className='pb-6'>
// 						<RxArrowLeft size={26} />
// 					</div>
// 					<h1 className='pb-5 text-xl font-bold'>게시글 작성</h1>
// 				</header>
// 				<main className='flex justify-center'>
// 					<div className='flex max-w-[300px] flex-col items-end gap-3'>
// 						<label htmlFor='file' className='flex w-5 justify-center rounded-sm bg-mainColor'>
// 							<BiPlus />
// 						</label>
// 						<input
// 							type='file'
// 							name='file'
// 							id='file'
// 							multiple
// 							accept='image/*'
// 							className='hidden'
// 							required
// 							onChange={handleFileUpload}
// 						/>

// 						<div className='rounded-default h-[300px] w-[300px] border-2 border-mainColor bg-white'></div>
// 						<Carousel slides={[]} />
// 					</div>
// 				</main>
// 			</div>
// 		</>
// 	);
// };
// export default UploadPage;
