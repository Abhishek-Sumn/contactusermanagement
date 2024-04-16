
import User from "@/database/model/usermod";
import { connect } from "@/database/database.config";
import { NextResponse } from "next/server";



export const POST = async (request: any) => {
    const { email, password } = await request.json();
    await connect();

    const resgisteredUser = await User.findOne({ email });

    resgisteredUser.isVerified = true;
    resgisteredUser.verifyToken = undefined;
    resgisteredUser.verifyTokenExpiry = undefined;


    try {
        await resgisteredUser.save();
        return new NextResponse("User Verified", { status: 200 })

    } catch (error: any) {
        return new NextResponse(error, { status: 500 })
    }

}