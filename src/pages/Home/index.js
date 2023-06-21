import React from 'react';

const LoginButton = () => {
	const handleLogin = () => {
		// Redirect the user to the Canvas LMS authorization endpoint
		window.location.href = `${process.env.REACT_APP_CANVAS_API}/login/oauth2/auth?client_id=${process.env.REACT_APP_CANVAS_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
	};

	return (
		<button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={handleLogin}>
			Đăng nhập
		</button>
	);
};

const Home = () => {
	const courses = [
		{ id: 1, title: 'Khóa học PHP' },
		{ id: 2, title: 'Khóa học JS' },
		{ id: 3, title: 'Khóa học Java' },
	];

	const announcements = null;

	return (
		<div className="flex flex-col items-center justify-center bg-gray-100">
			<header className="w-full bg-white py-4 shadow-md">
				<div className="container mx-auto flex justify-between items-center">
					<h1 className="text-2xl font-bold text-gray-800">TLU</h1>
					<div>
						<LoginButton />

					</div>
				</div>
			</header>

			<main className="container mx-auto mt-8 mb-96">
				<section className="mb-8">
					<h2 className="text-2xl font-bold text-gray-800 mb-4">Khóa học công khai</h2>
					<ul className="bg-white rounded shadow">
						{courses.map((course) => (
							<li key={course.id} className="border-b last:border-b-0">
								<a href="#" className="block px-6 py-4 hover:bg-gray-100">
									{course.title}
								</a>
							</li>
						))}
					</ul>
				</section>

				<section>
					<h2 className="text-2xl font-bold text-gray-800 mb-4">Thông báo công khai</h2>
					<ul className="bg-white rounded shadow">
						{announcements ? announcements.map((announcement) => (
							<li key={announcement.id} className="border-b last:border-b-0">
								<a href="#" className="block px-6 py-4 hover:bg-gray-100">
									{announcement.title}
								</a>
							</li>
						)) :
							(<li className="border-b last:border-b-0">
								<a href="#" className="block px-6 py-4 hover:bg-gray-100">
								Không thông báo
								</a>
							</li>)
						}
					</ul>
				</section>
			</main>

			<footer className="w-full bg-gray-200 py-4">
				<div className="container mx-auto text-center text-gray-600">
					&copy; 2023 TLU.
				</div>
			</footer>
		</div>
	);
};

export default Home;
