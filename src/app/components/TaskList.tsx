import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import dayjs from "dayjs";
import { Task } from "@/type";

const TaskList = () => {
    const now = dayjs();
    const currentYear = now.format("YYYY");
    const currentMonth = now.format("MM");
    const currentDate = now.format("DD");
    const today = `${currentYear}-${currentMonth}-${currentDate}`;

    console.log(today);
    const [selectDay, setSelectDay] = useState<string>('2023-10-18');

    const [taskList, setTaskList] = useState<Task[]>();

    useEffect(() => {
        async function fetchTasks() {
            // supabaseから取得する
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(
                `${API_URL}/api/todo?today=${selectDay}`,
                {
                    next: { revalidate: 10 },
                }
            ); // ISR 10秒ごとに再生成
            const todaysTasks: Task[] = await res.json();

            setTaskList(todaysTasks);
        }
        fetchTasks();
    
    }, [selectDay])

    console.log(taskList)
    return (
        <>
            <h2 className="my-10 font-extrabold text-3xl">{selectDay} &apos;s todo</h2>
            <div className="mt-5 lg:grid lg:grid-cols-3 gap-3 flex-col">
                {taskList?.map((task) => (
                    <TaskCard key={task.id} {...task}/>

                ))}

            </div>
        </>
    );
};

export default TaskList;
