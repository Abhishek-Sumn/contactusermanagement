import bcryptjs from 'bcryptjs';
import User from "@/database/model/usermod";
import { connect } from "@/database/database.config";
import { NextResponse } from "next/server";

//get email and password from frontend 
//Find user
//create hash of password update on DB and reset token

export const POST = async (request: any) => {
    const { email, password } = await request.json();
    await connect();

    
    const resgisteredUser = await User.findOne({ email });

    const hashedPassword = await bcryptjs.hash(password, 5);
    resgisteredUser.password = hashedPassword;
    resgisteredUser.resetToken = undefined;
    resgisteredUser.resetTokenExpiry = undefined;


    try {
        await resgisteredUser.save();
        return new NextResponse("Password Updated", { status: 200 })

    } catch (error: any) {
        return new NextResponse(error, { status: 500 })
    }

}