import { useToastStore } from '@/stores/useToastStore';
import { useEffect, useState } from 'react';

export interface FileObj {
	fileObject: File;
	previewURL: string;
	type: string;
}

export function useFileUpload() {
	const [fileList, setFileList] = useState<FileObj[]>([]);
	const [isDragging, setIsDragging] = useState(false);
	const { showToast } = useToastStore();

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
		//파일 업로드 로직
		try {
			if (fileList.length === 0) {
				showToast({
					message: '사진을 한 장 이상 첨부해주세요!',
					type: 'error',
				});
				return;
			}

			
		} catch (error) {}
	};
	return {
		fileList,
		isDragging,
		handleDragEnter,
		handleDragLeave,
		handleDrop,
		handleFileInput,
		handleFileUpload,
	};
}
