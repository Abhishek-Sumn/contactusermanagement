import { connect } from "../../../../database/database.config";
import User from "../../../../database/model/usermod";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect(); // Ensure this establishes the database connection

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { firstname, lastname, email, password } = reqBody;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hashing password using bcryptjs
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
      
        // Create new user instance
        const newUser = new User({
            firstname,
            lastname,
            email,
            role:'user',
            password: hashedPassword
        });

        // Save the new user
        const savedUser = await newUser.save();
        //console.log("User Created Successfully:", savedUser);

        // Respond with success message and user details
        return NextResponse.json({
            message: "User Created Successfully",
            success: true,
            savedUser
        });

    } catch (error: any) {
        // Handle any errors
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
