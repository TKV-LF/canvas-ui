import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import History from '~/pages/History';
import { Menu } from '~/components/Popper';

import {
    AiOutlineLeft,
    AiOutlineSearch,
    AiOutlineHome,
    AiOutlineUser,
    AiOutlineKey,
    AiOutlineBook,
    AiOutlineCalendar,
    AiOutlineInbox,
    AiOutlineClockCircle,
    AiOutlineSetting,
    AiOutlineNotification,
} from 'react-icons/ai';

const Menus = [
    { title: 'Trang chủ', path: '/', icon: <AiOutlineHome /> },
    { title: 'Tài khoản', path: '/profile', icon: <AiOutlineUser /> },
    { title: 'Khóa học', path: '/courses', icon: <AiOutlineBook /> },
    { title: 'Lịch', path: '/calendar', icon: <AiOutlineCalendar /> },
    { title: 'Tin nhắn', path: '/inbox', gap: true, icon: <AiOutlineInbox /> },
];

const Items = [{ id: 1, title: 'Tài khoản', path: '' }];

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const [sideSlide, setSideSlide] = useState(false);

    const toggleSidebar = () => {
        setOpen(!open);
    };

    const toggleSideSlide = () => {
        setSideSlide(!sideSlide);
    };

    const path = useLocation().pathname;

    return (
        <div className={`flex bg-light-blue ${open ? ' w-72' : 'w-16'} h-screen`}>
            <div className="w-16 mt-12 pl-3">
                <div className="mb-5">
                    <img
                        className={`bg-amber-300 rounded cursor-pointer block float-left duration-300`}
                        src="https://www.w3schools.com/howto/img_avatar.png"
                        alt="ThuyLoi"
                        width="36"
                        height="36"
                    />
                </div>
                <Link to="/dashboard">
                    <AiOutlineHome
                        className={`cursor-pointer text-3xl text-white my-5
						 `}
                    />
                </Link>
                <Link to="/profile">
                    <AiOutlineSetting
                        className={`cursor-pointer text-3xl text-white 
					 `}
                    />
                </Link>
                <div>
                    <AiOutlineNotification
                        className={`cursor-pointer text-3xl text-white 
					 `}
                        onClick={toggleSideSlide}
                    />
                    <History display={sideSlide} left={'left-16'} />
                </div>
                <AiOutlineLeft
                    className={`cursor-pointer text-1xl text-white w-7 border-dark-purple rotate-180 ${open && 'hidden'}
					 `}
                    onClick={toggleSidebar}
                />
            </div>
            <div className={`${!open && 'hidden'} w-52 flex h-screen`}>
                <div className={`p-5 pt-8 relative duration-300`}>
                    <AiOutlineLeft
                        className={`absolute cursor-pointer right-0 top-10 text-1xl text-white w-7 border-dark-purple
					 `}
                        onClick={toggleSidebar}
                    />
                    <div className={`flex gap-x-4 items-center `}>
                        <h5 className={`text-white origin-left font-medium duration-200 `}>Thuy Loi University</h5>
                    </div>
                    <div className={`w-full flex items-center rounded-md bg-search-bg px-5 py-2 mt-5`}>
                        <AiOutlineSearch className={`text-lg text-white block float-left cursor-pointer `} />
                        <input
                            type="text"
                            placeholder="Search"
                            className={`text-base bg-transparent w-full text-white focus:outline-none pl-3`}
                        />
                    </div>
                    <ul className="pt-6">
                        {Menus.map((Menu, index) =>
                            Menu.path === '' ? (
                                <div key={index}>
                                    <li
                                        onClick={toggleSideSlide}
                                        className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2 ${
                                            Menu.path === path && 'bg-light-white'
                                        } `}
                                    >
                                        <Tooltip title={Menu.title} placement="bottom-start" arrow>
                                            <div className={`ml-0.5 text-xl`}>{Menu.icon}</div>
                                        </Tooltip>
                                        <span className={`text-sm font-medium `}>{Menu.title}</span>
                                    </li>
                                </div>
                            ) : (
                                <Link to={Menu.path} key={index}>
                                    <li
                                        className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2 ${
                                            Menu.path === path && 'bg-light-white'
                                        } `}
                                    >
                                        <Tooltip title={Menu.title} placement="bottom-start" arrow>
                                            <div className={`ml-0.5 text-xl `}>{Menu.icon}</div>
                                        </Tooltip>
                                        <span className={`text-sm font-medium `}>{Menu.title}</span>
                                    </li>
                                </Link>
                            ),
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
