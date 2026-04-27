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
 const plans = await db.getPlans(email);
 return NextResponse.json({ plans });
 } catch (error: any) {
 console.error("[PLANS API GET] Error:", error);
 return NextResponse.json({ 
 error:"Internal server error fetching plans", 
 details: error.message || String(error) 
 }, { status: 500 });
 }
}

export async function POST(req: Request) {
 try {
 let { email, plan } = await req.json();
 if (!email || !plan) {
 return NextResponse.json({ error:"Email and plan are required" }, { status: 400 });
 }

 email = email.trim().toLowerCase();
 const savedPlan = await db.addPlan(email, plan);
 return NextResponse.json({ plan: savedPlan });
 } catch (error) {
 console.error("Error saving plan:", error);
 return NextResponse.json({ error:"Internal server error" }, { status: 500 });
 }
}

export async function PATCH(req: Request) {
 try {
 let { email, planId, updates } = await req.json();
 if (!email || !planId) {
 return NextResponse.json({ error:"Email and planId are required" }, { status: 400 });
 }

 email = email.trim().toLowerCase();
 const updatedPlan = await db.updatePlan(email, planId, updates);
 return NextResponse.json({ plan: updatedPlan });
 } catch (error) {
 console.error("Error updating plan:", error);
 return NextResponse.json({ error:"Internal server error" }, { status: 500 });
 }
}

export async function DELETE(req: Request) {
 const { searchParams } = new URL(req.url);
 let email = searchParams.get("email");
 const planId = searchParams.get("planId");

 if (!email || !planId) {
 return NextResponse.json({ error:"Email and planId are required" }, { status: 400 });
 }

 email = email.trim().toLowerCase();
 try {
 await db.deletePlan(email, planId);
 return NextResponse.json({ success: true });
 } catch (error) {
 console.error("Error deleting plan:", error);
 return NextResponse.json({ error:"Internal server error" }, { status: 500 });
 }
}
