import { NextResponse } from"next/server";
import { db } from"@/lib/db";
import { supabase } from"@/lib/supabase";
import { fetchWithRetry } from"@/lib/utils";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
 try {
 const { searchParams } = new URL(req.url);
 let email = searchParams.get("email");
 const type = searchParams.get("type");

 if (email) {
 email = email.trim().toLowerCase();
 }

 if (type === 'login-session') {
 if (!email) return NextResponse.json({ error:"Email is required" }, { status: 400 });
 const user = await db.getUser(email);
 if (!user) return NextResponse.json({ error:"User not found" }, { status: 404 });
 
 // Check for access expiry
 if (user.access_expiry_date) {
 const expiryDate = new Date(user.access_expiry_date);
 if (expiryDate < new Date()) {
 console.log(`[AUTH] Access expired for ${email}. Resetting to Free tier.`);
 const updatedUser = await db.updateProfile(email, { 
 tier: 'Free', 
 sessions: 0,
 accessExpiryDate: null 
 });
 return NextResponse.json({ user: updatedUser });
 }
 }
 
 return NextResponse.json({ user });
 }

 return NextResponse.json({ error:"Invalid request" }, { status: 400 });
 } catch (error: any) {
 console.error("[AUTH API GET] Error:", error);
 return NextResponse.json({ 
 error:"Internal server error during session check", 
 details: error.message || String(error) 
 }, { status: 500 });
 }
}

export async function POST(req: Request) {
 try {
 const body = await req.json();
 let { email, firstName, lastName, career, customCareer, type, token, authView, agreedToTerms } = body;

 if (email) {
 email = email.trim().toLowerCase();
 }

 if (type === 'logout') {
 await supabase.auth.signOut();
 return NextResponse.json({ success: true });
 }

 if (type === 'send-otp') {
 if (!email) return NextResponse.json({ error:"Email is required" }, { status: 400 });
 
 // Server-side validation for signup
 console.log(`Processing send-otp for email: ${email}, authView: ${authView}`);
 if (authView === 'signup') {
 if (!firstName || !lastName || !career) {
 return NextResponse.json({ error:"All fields are required for signup" }, { status: 400 });
 }
 if (!agreedToTerms) {
 return NextResponse.json({ error:"You must agree to the Terms of Service and Privacy Policy" }, { status: 400 });
 }
 
 // Check if user already exists
 const existingUser = await db.getUser(email);
 if (existingUser) {
 return NextResponse.json({ error:"An account with this email already exists. Please login instead." }, { status: 400 });
 }
 } else if (authView === 'login') {
 // Check if user exists for login
 const existingUser = await db.getUser(email);
 if (!existingUser) {
 const allUsers = await db.getAllUserEmails();
 console.log(`Login check failed for email: ${email}. Users in DB: ${allUsers.join(', ')}`);
 return NextResponse.json({ 
 error:"No account found with this email. Please signup first.",
 debug: { 
 email, 
 normalizedEmail: email.trim().toLowerCase(),
 usersInDb: allUsers
 }
 }, { status: 404 });
 }
 }

 const webhookUrl = process.env.EMAIL_WEBHOOK_URL || 'https://n8n.leadluxedigital.com/webhook/send-email';
 if (!webhookUrl) {
 console.error("EMAIL_WEBHOOK_URL configuration is missing.");
 return NextResponse.json({ 
 error:"Email service not configured. Please set EMAIL_WEBHOOK_URL in your environment variables." 
 }, { status: 500 });
 }
 
 // Generate 6-digit OTP
 const otp = Math.floor(100000 + Math.random() * 900000).toString();
 
 // Store in DB
 await db.createOTP(email, otp);

 // Send via Webhook
 try {
 const payload = {
 toEmail: email.trim(),
 messageBody: otp,
 subject:"Your EquityBridge Login Code"
 };

 await fetchWithRetry(webhookUrl, {
 method: 'POST',
 headers: {
 'Content-Type': 'application/json',
 },
 body: JSON.stringify(payload),
 }, 3, 12000); // 3 retries, 12s timeout

 } catch (webhookError) {
 console.error("Webhook email error:", webhookError);
 if (process.env.NODE_ENV === 'development') {
 console.log(`[DEV] OTP for ${email}: ${otp}`);
 } else {
 return NextResponse.json({ error:"Failed to send verification email. Please try again later." }, { status: 500 });
 }
 }

 return NextResponse.json({ success: true });
 }

 if (type === 'verify-otp') {
 if (!email || !token) {
 return NextResponse.json({ error:"Email and token are required" }, { status: 400 });
 }

 console.log(`[AUTH] Verifying OTP for ${email}, token: ${token}`);
 
 // Verify custom OTP
 const isValid = await db.verifyOTP(email, token);

 if (!isValid) {
 console.warn(`[AUTH] Invalid or expired OTP for ${email}`);
 return NextResponse.json({ error:"Invalid or expired access token" }, { status: 401 });
 }

 // Handle user session/profile
 const careerToSave = career === 'Other' ? customCareer : career;
 console.log(`[AUTH] OTP Verified. Handling session for ${email}...`);
 
 try {
 let user = await handleUserSession({ email, firstName, lastName, career: careerToSave });
 
 // Check for access expiry on login
 if (user && user.access_expiry_date) {
 const expiryDate = new Date(user.access_expiry_date);
 if (expiryDate < new Date()) {
 console.log(`[AUTH] Access expired for ${email} on login. Resetting to Free tier.`);
 user = await db.updateProfile(email, { 
 tier: 'Free', 
 sessions: 0,
 accessExpiryDate: null 
 });
 }
 }

 console.log(`[AUTH] Session handled successfully for ${email}. User Tier: ${user?.tier}`);
 return NextResponse.json({ user });
 } catch (err: any) {
 console.error(`[AUTH] Error handling session for ${email}:`, err);
 return NextResponse.json({ error: `Session error: ${err.message || 'Unknown error'}` }, { status: 500 });
 }
 }

 return NextResponse.json({ error:"Invalid request type" }, { status: 400 });
 } catch (error: any) {
 console.error("Auth error:", error);
 return NextResponse.json({ 
 error:"Internal server error", 
 details: error.message || String(error) 
 }, { status: 500 });
 }
}

async function handleUserSession(metadata: any) {
 const { email, firstName, lastName, career } = metadata;
 
 // Check if profile exists
 let user = await db.getUser(email);
 
 if (!user) {
 // Create profile if it doesn't exist
 user = await db.createUser({ 
 email, 
 firstName: firstName || 'Nurse', 
 lastName: lastName || 'User', 
 career: career || 'Staff Nurse',
 name: firstName && lastName ? `${firstName} ${lastName}` : 'Nurse User'
 });
 }
 
 return user;
}
