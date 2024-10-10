import User from '@/models/userModal';
import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, UserId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(UserId.toString(), 10);

        if (emailType === "VERIFY") {
            // Correcting the update query and the typo in 'validateToken'
            const updateUser = await User.findByIdAndUpdate(UserId, {
                $set: {
                    validateToken: hashedToken,
                    validateTokenExp: Date.now() + 3600000 // Token expires in 1 hour
                }
            });
            console.log("update user velidate" , updateUser)

        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(UserId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExp: Date.now() + 3600000 // Token expires in 1 hour
                }
            });
        }

        // Nodemailer transport configuration
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "436fa2ac9aced5",
                pass: "1f6c0c1bd06637",
            },
        });

        // Email content
        const emailpoint = {
            from: "ks12oct@gmail.com",
            to: email,
            subject: emailType === 'VERIFY' ? "Verify Your Email" : "Reset Your Password",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 8px; max-width: 600px; margin: auto;">
                    <h2 style="color: #333;">${emailType === 'VERIFY' ? 'Verify Your Email Address' : 'Reset Your Password'}</h2>
                    <p style="color: #555;">
                        ${emailType === 'VERIFY' ? 'Please click the link below to verify your email address.' : 'You requested a password reset. Click the link below to set a new password.'}
                    </p>
                    <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" style="background-color: #28a745; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
                        ${emailType === 'VERIFY' ? 'Verify Email' : 'Reset Password'}
                    </a>
                    <p style="margin-top: 20px; color: #888;">
                        If the button does not work, copy and paste the following link into your browser:<br>
                        <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" style="color: #007bff;">
                            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                        </a>
                    </p>
                    <p style="color: #555;">Thank you!</p>
                </div>
            `,
        };

        // Send the email
        const mailSent = await transport.sendMail(emailpoint);
        return mailSent;

    } catch (error: any) {
        throw new Error(error.message);
    }
};
