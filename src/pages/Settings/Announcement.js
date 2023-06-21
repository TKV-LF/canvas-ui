import useHead from '~/hooks/useHead';

function Announcement() {
    useHead({
        title: 'Thông báo tổng',
    });

    return ( <h2>Announcement</h2> );
}

export default Announcement;