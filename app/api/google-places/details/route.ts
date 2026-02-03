import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const placeId = searchParams.get("placeId");
    const apiKey = process.env.NEXT_PUBLIC_MAP_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: "API Key is missing" }, { status: 500 });
    }

    if (!placeId) {
        return NextResponse.json({ error: "Place ID is required" }, { status: 400 });
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_phone_number,opening_hours,website,vicinity,editorial_summary,opening_hours/weekday_text&key=${apiKey}&language=ja`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== "OK") {
            return NextResponse.json({ error: data.status, message: data.error_message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data: data.result });
    } catch (error) {
        console.error("Google Place Details API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch details from Google" }, { status: 500 });
    }
}
