"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
// プラグインが必要
import ja from "dayjs/locale/ja";
dayjs.locale(ja);

const Calendar = () => {
    const weeks = ["日", "月", "火", "水", "木", "金", "土"];
    const now = dayjs(); // 現在の日付情報を取得

    const [current, setCurrent] = useState(now);

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

    useEffect(() => {
        setEndDate(Number(current.endOf("month").format("D")));
        setStartDay(Number(current.startOf("month").format("d")));
        setEndDay(Number(current.endOf("month").format("d")));
        setLastMonthEndDate(
            Number(current.subtract(1, "month").endOf("month").format("D"))
        );
    }, [current]);

    return (
        <div className="w-full">
            <div className="flex pb-5 relative">
                <h2 className="text-2xl">{current.format("YYYY")} 年</h2>
                <div className="absolute top-0 inset-x-0 flex justify-center">
                    <button
                        value="last"
                        onClick={() =>
                            setCurrent((prev) => prev.subtract(1, "month"))
                        }
                    >
                        ◀
                    </button>
                    <p className="px-2 text-3xl font-extrabold">
                        {current.format("M")} 月
                    </p>
                    <button
                        value="next"
                        onClick={() =>
                            setCurrent((prev) => prev.add(1, "month"))
                        }
                    >
                        ▶
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 border-t border-r">
                {weeks.map((day) => (
                    <div
                        key={day}
                        className="flex justify-center first:text-red-400 last:text-blue-400 border-l border-b"
                    >
                        <span>{day}</span>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 border-r">
                {/* 前月の日付を空枠で追加 */}
                {[...Array(startDay)].map((_, i) => (
                    <div className="border-l border-b bg-slate-900" key={i}>
                        <p className="m-1">
                            {lastMonthEndDate - startDay + i + 1}
                        </p>
                    </div>
                ))}
                {[...Array(endDate)].map((_, i) => (
                    <div
                        className="border-l border-b"
                        key={i}
                        style={{
                            backgroundColor:
                                (startDay + i) % 7 == 0
                                    ? " rgb(252 165 165 / 0.2)"
                                    : (startDay + i) % 7 == 6
                                    ? "rgb(147 197 253 / 0.2)"
                                    : "",
                        }}
                    >
                        <p className="m-1">{i + 1}</p>
                        <div className="flex flex-col pt-5 m-1 text-slate-900">
                            <div className="bg-red-300 rounded-md py-0.5 my-0.5 text-center">
                                タスク
                            </div>
                            <div className="bg-blue-300 rounded-md py-0.5 my-0.5 text-center">
                                タスク2
                            </div>
                            <div className="bg-green-300 rounded-md py-0.5 my-0.5 text-center">
                                タスク3
                            </div>
                        </div>
                    </div>
                ))}
                {/* 来月の日付を空枠で追加 */}
                {endDay < 6 &&
                    [...Array(6 - endDay)].map((_, i) => (
                        <div className="border-l border-b bg-slate-900" key={i}>
                            <p className="m-1">{i + 1}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Calendar;
