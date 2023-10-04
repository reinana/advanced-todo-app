import { Task } from "@/type";
import Link from "next/link";
import React from "react";
import { Trash2, Heart, ChevronDown } from "react-feather";

const TaskCard = (props: Task) => {
    const { id, title, date, starttime, endtime, priority, favorite, done, category } = props;

    return (
        <div
            className="
                flex flex-col items-center 
                border-t-2 border-l-2 rounded-md 
                shadow-lg  shadow-gray-500/80 bg-white/20 backdrop-blur-sm 
                relative mb-4 lg:mb-1 py-4
            "
        >
            <span
                className="
                    absolute top-0 left-0 
                    bg-blue-100 text-blue-800 
                    text-s font-medium 
                    px-2.5 py-0.5 m-3
                    rounded-full"
            >
                {category}
            </span>
            <div className="w-2/3 flex shadow-[12px_12px_24px_rgba(0,0,0,0.2)] mt-10 rounded-2xl">
                <h2
                    className="
                    bg-gradient-to-r from-slate-200/30 to-slate-300/40 rounded-2xl
                    shadow-[-12px_-12px_24px_rgba(255,255,255,0.1)]
                        w-full
                        text-center
                        py-2
                        text-2xl
                        font-extrabold
                        md:text-4xl
                    "
                >
                    {title}
                </h2>
            </div>
            <div className="flex flex-col w-2/3 justify-between lg:justify-center my-5 p-2 bg-gradient-to-r from-slate-200/30 to-slate-300/40 rounded-2xl shadow-[12px_12px_24px_rgba(0,0,0,0.2)]">
                <div className="flex lg:px-2 px-5 py-2 w-full justify-between text-xl ">
                    <h3 className="">Priority</h3>
                    <p className="">{priority}</p>
                </div>
                <div className="flex lg:px-2 px-5 py-2 mt-2 w-full justify-between text-xl ">
                    <h3 className="">Time</h3>
                    <p>{starttime} ～ {endtime}</p>
                </div>
                <div className="flex lg:px-2 px-5 py-2 mt-2 w-full justify-end text-xl ">
                    <button className="mr-3"><Heart/></button>
                    <button><Trash2/></button>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <Link href="#">Show More</Link>
                <button><ChevronDown/></button>
            </div>
        </div>
    );
};

export default TaskCard;
