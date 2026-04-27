import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
 try {
 const { data, error } = await supabase
 .from('pricing_tiers')
 .select('*')
 .order('duration_months', { ascending: true });

 if (error) throw error;

 return NextResponse.json({ tiers: data });
 } catch (error) {
 console.error('Error fetching pricing tiers:', error);
 return NextResponse.json({ error: 'Failed to fetch pricing tiers' }, { status: 500 });
 }
}

export async function PATCH(req: NextRequest) {
 try {
 const { id, updates } = await req.json();

 const { data, error } = await supabase
 .from('pricing_tiers')
 .update(updates)
 .eq('id', id)
 .select()
 .single();

 if (error) throw error;

 return NextResponse.json({ tier: data });
 } catch (error) {
 console.error('Error updating pricing tier:', error);
 return NextResponse.json({ error: 'Failed to update pricing tier' }, { status: 500 });
 }
}
