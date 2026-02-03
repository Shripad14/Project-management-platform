import mongoose, { Schema } from "mongoose";

import 'dotenv/config';

import jwt from "jsonwebtoken";

import crypto, { createHmac } from "node:crypto";

import bcrypt from "bcrypt";

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
    }, {
        timestamps: true
    }
);

// Hash password in DB before saving it. 
userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

// Check if password entered is correct.
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate jwt access token for user.
userSchema.methods.generateAccessToken = async function() {
    return jwt
    .sign(
        {
            _id: this._id,
            email: this.email,
                    username: this.username,
                },
                
                process.env.ACCESS_TOKEN_SECRET,
                
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
            );
};

// Generate jwt refresh token for user.
userSchema.methods.generateRefreshtoken = async function() {
    return jwt
        .sign(
            {
                _id: this._id
            },

            process.env.REFRESH_TOKEN_SECRET,

            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );
};

// Generate a temporary token
userSchema.methods.generateTemporaryToken = async function() {
    const unHashedToken = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto
                    .createHash("sha256")
                    .update(unHashedToken)
                    .digest("hex")
    
    const tokenExpiry = Date.now() + (20*60*1000)   //20mins

    return { unHashedToken, hashedToken, tokenExpiry };
} 


export const User = mongoose.model("User", userSchema);
