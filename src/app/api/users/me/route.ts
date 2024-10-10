import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModal';
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import { getdataformToken } from '@/helper/getdatatokne';

// Ensure MongoDB connection is established
connectToMongoDB();

export async function POST(request: NextRequest) {
    try {
        // Extract user ID from token
        const userId = await getdataformToken(request);

        // Fetch the user from the database, excluding the password field
        const user = await User.findOne({ _id: userId }).select("-password");

        // If user not found, return 404
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Return user details in case of success
        return NextResponse.json({ message: "User fetched successfully", data: user }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);

        // Return error response in case of failure
        return NextResponse.json({ message: "Internal Server Error", error: (error as Error).message }, { status: 500 });
    }
}
