export const UserInfoPage = () => {
	return (
		<>
			{/* 유저 정보 프로필 */}
			<section className=''>
				<div>
					<div>
						<img src='#' alt='프로필' />
					</div>
					<p>nickname</p>
				</div>

				<div>
					<div>
						<button>123</button>
						<p>게시물</p>
					</div>

					<div>
						<button>14k</button>
						<p>팔로워</p>
					</div>

					<div>
						<button>0</button>
						<p>팔로잉</p>
					</div>
				</div>
			</section>

			{/* 유저 게시글 */}
			<section>
				<div>
					<img src='#' alt='게시물' />
				</div>
			</section>
		</>
	);
};
