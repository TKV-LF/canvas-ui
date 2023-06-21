import Header from '~/components/Header';
import SettingSideBar from '~/components/SettingSideBar';
const SettingLayout = ({ children }) => {
    return (
        <div>
            <Header></Header>

            <div className="grid grid-cols-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-5">
                <div className="col-span-3">
                    <SettingSideBar></SettingSideBar>
                </div>

                <div className="col-span-9 p-2">{children}</div>
            </div>
        </div>
    );
};

export default SettingLayout;
