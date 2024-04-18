import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [false, "Provide Your Name please"],
        unique: false
    },
    lastname: {
        type: String,
        required: [false, "Provide Your Name please"],
        unique: false
    },
    email: {
        type: String,
        required: [true, "Provide Your Email please"],
        unique: true,
    },
    password: {
        type: String,
        required: [false, "Provide Your Password please"],
    },
    isVerified: {
        type: Boolean,
        default: false,

    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    resetToken: {
        type: String,
        required: false,
    },
    resetTokenExpiry: {
        type: Date,
        required: false,
    },
    role: { type: String, enum: ['admin', 'user','manager'], default: 'user' },
    verifyToken: { type: String },
    verifyTokenExpiry: { type: Date }

})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;