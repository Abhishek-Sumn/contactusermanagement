import { connect } from "../../../../database/database.config";
import User from "../../../../database/model/usermod";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Establish database connection
connect();

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const { email, password } = await request.json();
        

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        // Create token data
        const tokenData = {
            id: user._id.toString(), // Convert ObjectId to string if needed
            username: user.username,
            email: user.email
        };

        // Create JWT token
        const token = jwt.sign(tokenData, process.env.SECURE_TOKEN!, { expiresIn: "1d" });

        // Create response with success message and set token cookie
        const response = NextResponse.json({
            message: "Login successful",
            success: true
        });
        
        //cookie saved - httpOnly (ensures security) 
        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
