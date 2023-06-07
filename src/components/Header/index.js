import { Transition } from '@headlessui/react';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { AiOutlineBell, AiOutlineUser } from 'react-icons/ai';
import { NavLink, useLocation } from 'react-router-dom';
import { HEADER_MENU_LIST } from '~/constants';
import History from '~/pages/History';

function Header() {
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState(false);

    const toggleNotification = () => {
        setNotification(!notification);
    };

    const path = useLocation().pathname;

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 cursor-pointer">
                            <NavLink to="/dashboard">
                                <img
                                    className="h-8 w-8"
                                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                    alt="Course"
                                />
                            </NavLink>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {HEADER_MENU_LIST.map((Menu, index) => (
                                    <NavLink
                                        to={Menu.path}
                                        key={index}
                                        className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                                        style={({ isActive }) => (isActive ? { backgroundColor: '#4a5568' } : null)}
                                    >
                                        <Tooltip title={Menu.title} placement="bottom-start" arrow>
                                            <div className={`ml-0.5 text-xl `}>{Menu.icon}</div>
                                        </Tooltip>
                                        <span className={`text-sm font-medium `}>{Menu.title}</span>
                                    </NavLink>
                                ))}
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
                            {HEADER_MENU_LIST.map((Menu, index) =>
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
                                    <NavLink to={Menu.path} key={index}>
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
                                    </NavLink>
                                ),
                            )}
                        </div>
                    </div>
                )}
            </Transition>
        </nav>
    );
}

export default Header;
