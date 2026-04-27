import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
 try {
 const { data, error } = await supabase
 .from('profiles')
 .select('*')
 .order('created_at', { ascending: false });

 if (error) throw error;

 // Map database fields to UI fields if necessary
 const users = data.map((profile: any) => ({
 id: profile.id,
 name: profile.name || (profile.first_name && profile.last_name ? `${profile.first_name} ${profile.last_name}` : null) || profile.email || 'Practitioner',
 email: profile.email,
 tier: profile.tier || 'Free',
 specialty: profile.specialty || 'General Nursing',
 joined: new Date(profile.created_at).toLocaleDateString(),
 sessions: profile.sessions_count || 0,
 status: profile.is_active !== false ? 'Active' : 'Inactivated',
 generations: profile.generations_count || 0,
 expiry: profile.access_expiry_date ? new Date(profile.access_expiry_date).toLocaleDateString() : 'N/A'
 }));

 return NextResponse.json({ users });
 } catch (error) {
 console.error('Error fetching admin users:', error);
 return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
 }
}

export async function PATCH(req: NextRequest) {
 try {
 const { id, updates } = await req.json();

 const { data, error } = await supabase
 .from('profiles')
 .update(updates)
 .eq('id', id)
 .select()
 .single();

 if (error) throw error;

 return NextResponse.json({ user: data });
 } catch (error) {
 console.error('Error updating user:', error);
 return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
 }
}
