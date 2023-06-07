import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/components/Header';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div>
            <Header></Header>

            <main className={cx('content')}>{children}</main>
        </div>
    );
}

export default DefaultLayout;
