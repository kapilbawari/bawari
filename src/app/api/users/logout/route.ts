import { NextRequest, NextResponse } from 'next/server'; 
import { connectToMongoDB } from '@/dbConfig/dbConfig';

connectToMongoDB();

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({
            message: "Logout Successfully",
            success: true
        });

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0) // This clears the cookie
        });

        return response;

    } catch (error) {
        console.error("Error during logout:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
