import Tenant from "@/database/model/tenantmod";
import { connect } from "@/database/database.config";
import { NextResponse } from "next/server";

//get all the tenant and perform CRUD

export async function GET() {
  await connect();
  let allTenant = {};

  try {
    allTenant = await Tenant.find();
    return NextResponse.json({ result: allTenant });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}

export const POST = async (request) => {
  await connect();
  try {
    const requestData = await request.json();
    const org = new Tenant({
      name: requestData.name,
      description: requestData.description,
    });

    const savedTenant = await org.save();
    return NextResponse.json({
      message: "Tenant added",
      success: true,
      savedTenant,
    });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};

export const PUT = async (request) => {
  await connect();
  try {
    const { name, description, updatedName } = await request.json();

    const updatedTenant = await Tenant.findOne({ name });

    if (!updatedTenant) {
      return new NextResponse({ message: "Tenant not found" }, { status: 404 });
    }
    updatedTenant.name = updatedName;
    updatedTenant.description = description;

    updatedTenant.save();
    return new NextResponse(updatedTenant, { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};

export const DELETE = async (request) => {
  await connect();
  try {
    const { getid } = await request.json();

    const deletedTenant = await Tenant.findOneAndDelete({ name: getid });

    if (!deletedTenant) {
      return new NextResponse({ message: "Tenant not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Tenant deleted successfully",
        success: true,
        deletedTenant,
      },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
