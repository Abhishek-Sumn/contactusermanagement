import User from "@/database/model/usermod";
import { connect } from "@/database/database.config";
import { NextResponse } from "next/server";

export async function GET() {
  await connect();
  let allUsers = {};

  try {
    allUsers = await User.find();
    return NextResponse.json({ result: allUsers });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}

export const DELETE = async (request) => {
  await connect();
  try {
    const { getid } = await request.json();

    const deletedUser = await User.findOneAndDelete({ email: getid });

    if (!deletedUser) {
      return new NextResponse({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "User deleted successfully",
        success: true,
        deletedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
