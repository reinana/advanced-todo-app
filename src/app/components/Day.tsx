import { Task } from "@/type";
import React from "react";

interface DayProps {
    i: number;
    startDay: number;
    currentYear: number;
    currentMonth: number;
    today: string;
    holiday: string;
    todayTask: Task[] | undefined;
}
export const Day = (props: DayProps) => {
    const {
        i,
        startDay,
        currentYear,
        currentMonth,
        today,
        holiday,
        todayTask,
    } = props;
    return (
        <div className="border-l border-b hover:bg-indigo-800/20 cursor-pointer">
            <header className="flex">
                {/* 1行目に日付を表示 */}
                <p
                    className="m-1"
                    style={{
                        color:
                            (startDay + i) % 7 == 0 || holiday !== undefined
                                ? " rgb(252 165 165 / 1)"
                                : (startDay + i) % 7 == 6
                                ? "rgb(147 197 253 / 1)"
                                : "",
                    }}
                >
                    {i + 1}
                </p>
                {/* 祝日なら名前を */}
                <p className={"m-1"}>{holiday ? holiday : ""}</p>
            </header>
            <div className="flex flex-col pt-5 m-1 text-slate-900 h-32 overflow-hidden">
                {todayTask?.map((task) => (
                    <div key={task.id} className="bg-red-200 rounded-md py-0.5 my-0.5 text-center">
                        {task.title}
                    </div>
                ))}

            </div>
        </div>
    );
};
