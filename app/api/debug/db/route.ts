import { NextResponse } from"next/server";
import { db } from"@/lib/db";
import { supabase } from"@/lib/supabase";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
 const { searchParams } = new URL(req.url);
 const action = searchParams.get('action');

 try {
 if (action === 'count') {
 const { count, error, status, statusText } = await supabase
 .from('profiles')
 .select('*', { count: 'exact', head: true });
 
 return NextResponse.json({ count, error, status, statusText });
 }

 if (action === 'list') {
 const { data, error, status, statusText } = await supabase
 .from('profiles')
 .select('email, tier, created_at')
 .limit(10);
 
 return NextResponse.json({ data, error, status, statusText });
 }

 if (action === 'test-insert') {
 const testEmail = `test-${Date.now()}@example.com`;
 const { data, error, status, statusText } = await supabase
 .from('profiles')
 .insert([{
 email: testEmail,
 name: 'Test User',
 first_name: 'Test',
 last_name: 'User',
 career: 'Tester',
 role: 'USER',
 status: 'Active',
 tier: 'Free',
 sessions: 1
 }])
 .select();
 
 return NextResponse.json({ testEmail, data, error, status, statusText });
 }

 return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
 } catch (err: any) {
 return NextResponse.json({ error: err.message }, { status: 500 });
 }
}
