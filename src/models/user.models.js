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

// Hash password in DB before saving it. 
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export const User = mongoose.model("User", userSchema);
