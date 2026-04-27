import { NextResponse } from"next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
 return NextResponse.json({
 hasKey: !!process.env.NEXT_PUBLIC_GEMINI_API_KEY,
 keyPrefix: process.env.NEXT_PUBLIC_GEMINI_API_KEY ? process.env.NEXT_PUBLIC_GEMINI_API_KEY.substring(0, 5) : null,
 });
}
