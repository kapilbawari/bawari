import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModal';
import { connectToMongoDB } from '@/dbConfig/dbConfig';

connectToMongoDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token);

        // Find the user with the token and check if the token is still valid (not expired)
        const user = await User.findOne({
            validateToken: token,
            validateTokenExp: { $gte: Date.now() }, // $gte is used for 'greater than or equal'
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
        }

        console.log(user);

        // Mark the user as verified and remove the token and its expiration
        user.isVerified = true;
        user.validateToken = undefined;
        user.validateTokenExp = undefined;
        await user.save();

        // Return a successful response
        return NextResponse.json(
            {
                message: "Email verified successfully",
                success: true,
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("Error during email verification:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
