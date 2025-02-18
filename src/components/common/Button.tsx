interface ButtonProps {
	children: React.ReactNode; // 버튼 안에 들어갈 content
	onClick?: () => void;
	disabled?: boolean;
	className?: string; // 추가적인 클래스
	type?: 'button' | 'submit'; // 버튼 타입
	minWidth?: string;
	minHeight?: string;
	textSize?: string;
	textColor?: string;
	fontBold?: string;
	borderRadius?: string;
	[key: string]: any; // 추가적인 HTML 속성 지원
}

export const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	disabled = false,
	className = '',
	type = 'button',
	minWidth = 'min-w-full',
	minHeight = 'min-h-[36px]',
	textSize = 'text-lg',
	textColor = 'text-[#FFFFFF]',
	fontBold = 'font-semibold',
	borderRadius = 'rounded-default',
	...props
}) => {
	const baseStyles = `${minHeight} ${minWidth} ${textSize} ${textColor} ${fontBold} ${borderRadius} flex items-center justify-center bg-mainColor duration-300 hover:bg-hoverColor active:scale-95`;

	const disabledStyles = disabled
		? 'bg-[#A6AEB3] hover:bg-[#A6AEB3] active:scale-100 cursor-not-allowed'
		: 'cursor-pointer';

	return (
		<button
			onClick={onClick}
			className={`${baseStyles} ${disabledStyles} ${className}`}
			disabled={disabled}
			type={type}
			{...props}
		>
			{children}
		</button>
	);
};
