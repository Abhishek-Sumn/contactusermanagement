import User from "@/database/model/usermod";
import { connect } from "@/database/database.config";
import { NextResponse } from "next/server";
import crypto from "crypto"



export const POST = async (request: any) => {
    const { token } = await request.json();
    await connect();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        verifyToken: hashedToken,
        verifyTokenExpiry: { $gt: Date.now() }
    })


    if (!user) {
        return new NextResponse("Verification Token expired or invalid", { status: 400 })
    }

    return new NextResponse(JSON.stringify(user), { status: 200 })
}