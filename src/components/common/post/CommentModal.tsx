import { useReducer } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { BsArrowLeft } from 'react-icons/bs';

interface CommentModalProps {
	isCommentClicked: boolean;
	setIsCommentClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Action {
	type: 'changeIndex';
	payload: number;
}

const reducer = (state: Record<number, boolean>, action: Action) => {
	switch (action.type) {
		case 'changeIndex':
			return {
				...state,
				[action.payload]: !state[action.payload],
			};
		default:
			return state;
	}
};

export const CommentModal = ({ setIsCommentClicked }: CommentModalProps) => {
	const [commentToggle, dispatch] = useReducer(reducer, {});
	return (
		<ul className='relative z-50 h-full w-full rounded-default bg-white p-3'>
			<button
				className='flex items-center pb-1'
				onClick={() => {
					setIsCommentClicked(false);
				}}
			>
				<BsArrowLeft size='25px' />
			</button>
			<div className='flex h-[86%] flex-col gap-2 overflow-hidden overflow-y-auto text-nowrap rounded-default pb-4 pt-2'>
				{Array.from({ length: 10 }, (_, i) => (
					<>
						<li className='flex flex-col rounded-default bg-subColor bg-opacity-55 p-2 text-sm'>
							<div className=''>User{i + 1}</div>
							<div className='flex flex-row justify-between'>
								<div
									className={
										commentToggle[i]
											? `h-auto w-[95%] text-wrap break-words`
											: `w-[95%] overflow-hidden text-ellipsis break-words break-all`
									}
								>
									이 댓글은 {i + 1}번 째 댓글이다. 이야호 이 댓글은 영국에서 부터 시작되어 행운의
									동동배를 타고 바다를 건너 태평앙을 건너 대서양을 건너 인도양을 지나서라도~ 당신이
									원하면 달려갈거야 무조건 무조건이야
								</div>
								<button
									className='flex items-end'
									onClick={() => {
										dispatch({ type: 'changeIndex', payload: i });
									}}
								>
									{commentToggle[i] ? '줄이기' : '더보기'}
								</button>
							</div>
						</li>
					</>
				))}
			</div>
			<div className='sticky top-[97%] mt-[6px] flex w-full flex-row justify-between gap-1'>
				<div className='flex flex-grow'>
					<Input placeholder='코멘트를 입력해주세요 ✨' />
				</div>
				<div className='w-[10%]'>
					<Button className='bg-subColor'>{'입력'}</Button>
				</div>
			</div>
		</ul>
	);
};
