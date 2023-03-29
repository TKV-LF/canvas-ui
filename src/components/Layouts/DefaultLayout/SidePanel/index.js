import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
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

	const [open, setOpen] = useState(true);

	const toggleSidebar = () => {
		setOpen(!open);
	};

	const path = useLocation().pathname;

	return (
		<div className="flex h-screen">
			<div className={`${open ? 'w-72' : 'w-20'} bg-dark-purple p-5  pt-8 relative duration-300`}>
				<AiOutlineLeft
					className={`absolute cursor-pointer right-0 top-10 text-1xl text-white w-7 border-dark-purple
                 ${!open && 'rotate-180 right-6'}`}
					onClick={toggleSidebar}
				/>
				<div className={`flex gap-x-4 items-center ${!open && "border-b border-white"}`}>
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
					className={`w-full flex items-center rounded-md bg-search-bg px-5 py-2 mt-5 ${!open && 'hidden'}`}
				>
					<AiOutlineSearch
						className={`text-lg text-white block float-left cursor-pointer ${!open && 'scale-0'}`}
					/>
					<input
						type="text"
						placeholder="Search"
						className={`text-base bg-transparent w-full text-white focus:outline-none ${!open && 'scale-0'
							} pl-3`}
					/>
				</div>

				<ul className="pt-6">
					{Menus.map((Menu, index) => (
						<Link to={Menu.path} key={index}>
							<li
								className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2 ${Menu.path === path && 'bg-light-white'
									} ${!open && "pl-1"}`}

							>
								<Tooltip title={Menu.title} placement="bottom-start" arrow>
									<div className={`ml-0.5 text-xl ${!open && "mx-auto my-auto text-3xl"}`}>{Menu.icon}</div>
								</Tooltip>
								<span className={`text-sm font-medium ${!open && 'hidden'}`}>{Menu.title}</span>
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
		</div>
	);
};

export default Sidebar;
