import React, { useEffect } from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { Button } from '@mui/material';

import { RightSide } from '~/components/Side';
import CreateCourse from '~/pages/Course/CreateCourse';

import { CourseApi } from '~/services/api';

async function getData() {
    try {
        const data = await CourseApi.getAllCourse();
        return data;
    } catch (error) {
        console.error(error); // Handle the error
    }
}

const Dashboard = () => {
    const [publishCourses, setPublishCourses] = useState([]);
    const [unpublishCourses, setUnpublishCourses] = useState([]);

    useEffect(() => {
        let publishCourses = [];
        let unpublishCourses = [];
        getData().then((data) => {
            data.forEach((course) => {
                if (course.is_public == true) {
                    publishCourses.push(course);
                } else {
                    unpublishCourses.push(course);
                }
            });
            setPublishCourses(publishCourses);
            setUnpublishCourses(unpublishCourses);
        });
    }, []);
    return (
        <div className="grid grid-cols-7 ">
            <div className="left col-span-6 px-5 pr-8">
                <div className="flex flex-col border-b">
                    <Typography variant="h4" component="h1" gutterBottom></Typography>
                </div>
                <div className="mx-8">
                    <div className="grid grid-cols-1 mb-10">
                        <div className="grid grid-cols-1 border-b mb-7 pb-1">
                            <h2 className="text-2xl font-bold">Khoá học công khai({publishCourses.length})</h2>
                        </div>
                        <div className="grid grid-cols-5 gap-4">
                            {publishCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow h-full"
                                >
                                    <div className={`h-[146px] bg-red-100 -mx-6 -mt-6`}></div>
                                    <div className="h-2/5">
                                        <Link to={`/courses/${course.id}`}>
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                                {course.name}
                                            </h5>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                {course.code}
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1">
                        <div className="grid grid-cols-1 border-b mb-7 pb-1">
                            <h2 className="text-2xl font-bold">Khoá học chưa công khai ({unpublishCourses.length})</h2>
                        </div>
                        <div className="grid grid-cols-5 gap-4">
                            {unpublishCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow h-full"
                                >
                                    <div className={`h-[146px] bg-red-100 -mx-6 -mt-6`}></div>
                                    <div className="h-2/5">
                                        <Link to={`/courses/${course.id}`}>
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                                {course.name}
                                            </h5>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                {course.code}
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="right col-span-1 p-4">
                <RightSide>
                    <div className="grid grid-cols-2 border-b pb-2">
                        <div className="grid col-span-1 font-bold">Sắp tới</div>
                        <div className="grid col-span-1">
                            <Link to="/calendar" className="flex group">
                                <FaRegCalendarAlt />
                                <span className="ml-1 text-xs underline group-hover:no-underline group-hover:text-sky-400 flex">
                                    Xem Lịch
                                </span>
                            </Link>
                        </div>
                    </div>
                    <span className="text-sm">Không có sự kiện trong tuần tới</span>

                    <div className="mt-4">
                        <div className="mb-2">
                            <CreateCourse title="Tạo khoá học mới" />
                        </div>
                        <div>
                            <Button variant="outlined" className="w-full text-left">
                                <Link to="grades">Xem điểm</Link>
                            </Button>
                        </div>
                    </div>
                </RightSide>
            </div>
        </div>
    );
};

export default Dashboard;
