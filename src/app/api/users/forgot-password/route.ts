import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/userModal';
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email } = req.body;

    await connectToMongoDB();

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Token generation logic (implement as needed)
        const resetToken = 'some-generated-token'; // Replace with actual token generation logic

        // Nodemailer transporter configuration
        const transporter = nodemailer.createTransport({
            host: 'your-smtp-host', // e.g., smtp.gmail.com
            port: 587, // SMTP port
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER, // SMTP username
                pass: process.env.SMTP_PASS, // SMTP password
            },
        });

        // Send the email
        await transporter.sendMail({
            from: '"Your App Name" <your-email@example.com>', // sender address
            to: email, // list of receivers
            subject: 'Password Reset', // Subject line
            text: `To reset your password, click the link: <link>?token=${resetToken}`, // plain text body
            html: `<p>To reset your password, click the link: <a href="<link>?token=${resetToken}">Reset Password</a></p>`, // HTML body
        });

        res.status(200).json({ message: 'Reset link sent to your email' });
    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
