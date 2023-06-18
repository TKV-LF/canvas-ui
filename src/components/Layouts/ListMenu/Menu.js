import { Link, useParams } from 'react-router-dom';

const Menu = ({ items }) => {
    const params = useParams();
    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index} className="my-3">
                        <Link
                            to={item.path.replace(':courseId', params.courseId)}
                            className="text-[#0073A7] underline hover:no-underline"
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Menu;
