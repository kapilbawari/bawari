import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getdataformToken = (request: NextRequest) => {
    try {
        // Get the token from cookies
        const token = request.cookies.get("token")?.value || "";

        // If no token is found, throw an error
        if (!token) {
            throw new Error("No token provided");
        }

        // Verify the token using the secret key
        const decodedToken: any = jwt.verify(token, process.env.MONNGOScritykey!);

        // Return the user ID from the decoded token
        return decodedToken.id;
    } catch (error: any) {
        // Return a meaningful error message if something goes wrong
        throw new Error("Invalid or expired token");
    }
};
