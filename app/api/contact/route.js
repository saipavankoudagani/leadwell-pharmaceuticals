import { NextResponse } from "next/server";

import Inquiry from "@/lib/models/Inquiry";
import dbConnect from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE_PATTERN =
  /^[0-9+\-()\s]{7,20}$/;

function cleanText(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);
}

function cleanMultilineText(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .replace(/\r\n/g, "\n")
    .slice(0, maxLength);
}

export async function POST(request) {
  try {
    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * Honeypot spam protection.
     *
     * Real users cannot see this field. Automated bots often fill it.
     * We return a normal success response so bots do not learn that
     * their submission was rejected.
     */
    const website = cleanText(body?.website, 200);

    if (website) {
      return NextResponse.json(
        {
          success: true,
          message: "Inquiry submitted successfully.",
        },
        {
          status: 201,
        },
      );
    }

    const fullName = cleanText(body?.fullName, 100);

    const hospitalName = cleanText(
      body?.hospitalName,
      150,
    );

    const email = cleanText(body?.email, 150)
      .toLowerCase();

    const phone = cleanText(body?.phone, 20);

    const product = cleanText(body?.product, 120);

    const details = cleanMultilineText(
      body?.details,
      2000,
    );

    if (!fullName || !email || !details) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Full name, email address and enquiry details are required.",
        },
        {
          status: 400,
        },
      );
    }

    if (fullName.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid full name.",
        },
        {
          status: 400,
        },
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      phone &&
      !PHONE_PATTERN.test(phone)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid phone number.",
        },
        {
          status: 400,
        },
      );
    }

    if (details.length < 10) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide at least 10 characters in the enquiry details.",
        },
        {
          status: 400,
        },
      );
    }

    await dbConnect();

    const inquiry = await Inquiry.create({
      fullName,
      hospitalName,
      email,
      phone,
      product,
      details,

      source: "website-contact-form",

      status: "new",
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you. Your enquiry has been submitted successfully.",

        /*
         * Do not return the complete database document.
         * Only return a safe public reference.
         */
        inquiryId: inquiry._id.toString(),
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Contact inquiry error:", {
      name: error?.name,
      message: error?.message,
    });

    if (
      error?.name === "ValidationError"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Some submitted information is invalid. Please check the form and try again.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      error?.name === "MongoServerSelectionError" ||
      error?.name === "MongooseServerSelectionError"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "The enquiry service is temporarily unavailable. Please try again shortly.",
        },
        {
          status: 503,
        },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to submit your enquiry at this time. Please try again.",
        ...(process.env.NODE_ENV ===
          "development" && {
          error:
            error instanceof Error
              ? error.message
              : "Unknown server error",
        }),
      },
      {
        status: 500,
      },
    );
  }
}

/*
 * Reject unsupported methods clearly.
 */
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message:
        "This endpoint accepts POST requests only.",
    },
    {
      status: 405,
      headers: {
        Allow: "POST",
      },
    },
  );
}