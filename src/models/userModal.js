import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a username"], // Fix typo: `required` instead of `require`
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Please provide an email"], // Fix typo
            unique: true,
        },
        phone: {
            type: String,
            required: [true, "Please provide an Phone number"], // Fix typo
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"], // Fix typo
        },
        isVerified: {
            type: Boolean,
            default: false, // Change default to `false` for unverified users
        },
        isAdmin: {
            type: Boolean,
            default: false, // Change default to `false` for regular users
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExp: Date,
        validateToken: String,
        validateTokenExp: Date,
    },
    { timestamps: true } // Add timestamps if you want createdAt and updatedAt fields
);

// Fix the mongoose model definition
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
