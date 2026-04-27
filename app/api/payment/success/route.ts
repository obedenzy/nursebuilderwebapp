import { NextResponse } from"next/server";
import { getStripe } from"@/lib/stripe";
import { db } from"@/lib/db";
import { fetchWithRetry } from"@/lib/utils";

export async function POST(req: Request) {
 try {
 const { sessionId, email } = await req.json();

 if (!sessionId || !email) {
 return NextResponse.json({ error:"Missing required fields" }, { status: 400 });
 }

 const stripe = getStripe();
 const session = await stripe.checkout.sessions.retrieve(sessionId, {
 expand: ["line_items"],
 });

 if (session.payment_status !== 'paid') {
 return NextResponse.json({ error:"Payment not completed" }, { status: 400 });
 }

 const customerEmail = session.metadata?.userEmail || session.customer_details?.email;
 const planId = session.metadata?.planId || (session.line_items?.data[0]?.description?.includes("3 Months") ?"3_months" :"1_year");
 const planName = session.metadata?.planName || session.line_items?.data[0]?.description ||"3 Months Access";

 console.log(`[PAYMENT SUCCESS] Verifying: Stripe Email: ${customerEmail}, App Email: ${email}, Plan: ${planName}, PlanId: ${planId}`);

 if (customerEmail && customerEmail.trim().toLowerCase() === email.trim().toLowerCase()) {
 const normalizedEmail = customerEmail.trim().toLowerCase();
 
 // Determine session count and expiry based on plan
 let sessionsCount = 0;
 let expiryDate = new Date();
 
 if (planId ==="3_months" || planName.includes("3 Months")) {
 sessionsCount = 250;
 expiryDate.setMonth(expiryDate.getMonth() + 3);
 } else if (planId ==="1_year" || planName.includes("1 Year") || planName.includes("Shield") || planName.includes("Lifetime")) {
 sessionsCount = 9999; // Representing unlimited
 expiryDate.setFullYear(expiryDate.getFullYear() + 1);
 }

 console.log(`[PAYMENT SUCCESS] Updating profile for ${normalizedEmail} with planId ${planId}, Expiry: ${expiryDate.toISOString()}`);
 
 const updatedProfile = await db.updateProfile(normalizedEmail, { 
 tier: planId,
 sessions: sessionsCount,
 accessExpiryDate: expiryDate.toISOString()
 });

 if (!updatedProfile) {
 console.error(`[PAYMENT SUCCESS] Profile update failed for ${normalizedEmail}`);
 return NextResponse.json({ error:"Profile update failed" }, { status: 500 });
 }

 // Send confirmation email via n8n webhook if available
 const webhookUrl = process.env.EMAIL_WEBHOOK_URL ||"https://n8n.leadluxedigital.com/webhook/send-email";
 try {
 await fetchWithRetry(webhookUrl, {
 method:"POST",
 headers: {"Content-Type":"application/json" },
 body: JSON.stringify({
 toEmail: normalizedEmail,
 subject:"Payment Confirmation - NurseBuilder",
 messageBody: `Thank you for your purchase of ${planName}! Your Professional Resilience Track is now active.`,
 type:"payment_confirmation"
 })
 }, 3, 12000);
 } catch (emailError) {
 console.error("[PAYMENT SUCCESS] Failed to send confirmation email:", emailError);
 }

 return NextResponse.json({ success: true, profile: updatedProfile });
 } else {
 console.error(`[PAYMENT SUCCESS] Email mismatch: Stripe: ${customerEmail}, App: ${email}`);
 return NextResponse.json({ error: `Email mismatch: Stripe: ${customerEmail}, App: ${email}` }, { status: 400 });
 }
 } catch (error: any) {
 console.error("Payment success verification error:", error);
 return NextResponse.json({ error: error.message ||"Internal server error" }, { status: 500 });
 }
}
