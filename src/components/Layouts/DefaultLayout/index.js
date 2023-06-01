import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import { Transition } from '@headlessui/react';
import History from '~/pages/History';
import { Link, useLocation } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

import { AiOutlineBell, AiOutlineUser } from 'react-icons/ai';

const Menus = [
    { title: 'Trang chủ', path: '/dashboard' },
    { title: 'Tài khoản', path: '/profile' },
    { title: 'Khóa học', path: '/courses' },
    { title: 'Lịch', path: '/calendar' },
    { title: 'Tin nhắn', path: '/inbox', gap: true },
];
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState(false);

    const toggleNotification = () => {
        setNotification(!notification);
    };

    const path = useLocation().pathname;
    return (
        <div>
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 cursor-pointer">
                                <Link to="/dashboard">
                                    <img
                                        className="h-8 w-8"
                                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                        alt="Course"
                                    />
                                </Link>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {Menus.map((Menu, index) =>
                                        Menu.path === '' ? (
                                            <div key={index}>
                                                <div
                                                    onClick={toggleNotification}
                                                    className={` hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium ${
                                                        Menu.path === path && 'bg-light-white'
                                                    } `}
                                                >
                                                    <Tooltip title={Menu.title} placement="bottom-start" arrow>
                                                        <div className={`ml-0.5 text-xl`}>{Menu.icon}</div>
                                                    </Tooltip>
                                                    <span className={`text-sm font-medium `}>{Menu.title}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <Link to={Menu.path} key={index}>
                                                <div
                                                    className={` hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium ${
                                                        Menu.path === path && 'bg-light-white'
                                                    } `}
                                                >
                                                    <Tooltip title={Menu.title} placement="bottom-start" arrow>
                                                        <div className={`ml-0.5 text-xl `}>{Menu.icon}</div>
                                                    </Tooltip>
                                                    <span className={`text-sm font-medium `}>{Menu.title}</span>
                                                </div>
                                            </Link>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setOpen(!open)}
                                type="button"
                                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!open ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <div className="flex items-center">
                            <div className="mr-4">
                                <AiOutlineBell
                                    className={`cursor-pointer text-3xl text-white 
                                                     `}
                                    onClick={toggleNotification}
                                />
                                <History display={notification} left={'right-0 top-16'} />
                            </div>
                            <div>
                                <AiOutlineUser className={`cursor-pointer text-3xl text-white`} />
                            </div>
                        </div>
                    </div>
                </div>

                <Transition
                    show={open}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    {(ref) => (
                        <div className="md:hidden" id="mobile-menu">
                            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {Menus.map((Menu, index) =>
                                    Menu.path === '' ? (
                                        <div key={index}>
                                            <div
                                                onClick={toggleNotification}
                                                className={`hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium ${
                                                    Menu.path === path && 'bg-light-white'
                                                } `}
                                            >
                                                <Tooltip title={Menu.title} placement="bottom-start" arrow>
                                                    <div className={`ml-0.5 text-xl`}>{Menu.icon}</div>
                                                </Tooltip>
                                                <span className={`text-sm font-medium `}>{Menu.title}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link to={Menu.path} key={index}>
                                            <div
                                                className={`hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium ${
                                                    Menu.path === path && 'bg-light-white'
                                                } `}
                                            >
                                                <Tooltip title={Menu.title} placement="bottom-start" arrow>
                                                    <div className={`ml-0.5 text-xl `}>{Menu.icon}</div>
                                                </Tooltip>
                                                <span className={`text-sm font-medium `}>{Menu.title}</span>
                                            </div>
                                        </Link>
                                    ),
                                )}
                            </div>
                        </div>
                    )}
                </Transition>
            </nav>
            <div className={`w-full ${notification ? 'haiz' : ''}`}>
                <div className={cx('content')}>{children}</div>
            </div>
            <header className="bg-white shadow hidden">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 hidden">
                    {/* <!-- Replace with your content --> */}
                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
                    </div>
                    {/* <!-- /End replace --> */}
                </div>
            </main>
        </div>
    );
}

export default DefaultLayout;
