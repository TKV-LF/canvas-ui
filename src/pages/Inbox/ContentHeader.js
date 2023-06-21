import {
	faBell,
	faEnvelope,
	faFolder,
	faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ContentHeader() {
	return (
		<div className="bg-dark-500 flex items-center py-6 px-10 mb-1 border-b">
			<FontAwesomeIcon
				icon={faMagnifyingGlass}
				className="text-xl text-light-300"
			/>
			<input
				placeholder="Tìm kiếm..."
				className="w-4/12 mr-auto ml-4 bg-transparent outline-none"
			/>
			<FontAwesomeIcon icon={faFolder} className="text-light-600 mx-2" />
			<FontAwesomeIcon icon={faBell} className="text-light-600 mx-2" />
			<FontAwesomeIcon icon={faEnvelope} className="text-light-600 mx-2" />
		</div>
	);
}


//long