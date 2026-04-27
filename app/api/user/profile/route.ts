import { NextResponse } from"next/server";
import { db } from"@/lib/db";

export async function PATCH(req: Request) {
 try {
 let { email, updates } = await req.json();
 if (!email) return NextResponse.json({ error:"Email is required" }, { status: 400 });

 email = email.trim().toLowerCase();
 const updated = await db.updateProfile(email, updates);
 return NextResponse.json({ profile: updated });
 } catch (error) {
 console.error('Error in profile update API:', error);
 return NextResponse.json({ error:"Internal server error" }, { status: 500 });
 }
}

export async function DELETE(req: Request) {
 try {
 const { email } = await req.json();
 if (!email) return NextResponse.json({ error:"Email is required" }, { status: 400 });

 const success = await db.deleteUser(email);
 return NextResponse.json({ success });
 } catch (error) {
 console.error('Error in profile deletion API:', error);
 return NextResponse.json({ error:"Internal server error" }, { status: 500 });
 }
}
