import User from '@/models/userModal'; // Adjust the path as necessary
import { connectToMongoDB } from '@/dbConfig/dbConfig';
import nodemailer from 'nodemailer'; // Assuming you use nodemailer for sending emails

export default async function handler(req, res) {
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

        // Here you would generate a reset token and send the email
        // For example:
        const resetToken = 'some-generated-token'; // Implement token generation logic

        // Send the email
        const transporter = nodemailer.createTransport({
            // SMTP configuration
        });

        await transporter.sendMail({
            to: email,
            subject: 'Password Reset',
            text: `To reset your password, click the link: <link>?token=${resetToken}`,
        });

        res.status(200).json({ message: 'Reset link sent to your email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
