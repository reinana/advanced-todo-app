import React, { useEffect, useState } from "react";
import { Day } from "./Day";
import { Task } from "@/type";
import { supabase } from "@/utils/supabaseClient";
import { NextResponse } from "next/server";

interface CalenderProps {
    holidays: any;
    currentYear: number;
    currentMonth: number;
    startDay: number;
    endDay: number;
    endDate: number;
    lastMonthEndDate: number;
    tasks: Task[];
}
const Calendar = ({
    holidays,
    currentYear,
    currentMonth,
    startDay,
    endDay,
    endDate,
    lastMonthEndDate,
    tasks,
}: CalenderProps) => {
    const [thisMonthTasks, setThisMonthTasks] = useState<Task[]>(tasks);

    useEffect(() => {
        async function fetchTasks() {
            // supabaseから取得する
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(
                `${API_URL}/api/todo?year=${currentYear}&month=${currentMonth}&endDate=${endDate}`,
                {
                    next: { revalidate: 10 },
                }
            ); // ISR 10秒ごとに再生成
            const thisMonthTasks: Task[] = await res.json();

            setThisMonthTasks(thisMonthTasks);
        }
        fetchTasks();
    }, [currentMonth]);

    return (
        <div className="w-full">
            <div className="grid grid-cols-7 border-r">
                {/* 前月の日付を空枠で追加 */}
                {[...Array(startDay)].map((_, i) => (
                    <div className="border-l border-b bg-indigo-300/20" key={i}>
                        <p className="m-1">
                            {lastMonthEndDate - startDay + i + 1}
                        </p>
                    </div>
                ))}
                {[...Array(endDate)].map((_, i) => {
                    const today = `${currentYear}-${currentMonth
                        .toString()
                        .padStart(2, "0")}-${(i + 1)
                        .toString()
                        .padStart(2, "0")}`;
                    const holiday: string = holidays[today];
                    let todayTask: Task[] | undefined = thisMonthTasks.filter(
                        (task) => task.date === today
                    );

                    return (
                        <Day
                            key={i}
                            i={i}
                            startDay={startDay}
                            currentYear={currentYear}
                            currentMonth={currentMonth}
                            today={today}
                            holiday={holiday}
                            todayTask={todayTask}
                        />
                    );
                })}
                {/* 来月の日付を空枠で追加 */}
                {endDay < 6 &&
                    [...Array(6 - endDay)].map((_, i) => (
                        <div
                            className="border-l border-b bg-indigo-300/20"
                            key={i}
                        >
                            <p className="m-1">{i + 1}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Calendar;
