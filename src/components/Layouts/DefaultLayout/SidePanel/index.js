import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
} from 'react-icons/ai';
import logo from '~/assets/images/logo.jpg';

const Menus = [
    { title: 'Dashboard', path: '/', icon: <AiOutlineHome /> },
    { title: 'Account', path: '/profile', icon: <AiOutlineUser /> },
    { title: 'Admin', path: '/admin', icon: <AiOutlineKey /> },
    { title: 'Courses', path: '/courses', icon: <AiOutlineBook /> },
    { title: 'Calendar', path: '/calendar', icon: <AiOutlineCalendar /> },
    { title: 'Inbox', path: '/inbox', gap: true, icon: <AiOutlineInbox /> },
    { title: 'History', path: '/history', gap: true, icon: <AiOutlineClockCircle /> },
];
const Sidebar = () => {
    // const [open, setOpen] = useState(true);

    // const toggleSidebar = () => {
    //     setOpen(!open);
    // };
    // return (
    //     <div
    //         className={`flex flex-col items-center h-screen bg-gray-100 text-gray-700 shadow-lg ${
    //             open ? 'w-[12rem]' : 'w-20'
    //         } relative duration-200`}
    //     >
    //         <div className={`flex items-center w-full px-2 pb-5 mt-3 ${!open && 'border-b border-gray-300'}`}>
    //             <div className="inline-flex">
    //                 <img
    //                     src="https://inkythuatso.com/uploads/images/2021/12/logo-dai-hoc-thuy-loi-inkythuatso-converted-01-23-08-44-48.jpg"
    //                     alt="ThuyLoi"
    //                     width="36"
    //                     height="36"
    //                     className={`bg-amber-300 rounded cursor-pointer block float-left duration-300 ${
    //                   {      !open && 'scale-0'}
    //                     }`}
    //                 />
    //                 <h1 className={`origin-left font-medium text-2xl duration-300 ${!open && 'scale-0'} pl-3`}>TLU</h1>
    //             </div>
    //             <AiOutlineLeft
    //                 className={`text-1xl absolute right-3 top-6 cursor-pointer ${!open && 'rotate-180 right-8'}`}
    //                 onClick={toggleSidebar}
    //             />
    //         </div>
    //         <div className={`w-full flex items-center rounded-md bg-search-bg px-5 py-2 ${!open && 'scale-0'}`}>
    //             <AiOutlineSearch
    //                 className={`text-lg text-white block float-left cursor-pointer ${!open && 'scale-0'}`}
    //             />
    //             <input
    //                 type="text"
    //                 placeholder="Search"
    //                 className={`text-base bg-transparent w-full text-white focus:outline-none ${
    //                   {  !open && 'scale-0'}
    //                 } pl-3`}
    //             />
    //         </div>

    //         {/* <div class="flex flex-col items-center w-16 h-full overflow-hidden text-gray-700 bg-gray-100 rounded">
    // 			<a class="flex items-center justify-center mt-3" href="#">
    // 				<svg class="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    // 					<path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
    // 				</svg>
    // 			</a>
    // 			<div class="flex flex-col items-center mt-3 border-t border-gray-300">
    // 				<a class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-300" href="#">
    // 					<svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    // 						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    // 					</svg>
    // 				</a>
    // 				<a class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-300" href="#">
    // 					<svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    // 						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    // 					</svg>
    // 				</a>
    // 				<a class="flex items-center justify-center w-12 h-12 mt-2 bg-gray-300 rounded" href="#">
    // 					<svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    // 						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    // 					</svg>
    // 				</a>
    // 				<a class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-300" href="#">
    // 					<svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    // 						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
    // 					</svg>
    // 				</a>
    // 			</div>
    // 			<div class="flex flex-col items-center mt-2 border-t border-gray-300">
    // 				<a class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-300" href="#">
    // 					<svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    // 						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    // 					</svg>
    // 				</a>
    // 				<a class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-300" href="#">
    // 					<svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    // 						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    // 					</svg>
    // 				</a>
    // 				<a class="relative flex items-center justify-center w-12 h-12 mt-2 hover:bg-gray-300" href="#">
    // 					<svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    // 						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
    // 					</svg>
    // 					<span class="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full"></span>
    // 				</a>
    // 			</div>
    // 			<a class="flex items-center justify-center w-16 h-16 mt-auto bg-gray-200 hover:bg-gray-300" href="#">
    // 				<svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    // 					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    // 				</svg>
    // 			</a>
    // 		</div>*/}

    //         <div className={`flex flex-col items-center h-full w-full px-2 pb-5 mt-3 `}>
    //             <div className="w-full px-2">
    //                 {menu.map((item, index) => (
    //                     <div className="flex item-centers items-center w-full mt-3" key={index}>
    //                         <div className={`${!open && 'scale-0'}`}> {item.icon}</div>
    //                         <span className={`ml-2 text-sm font-medium ${!open && 'scale-0'}`}>{item.name}</span>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>

    //         <div className={`flex items-center w-full px-2 pb-5 -mb-5`}>
    //             <div className="inline-flex">
    //                 <img
    //                     className={`bg-amber-300 rounded cursor-pointer block float-left duration-300 ${
    //                        { !open && 'ml-3'}
    //                     }`}
    //                     src="https://www.w3schools.com/howto/img_avatar.png"
    //                     alt="ThuyLoi"
    //                     width="36"
    //                     height="36"
    //                 />
    //                 <h1 className={`origin-left font-medium text-2xl duration-300 ${!open && 'scale-0'} pl-3`}>
    //                     Lucius
    //                 </h1>
    //             </div>
    //         </div>
    //     </div>
    // );

    const [open, setOpen] = useState(true);

    const toggleSidebar = () => {
        setOpen(!open);
    };

    const path = useLocation().pathname;

    return (
        <div className="flex">
            <div className={`${open ? 'w-72' : 'w-20 '} bg-dark-purple h-screen p-5  pt-8 relative duration-300`}>
                <AiOutlineLeft
                    className={`absolute cursor-pointer right-0 top-10 text-1xl text-white w-7 border-dark-purple
                 ${!open && 'rotate-180 right-6'}`}
                    onClick={toggleSidebar}
                />
                <div className="flex gap-x-4 items-center">
                    <img
                        src={logo}
                        width="36"
                        height="36"
                        className={`cursor-pointer duration-500 ${!open && 'scale-0'}`}
                    />

                    <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && 'scale-0'}`}>
                        Thuy Loi University
                    </h1>
                </div>

                <div
                    className={`w-full flex items-center rounded-md bg-search-bg px-5 py-2 mt-5 ${!open && 'scale-0'}`}
                >
                    <AiOutlineSearch
                        className={`text-lg text-white block float-left cursor-pointer ${!open && 'scale-0'}`}
                    />
                    <input
                        type="text"
                        placeholder="Search"
                        className={`text-base bg-transparent w-full text-white focus:outline-none ${
                            !open && 'scale-0'
                        } pl-3`}
                    />
                </div>

                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <Link to={Menu.path} key={index}>
                            <li
                                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2 ${
                                    Menu.path === path && 'bg-light-white'
                                } `}
                            >
                                {Menu.icon}
                                <span className={`text-sm font-medium ${!open && 'scale-0'}`}>{Menu.title}</span>
                            </li>
                        </Link>
                    ))}
                </ul>

                <div className={`flex items-center w-full text-white absolute bottom-0 mb-3`}>
                    <div className="inline-flex">
                        <img
                            className={`bg-amber-300 rounded cursor-pointer block float-left duration-300`}
                            src="https://www.w3schools.com/howto/img_avatar.png"
                            alt="ThuyLoi"
                            width="36"
                            height="36"
                        />
                        <h1 className={`origin-left font-medium text-2xl duration-300 ${!open && 'scale-0'} pl-3`}>
                            Lucius
                        </h1>
                    </div>
                </div>
            </div>
            <div className="h-screen flex-1 p-7">
                <h1 className="text-2xl font-semibold ">Home Page</h1>
            </div>
        </div>
    );
};

export default Sidebar;
