import { NextResponse } from 'next/server'; 
import { connectToMongoDB } from '@/dbConfig/dbConfig';

connectToMongoDB();

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successfully",
            success: true
        });

        // Clear the token cookie by setting it to an empty value and an expiration date in the past
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
            path: '/'  // Ensure the cookie is cleared across the entire site
        });

        return response;
    } catch (error) {
     console.log(error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
