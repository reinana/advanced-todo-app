// next13からの書き方
// 全記事取得
import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month");
    const year = searchParams.get("year");
    const endDate = searchParams.get("endDate");
    const today = searchParams.get("today");

    if(today !== null) {
        const { data, error } = await supabase
            .from("tasks")
            .select("*")
            .eq("date", `${today}`);

            if (error) {
                return NextResponse.json(error);
            }
            return NextResponse.json(data, { status: 200 });
    }

    else if (month !== null) {
        const { data, error } = await supabase
            .from("tasks")
            .select("*")
            .gte("date", `${year}-${month}-01`)
            .lte("date", `${year}-${month}-${endDate}`);
        if (error) {
            return NextResponse.json(error);
        }
        return NextResponse.json(data, { status: 200 });
    } else {
        const { data, error } = await supabase.from("tasks").select("*");

        if (error) {
            return NextResponse.json(error);
        }
        return NextResponse.json(data, { status: 200 });
    }
}
