import { NextResponse } from "next/server";

export async function GET() {
    const apiKey = process.env.NEXT_PUBLIC_MAP_KEY;

    if (!apiKey) {
        console.error("DEBUG: API Key is missing");
        return NextResponse.json({ error: "API Key is missing" }, { status: 500 });
    }

    // Coordinates for Enoshima Nakamise-dori area
    const location = "35.3018,139.4807";
    const radius = "150"; // Small radius to focus on the street
    const type = "restaurant|store|food";

    // Using nearbysearch to get a list of businesses specifically in that area
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${apiKey}&language=ja`;

    console.log("DEBUG: Fetching from URL:", url.replace(apiKey, "HIDDEN"));

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
            console.error("DEBUG: Google API Error Status:", data.status, data.error_message);
            return NextResponse.json({ error: data.status, message: data.error_message }, { status: 400 });
        }

        if (data.status === "ZERO_RESULTS") {
            return NextResponse.json({ success: true, data: [] });
        }

        // Map the results to our Shop structure
        const shops = data.results.map((place: any) => ({
            id: place.place_id,
            name: place.name,
            category: (place.types.includes("restaurant") || place.types.includes("food")) ? "飲食" : "体験・買い物",
            image_url: place.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}` : null,
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
            open_time: place.opening_hours?.open_now ? "Now Open" : "Closed",
            address: place.vicinity || place.formatted_address,
            rating: place.rating,
        }));

        return NextResponse.json({ success: true, data: shops });
    } catch (error) {
        console.error("DEBUG: Google Places API Error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch from Google" }, { status: 500 });
    }
}
