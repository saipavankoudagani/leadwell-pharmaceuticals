import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Inquiry from "@/lib/models/Inquiry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();

    const fullName = body.fullName?.trim();
    const hospitalName = body.hospitalName?.trim() || "";
    const email = body.email?.trim().toLowerCase();
    const details = body.details?.trim();

    if (!fullName || !email || !details) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name, email and inquiry details are required.",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const newInquiry = await Inquiry.create({
      fullName,
      hospitalName,
      email,
      details,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry submitted successfully.",
        data: newInquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Inquiry Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send inquiry.",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : undefined,
      },
      { status: 500 }
    );
  }
}