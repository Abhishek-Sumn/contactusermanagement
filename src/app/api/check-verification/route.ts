import User from "@/database/model/usermod";
import { connect } from "@/database/database.config";
import { NextResponse } from "next/server";

//using email to find user then checking if user is verified or not

export const POST = async (request: any) => {
    const { email } = await request.json();
    await connect();

    const user = await User.findOne({email })

    if (user?.isVerified) {
        return new NextResponse("User  verified", { status: 200 })
    }

    return new NextResponse("User not verified", { status: 400 })
}