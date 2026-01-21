import { db } from "@/lib/DB";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";

  try {
    let query = `
      SELECT *
      FROM shops
      WHERE
        (
          (open_time < close_time AND CURTIME() BETWEEN open_time AND close_time)
          OR
          (open_time > close_time AND (CURTIME() >= open_time OR CURTIME() <= close_time))
        )
    `;
    const params: any[] = [];

    if (keyword) {
      query += ` AND name LIKE ?`;
      params.push(`%${keyword}%`);
    }

    if (category) {
      query += ` AND category = ?`;
      params.push(category);
    }

    const [rows] = await db.query(query, params);

    return NextResponse.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { success: false, data: [] },
      { status: 500 }
    );
  }
}
