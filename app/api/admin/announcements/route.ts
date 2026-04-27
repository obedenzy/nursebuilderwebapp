import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
 try {
 const { data, error } = await supabase
 .from('announcements')
 .select('*')
 .order('created_at', { ascending: false });

 if (error) {
 // If table doesn't exist, return mock
 return NextResponse.json({ 
 announcements: [
 { id: '1', title: 'New Pricing Tiers Live!', content: 'We have introduced 3 Months and 1 Year access plans.', active: true, created_at: new Date().toISOString() },
 { id: '2', title: 'System Maintenance', content: 'Scheduled maintenance on Sunday at 2 AM UTC.', active: false, created_at: new Date().toISOString() }
 ] 
 });
 }

 return NextResponse.json({ announcements: data });
 } catch (error) {
 console.error('Error fetching announcements:', error);
 return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 });
 }
}

export async function POST(req: NextRequest) {
 try {
 const { title, content, active } = await req.json();

 const { data, error } = await supabase
 .from('announcements')
 .insert([{ title, content, active }])
 .select()
 .single();

 if (error) throw error;

 return NextResponse.json({ announcement: data });
 } catch (error) {
 console.error('Error creating announcement:', error);
 return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 });
 }
}

export async function PATCH(req: NextRequest) {
 try {
 const { id, updates } = await req.json();

 const { data, error } = await supabase
 .from('announcements')
 .update(updates)
 .eq('id', id)
 .select()
 .single();

 if (error) throw error;

 return NextResponse.json({ announcement: data });
 } catch (error) {
 console.error('Error updating announcement:', error);
 return NextResponse.json({ error: 'Failed to update announcement' }, { status: 500 });
 }
}
