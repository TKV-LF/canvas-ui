import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import SidePanel from './SidePanel';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
	return (
		<div className="flex">
			<SidePanel />
			<div className={cx('container')}>
				<div className={cx('content')}>{children}</div>
			</div>
		</div>
	);
}

export default DefaultLayout;
