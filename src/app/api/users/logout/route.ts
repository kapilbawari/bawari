import { NextRequest, NextResponse } from 'next/server'; 
import { connectToMongoDB } from '@/dbConfig/dbConfig';


connectToMongoDB();

export async function GET(request: NextRequest) {
    try {
        
        const  response =  NextResponse.json({
            message : "Logut  Successfully",
            success:true
        })
        response.cookies.set("token"," ",{
            httpOnly: true,
            expires : new Date(0)
        })
        return response

    }  catch (error: any) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}