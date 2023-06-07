import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';

import MenuItem from './MenuItem';
import styles from './Menu.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {

	const renderItems = () => {
		return items.map((item, index) => (
			<MenuItem data={item} key={index} />
		))
	}

	return (
		<Tippy
			interactive
			arrow={true}
			placement='right'
			trigger='click'
			render={attrs => (
				<div {...attrs} className={cx('menu-list')} tabIndex="-1">
					<PopperWrapper className={cx('menu-popper')}>{renderItems()}</PopperWrapper>
				</div>
			)}>
			{children}
		</Tippy>
	);
}

export default Menu;