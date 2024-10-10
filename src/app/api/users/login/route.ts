import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModal';
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectToMongoDB();

export async function POST(request: NextRequest) {
    try {
        const requestBody: { email: string; password: string } = await request.json();
        const { email, password } = requestBody;

        console.log("Login attempt:", requestBody);

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 404 });
        }

        console.log("Found user:", user);

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        const secretKey = process.env.MONNGOScritykey;
        if (!secretKey) {
            return NextResponse.json({ error: "Internal server error: Missing secret key" }, { status: 500 });
        }

        const token = jwt.sign(tokenData, secretKey, { expiresIn: '1d' }); // Set an expiration time for the token

        const response = NextResponse.json({ message: "Login successful", success: true });
        response.cookies.set("token", token, {
            httpOnly: true
        });
        return response;

    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
