import React, { useEffect } from 'react';
import { SideSlide } from '~/components/Side';
import { UserApi } from '~/services/api';

const data = [
    {
        title: 'Bạn có lời mời vào ngày 3/7',
        code: 'CS 101',
        time: '1:50 PM 20/04/2023',
    },
    
];

async function getData() {
    try {
        const data = await UserApi.getRecentHistory();
        return data;
    } catch (error) {
        console.error(error); // Handle the error
    }
}

const History = ({ display, left }) => {

	useEffect(() => {
		getData().then((data) => {
		});
	}, []);
    return (
        <div>
            <SideSlide title="Thông báo gần đây" display={display} left={left}>
                <div className="flex flex-col gap-y-2 space-y-4">
                    {data.map((item, index) => (
                        <div key={index} className="flex gap-x-2">
                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                            <div className="flex flex-col text-left">
                                <div className="text-sm font-semibold">{item.title}</div>
                                <div className="text-xs text-gray-400">{item.code}</div>
                                <div className="text-xs text-gray-400">{item.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </SideSlide>
        </div>
    );
};
export default History;
