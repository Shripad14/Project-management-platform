import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        avatar: {
            type: {
                url: String,
                localPath: String,
            },
            default: {
                url: `https://placehold.co/200x200`,
                localPath: ""
            },
            username: {
                type: String,
                required: true,
                lowercase: true,
                unique: true,
                index: true,
                trim: true,
            },
            email: {
                type: String,
                unique: true,
                lowercase: true,
                trim: true,
                required: true,
            },
            fullname: {
                type: String,
                trim: true,
            },
            password: {
                type: String,
                required: [true, "Password is required"]
            },
            isEmailVerififed: {
                type: Boolean,
                default: false
            },
            refreshToken: {
                type: String
            },
            forgotPaswordToken: {
                type: String
            },
            forgotPasswordExpiry: {
                type: Date
            },
            emailVerificationToken: {
                type: String
            },
            emailVerificationExpiry: {
                type: Date
            }
        }
    }, {
        timestamps: true
    }
);



export const User = mongoose.model("User", userSchema);
