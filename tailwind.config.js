/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				backColor: '#F7F7F7', // 전체 배경색
				mainColor: '#9777FF', // 메인 컬러
				subColor: '#EAE8FF', // 서브 컬러
				pointColor: '#FFBFD3', // 포인트 컬러
				hoverColor: '#7A3AFF', // 버튼 호버 시 컬러
				subText: '#757575', // 서브 텍스트 컬러
				gray: {
					100: '#ECECEC', // input disabled
					200: '#D9D9D9', // notification, profile
					300: '#A4A4A4', // input border
				},
				error: '#F95454', // 밝은 빨간색
				modalBack: '#24242480', // 모달 배경
			},
			fontFamily: {
				Inter: ['Inter', 'sans-serif'],
				Pretendard: ['Pretendard', 'sans-serif'],
			},
			fontSize: {
				xs: '8px', // 작은 텍스트
				sm: '10px', // 일반 작은 텍스트
				base: '12px', // 기본 텍스트 크기
				lg: '14px', // 약간 큰 텍스트
				xl: '20px', // 큰 텍스트
			},
			margin: {
				default: '30px',
			},
			borderRadius: {
				xs: '4px',
				sm: '5px',
				default: '6px',
			},
		},
	},
	plugins: [],
};
