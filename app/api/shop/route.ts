import { db } from "@/lib/DB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT *
      FROM shops
      WHERE
        (
          open_time < close_time
          AND CURTIME() BETWEEN open_time AND close_time
        )
        OR
        (
          open_time > close_time
          AND (CURTIME() >= open_time OR CURTIME() <= close_time)
        )
    `);

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
