import { NextResponse } from"next/server";
import { db } from"@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
 try {
 const { searchParams } = new URL(req.url);
 let email = searchParams.get("email");

 if (!email) {
 return NextResponse.json({ error:"Email is required" }, { status: 400 });
 }

 email = email.trim().toLowerCase();
 const stats = await db.getStats(email);
 if (!stats) {
 return NextResponse.json({ error:"Stats not found" }, { status: 404 });
 }

 return NextResponse.json({ stats });
 } catch (error: any) {
 console.error("[STATS API GET] Error:", error);
 return NextResponse.json({ 
 error:"Internal server error fetching stats", 
 details: error.message || String(error) 
 }, { status: 500 });
 }
}

export async function PATCH(req: Request) {
 try {
 let { email, stats } = await req.json();
 if (!email) return NextResponse.json({ error:"Email is required" }, { status: 400 });

 email = email.trim().toLowerCase();
 const updated = await db.updateStats(email, stats);
 return NextResponse.json({ stats: updated });
 } catch (error) {
 return NextResponse.json({ error:"Internal server error" }, { status: 500 });
 }
}
