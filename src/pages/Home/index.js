import React from 'react';

const Home = () => {
    const courses = [
        { id: 1, title: 'Course 1' },
        { id: 2, title: 'Course 2' },
        { id: 3, title: 'Course 3' },
    ];

    const announcements = [
        { id: 1, title: 'Announcement 1' },
        { id: 2, title: 'Announcement 2' },
        { id: 3, title: 'Announcement 3' },
    ];

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
            <header className="w-full bg-white py-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Canvas LMS</h1>
                    <div>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Login</button>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded ml-2">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto mt-8">
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Public Courses</h2>
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Public Announcements</h2>
                    <ul className="bg-white rounded shadow">
                        {announcements.map((announcement) => (
                            <li key={announcement.id} className="border-b last:border-b-0">
                                <a href="#" className="block px-6 py-4 hover:bg-gray-100">
                                    {announcement.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>

            <footer className="w-full bg-gray-200 py-4">
                <div className="container mx-auto text-center text-gray-600">
                    &copy; 2023 Canvas LMS. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Home;
