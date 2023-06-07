import Header from '~/components/Header';
import ProfileSidebar from '~/components/ProfileSidebar';
const ProfileLayout = ({ children }) => {
    return (
        <div>
            <Header></Header>

            <div className="grid grid-cols-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-3">
                <div className="col-span-3">
                    <ProfileSidebar></ProfileSidebar>
                </div>

                <div className="col-span-9 p-2">{children}</div>
            </div>
        </div>
    );
};

export default ProfileLayout;
