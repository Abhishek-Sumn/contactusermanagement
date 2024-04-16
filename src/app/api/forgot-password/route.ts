import User from "@/database/model/usermod";
import { connect } from "@/database/database.config";
import { NextResponse } from "next/server";
import crypto from "crypto"
import nodemailer from "nodemailer"

//credentials for nodemailer
const nodemail = process.env.EMAIL
const nodepassword = process.env.EMAIL_PASS

export const POST = async (request: any) => {
    const { email } = await request.json();
    await connect();

    const existinguser = await User.findOne({ email });
    if (!existinguser) {
        return new NextResponse("Email not registered", { status: 400 })
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const passwordresetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const passWordResetExpiry = Date.now() + 3600000;

    existinguser.resetToken = passwordresetToken;
    existinguser.resetTokenExpiry = passWordResetExpiry;
    const resetUrl = `localhost:3000/reset-password/${resetToken}`;

    //console.log(resetUrl);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: nodemail,
            pass: nodepassword
        }
    })

    const mailOptions = {
        from: nodemail,
        to: email
    }

    const sendmail = async () => {
        try {
            await transporter.sendMail({
                ...mailOptions,
                subject: "Reset Password",
                text: resetUrl,
                html: resetUrl
            })
            return new NextResponse("Email Sent", { status: 200 })

        } catch (error) {
            existinguser.resetToken = undefined;
            existinguser.resetTokenExpiry = undefined;
            console.log(error)
            return new NextResponse("Something went wrong", { status: 401 })
        }
    }
    sendmail();

    try {
        await existinguser.save();
        return new NextResponse("Reset email sent", { status: 200 })
    } catch (error: any) {
        return new NextResponse(error, { status: 500 })
    }

}

