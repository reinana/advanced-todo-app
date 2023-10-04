import CalendarHeader from "./components/CalendarHeader";
import dayjs from "dayjs";
import { Task } from "@/type";

export default async function Home() {
    // supabaseから取得する RLS enabledをdisableに変更しないとできなかった
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}/api/todo`, { cache: "no-store" }); // 全記事取得はssrで
    const tasks: Task[] = await res.json();

    const now = dayjs(); // 現在の日付情報を取得
    const year: string = now.format("YYYY");
    const result = await fetch(`${API_URL}/api/holidays?year=${year}`, {
        cache: "no-store",
    }); // 全記事取得はssrで
    const holidays = await result.json();

    return (
        <>
            <div>
                <CalendarHeader tasks={tasks} initialHolidays={holidays} />
            </div>
        </>
    );
}
