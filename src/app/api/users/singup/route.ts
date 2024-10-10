import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModal';
import bcryptjs from 'bcryptjs';
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import {sendEmail} from '@/helper/nodemailer'

connectToMongoDB();

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { username,phone, email, password } = requestBody;
        console.log(requestBody);

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            phone,
            password: hashedPassword,
        });

        const saveuser = await newUser.save();

        // Console log the created user
        console.log("User created:", saveuser);
        
        await sendEmail({email,emailType:"VERIFY",UserId:saveuser._id})

        return NextResponse.json({
             message: "User created successfully",
             success:true,
             saveuser });

    } catch (error: any) {
       
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
