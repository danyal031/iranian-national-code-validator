import { NextRequest, NextResponse } from "next/server";
import { validateBulkNationalCodes } from "@/lib/nationalCodeValidator";

export async function POST(request: NextRequest) {
  try {
    const { codes } = await request.json();

    if (!codes) {
      return NextResponse.json(
        {
          error: "کدهای ملی ارسال نشده است",
          errorEn: "No national codes provided",
        },
        { status: 400 }
      );
    }

    const result = validateBulkNationalCodes(codes);

    return NextResponse.json({
      success: true,
      data: result,
      message: "اعتبارسنجی با موفقیت انجام شد",
      messageEn: "Validation completed successfully",
    });
  } catch (error) {
    console.error("Validation API error:", error);

    return NextResponse.json(
      {
        error: "خطا در اعتبارسنجی",
        errorEn: "Validation error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "API اعتبارسنجی کد ملی ایران",
    messageEn: "Iranian National Code Validation API",
    version: "1.0.0",
    endpoints: {
      "/api/validate": {
        method: "POST",
        description: "اعتبارسنجی کدهای ملی",
        descriptionEn: "Validate national codes",
        parameters: {
          codes: "string | string[] - کدهای ملی برای اعتبارسنجی",
        },
      },
    },
    examples: {
      singleCode: {
        method: "POST",
        body: {
          codes: "0123456789",
        },
      },
      multipleCodes: {
        method: "POST",
        body: {
          codes: ["0123456789", "9876543210", "1234567890"],
        },
      },
      bulkString: {
        method: "POST",
        body: {
          codes: "0123456789\n9876543210\n1234567890",
        },
      },
    },
  });
}
