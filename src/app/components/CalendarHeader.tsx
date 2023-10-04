"use client";

import React, { useEffect, useState, cache } from "react";
import Calendar from "./Calendar";
import { ChevronLeft, ChevronRight} from "react-feather";
import dayjs from "dayjs";
// プラグインが必要
import ja from "dayjs/locale/ja";
import { Task } from "@/type";
import TaskList from "./TaskList";
dayjs.locale(ja);

interface CalendarHeaderProps {
    tasks: Task[];
    initialHolidays: any;
}

const CalendarHeader = (props: CalendarHeaderProps) => {
    const { tasks, initialHolidays } = props;

    const weeks = ["日", "月", "火", "水", "木", "金", "土"];
    const now = dayjs(); // 現在の日付情報を取得
    const [holidays, setHolidays] = useState(initialHolidays);
    const [current, setCurrent] = useState(now);

    const [currentYear, setCurrentYear] = useState(Number(now.format("YYYY"))); // 選択した月
    const [currentMonth, setCurrentMonth] = useState(Number(now.format("M"))); // 選択した月

    const [endDate, setEndDate] = useState(
        Number(now.endOf("month").format("D"))
    ); // 月の最初の日の曜日を取得

    const [startDay, setStartDay] = useState(
        Number(now.startOf("month").format("d"))
    ); // 月の最初の日の曜日を取得

    const [endDay, setEndDay] = useState(
        Number(now.endOf("month").format("d"))
    ); // 月の最後の日の曜日を取得

    const [lastMonthEndDate, setLastMonthEndDate] = useState(
        Number(now.subtract(1, "month").endOf("month").format("D"))
    ); // 前月の最後の日を取得

    async function fetchHolidays(year: number) {
        const response = await fetch(
            `https://holidays-jp.github.io/api/v1/${year}/date.json`
        );
        const data = await response.json();
        return data;
    }

    const monthBackHandler = async () => {
        setCurrent((prev) => prev.subtract(1, "month"));
        let data;
        if (currentMonth == 1) {
            data = await fetchHolidays(currentYear - 1);
        } else {
            data = await fetchHolidays(currentYear);
        }
        setHolidays(data);
    };
    const monthNextHandler = async () => {
        setCurrent((prev) => prev.add(1, "month"));
        let data;
        if (currentMonth == 12) {
            data = await fetchHolidays(currentYear + 1);
        } else {
            data = await fetchHolidays(currentYear);
        }
        setHolidays(data);
        console.log(currentMonth);
    };

    useEffect(() => {
        setCurrentYear(Number(current.format("YYYY")));
        setCurrentMonth(Number(current.format("M")));
        setEndDate(Number(current.endOf("month").format("D")));
        setStartDay(Number(current.startOf("month").format("d")));
        setEndDay(Number(current.endOf("month").format("d")));
        setLastMonthEndDate(
            Number(current.subtract(1, "month").endOf("month").format("D"))
        );
    }, [current, setHolidays]);

    return (
        <div>
            <div className="flex flex-col items-center p-6 border-t-2 border-l-2 rounded-md shadow-lg  shadow-gray-500/80 bg-white/20 backdrop-blur-sm">
                <div className="w-full">
                    <div className="flex pb-5 relative">
                        <h2 className="text-2xl">
                            {current.format("YYYY")} 年
                        </h2>
                        <div className="absolute top-0 inset-x-0 flex justify-center">
                            <button value="last" onClick={monthBackHandler}>
                                <ChevronLeft/>
                            </button>
                            <p className="px-2 text-3xl font-extrabold select-none">
                                {current.format("M")} 月
                            </p>
                            <button value="next" onClick={monthNextHandler}>
                                <ChevronRight/>
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 border-t border-r rounded-t">
                        {weeks.map((day) => (
                            <div
                                key={day}
                                className="flex justify-center first:text-red-400 last:text-blue-400 border-l border-b"
                            >
                                <span>{day}</span>
                            </div>
                        ))}
                    </div>
                    <Calendar
                        holidays={holidays}
                        currentYear={currentYear}
                        currentMonth={currentMonth}
                        startDay={startDay}
                        endDay={endDay}
                        endDate={endDate}
                        lastMonthEndDate={lastMonthEndDate}
                        tasks={tasks}
                    />
                </div>
            </div>
            <TaskList />
        </div>
    );
};

export default CalendarHeader;
