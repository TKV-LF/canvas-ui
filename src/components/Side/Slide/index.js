import { useState, useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai'

const SideSlide = ({ title, display, left, children }) => {
	const [open, setOpen] = useState(display);
	const wrapperRef = useRef(null);
	useEffect(() => {
		setOpen(display);
		function handleClickOutside(event) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setOpen(false);
			}
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [display]);

	const toggleSideSlide = () => {
		setOpen(!open);
	};

	return (

		open ? (
			<div ref={wrapperRef} className={`absolute text-left ${left} top-0 side-slide border h-screen w-80 bg-[#fff] z-50 overflow-scroll transition-2`}>
				<div className="w-full border-b h-16 mx-6 pt-5">
					<div className="text-xl mb-2 font-bold">{title}</div>

					<span className="absolute right-4 top-2 p-1.5 rounded-sm hover:bg-[#f1f7fc]"><button onClick={toggleSideSlide} className="cursor-pointer"><AiOutlineClose /></button></span>
				</div>
				<div className="mx-6 my-7">
					{children}
				</div>

			</div>
		) : ""

	)
}

export default SideSlide;
