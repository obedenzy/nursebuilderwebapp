import { NextResponse } from"next/server";
import { getStripe } from"@/lib/stripe";
import { db } from"@/lib/db";

export async function POST(req: Request) {
 try {
 const { email, planId, planName, price, period } = await req.json();

 if (!email || !planId || !planName || !price) {
 return NextResponse.json({ error:"Missing required fields" }, { status: 400 });
 }

 const user = await db.getUser(email);
 if (user) {
 // Prevent double paying for the same plan
 if (user.tier === planId) {
 return NextResponse.json({ error: `You already have an active ${planName} plan.` }, { status: 400 });
 }

 // Prevent downgrading from 1 Year to 3 Months
 if (user.tier === '1_year' && planId === '3_months') {
 return NextResponse.json({ error:"You cannot downgrade from 1 Year Access to 3 Months Access." }, { status: 400 });
 }
 }

 const stripe = getStripe();

 // In a real app, you would use price IDs from your Stripe dashboard.
 // For this demo, we'll use ad-hoc prices.
 const origin = process.env.APP_URL || req.headers.get('origin') || 'http://localhost:3000';
 console.log('Stripe Checkout Origin:', origin);
 const return_url = `${origin.replace(/\/$/, '')}/?session_id={CHECKOUT_SESSION_ID}&success=true`;

 const session = await stripe.checkout.sessions.create({
 ui_mode: 'embedded',
 payment_method_types: ['card'],
 line_items: [
 {
 price_data: {
 currency: 'usd',
 product_data: {
 name: planName,
 description: `NurseBuilder ${planName}`,
 },
 unit_amount: Math.round(parseFloat(price.replace('$', '')) * 100),
 },
 quantity: 1,
 },
 ],
 mode: 'payment',
 customer_email: email,
 metadata: { planId, planName, userEmail: email },
 return_url,
 });

 return NextResponse.json({ clientSecret: session.client_secret });
 } catch (error: any) {
 console.error("Stripe session error:", error);
 return NextResponse.json({ error: error.message ||"Internal server error" }, { status: 500 });
 }
}
