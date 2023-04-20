import React from 'react';
import SideSlide from '~/components/SideSlide';

const data = [
	{
		title: 'Introduction to Computer Science',
		code: 'CS 101',
		time: '1:50 PM 20/04/2023',
	},
	{
		title: 'Introduction to Computer',
		code: 'CS 102',
		time: '1:50 PM 20/04/2023',
	},
	{
		title: 'Introduction to Science',
		code: 'CS 103',
		time: '1:50 PM 20/04/2023',
	},
	{
		title: 'Introduction to Network',
		code: 'CS 104',
		time: '1:50 PM 20/04/2023',
	}
]

const History = ({ display, left }) => {
	return (
		<div className="">
			<SideSlide title="Recent History" display={display} left={left} >
				<div className="flex flex-col gap-y-2 space-y-4">
					{
						data.map((item, index) => (
							<div key={index} className="flex gap-x-2">
								<div className="w-10 h-10 bg-gray-300 rounded-full"></div>
								<div className="flex flex-col">
									<div className="text-sm font-semibold">{item.title}</div>
									<div className="text-xs text-gray-400">{item.code}</div>
									<div className="text-xs text-gray-400">{item.time}</div>
								</div>
							</div>
						))

					}

				</div>
			</SideSlide>
		</div>
	)
}
export default History;
