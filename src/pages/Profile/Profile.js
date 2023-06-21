import useHead from '~/hooks/useHead';

const Profile = () => {
    useHead({
        title: 'Profile',
    });

    return (
        <div className="space-y-4">
            <div className="flex">
                <span className="font-semibold">Họ và Tên:*  </span>
                <span className="ml-32">thuongkhungvu@gmail.com</span>
            </div>

            <div className="flex">
                <span className="font-semibold">Hiển Thị Tên:</span>
                <span className="ml-32">thuongkhungvu@gmail.com</span>
            </div>

            <div className="flex">
                <span className="font-semibold">Tên Có Thể Sắp Xếp:</span>
                <span className="ml-20">thuongkhungvu@gmail.com</span>
            </div>
        </div>
    );
};

export default Profile;
