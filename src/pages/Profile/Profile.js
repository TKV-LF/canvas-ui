import React, { useState } from 'react';
import { Menu } from '~/components/Layouts';
import { Link } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';
const profileMenu = [
	{
		label: 'Notifications',
		path: '/profile/communication',
	},
	{
		label: 'Profile',
		path: '/profile',
		// role: 'teacher',
	},
	{
		label: 'Files',
		path: '/files',
	},
	{
		label: 'Settings',
		path: '/profile/settings',
	},
	{
		label: 'ePortfolios',
		path: '/dashboard/eportfolios',
	},
	{
		label: 'Shared Content',
		path: '/profile/content_shares',
	},
	{
		label: 'QR for Mobile Login',
		path: '/profile/qr_mobile_login',
	},
	{
		label: 'Global Announcements',
		path: '/account_notifications',
	},
]

const Profile = () => {
	const [menu, setMenu] = useState(true);

	return (
		<div className="grid grid-cols-1">
			<div className="pl-5 pr-8">
				<div className="flex flex-col border-b">
					<span className="cursor-pointer" onClick={() => setMenu(!menu)}>drop</span>
					<Breadcrumbs aria-label="breadcrumb">
						<Link
							underline="hover"
							color="inherit"
							href="/profile"
						>
							Thuy Nguyen Trong profile's
						</Link>
						<Typography color="text.primary">Breadcrumbs</Typography>
					</Breadcrumbs>
				</div>
				<div className={`${!menu && 'scale-0'}`}>
					<Menu items={profileMenu} />
				</div>

			</div>

		</div>
	);
};

export default Profile;
