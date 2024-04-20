import Tenant from "@/database/model/tenantmod";
import { connect } from "@/database/database.config";
import { NextResponse } from "next/server";

export async function GET (){
  await connect();
  let allTenant = {}

  try {
    allTenant = await Tenant.find();
    return  NextResponse.json({result : allTenant});
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};

export const POST = async (request) => {
  await connect();
  const requestData = await request.json();
  const org = new Tenant({
    name: requestData.name,
    description: requestData.description,
  });

  try {
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
  const { name, description,updatedName } = await request.json();

  const updatedTenant = await Tenant.findOne({ name });
  console.log(updatedTenant);

  try {
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