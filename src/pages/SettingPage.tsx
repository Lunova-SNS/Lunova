import { BackButton } from '@/components/common/BackButton';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { BiEdit } from 'react-icons/bi';
import { SlLogout } from 'react-icons/sl';

export const SettingPage = () => {
	return (
		<div className='mx-default flex flex-col items-center'>
			<BackButton overrideBack={true} className='absolute left-[30px] top-[38px]' />

			<div className='mt-[66px] min-w-full'>
				<h1 className='text-[20px] font-bold'>설정하기</h1>

				<section>
					<div>
						<BiEdit />
						<div>프로필 수정</div>
					</div>

					<div>
						<div>
							<img src='#' alt='프로필' />
						</div>
						<Input />
						<Button>저장</Button>
					</div>

					<hr />

					<div>
						<SlLogout />
						<div>로그아웃</div>
					</div>

					<hr />
				</section>
			</div>
		</div>
	);
};
