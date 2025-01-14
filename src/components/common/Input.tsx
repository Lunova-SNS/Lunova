import { PiAsteriskSimpleBold } from 'react-icons/pi';

interface InputProps {
	type?: 'text' | 'password' | 'email';
	value?: string | number;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	errorMessage?: string;
	isValid?: boolean;
	minWidth?: string;
	minHeight?: string;
	textSize?: string;
	fontBold?: string;
	[key: string]: any; // 추가적인 HTML 속성
}

export const Input: React.FC<InputProps> = ({
	type = 'text',
	value,
	onChange,
	placeholder = '',
	disabled = false,
	className = '',
	errorMessage,
	isValid = true,
	minWidth = 'min-w-full',
	minHeight = 'min-h-[36px]',
	textSize = 'text-[12px]',
	fontBold = 'font-semibold',
	...props
}) => {
	const baseStyles = `block ${minWidth} ${minHeight} ${textSize} ${fontBold} px-[16px] rounded-[10px] border border-[#A4A4A4] focus:outline-none transition duration-200`;

	const borderStyles = isValid
		? 'border-gray-300 focus:ring-1 focus:ring-blue-500'
		: 'border-error focus:ring-1 focus:ring-error';

	const disabledStyles = disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-backColor';

	const combinedStyles = `${baseStyles} ${borderStyles} ${disabledStyles} ${className}`;

	return (
		<div className='mb-4'>
			<input
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				disabled={disabled}
				className={combinedStyles}
				{...props}
			/>

			{!isValid && errorMessage && (
				<p className='mt-1 flex items-center text-xs font-light text-error'>
					<PiAsteriskSimpleBold size='10px' />
					<span className='ml-[2px]'>{errorMessage}</span>
				</p>
			)}
		</div>
	);
};
