import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export async function GET(req: Request, res: NextApiResponse) {
    // const query = req.url.split("/holidays?")[1];udemyではこうしてた
    // console.log("ここ")
    // console.log(query)
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('year');

    const data = await fetch(
        `https://holidays-jp.github.io/api/v1/${query}/date.json`       
    ); 
    const holidays = await data.json();

    // if (error) {
    //     return NextResponse.json(error);
    // }

    return NextResponse.json(holidays, {status: 200});
}
