import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
 try {
 // Total Users
 const { count: totalUsers, error: usersError } = await supabase
 .from('profiles')
 .select('*', { count: 'exact', head: true });

 if (usersError) throw usersError;

 // Total Generations
 const { data: profiles, error: genError } = await supabase
 .from('profiles')
 .select('generations_count');

 if (genError) throw genError;

 const totalGenerations = profiles.reduce((sum: number, p: any) => sum + (p.generations_count || 0), 0);

 // Active Mindigos (Tier != 'Free')
 const { count: activeMindigos, error: activeError } = await supabase
 .from('profiles')
 .select('*', { count: 'exact', head: true })
 .neq('tier', 'Free');

 if (activeError) throw activeError;

 // Mock revenue for now as we don't have a real transactions table yet
 const monthlyRevenue = activeMindigos ? activeMindigos * 40 : 0; // Simple estimate

 return NextResponse.json({
 stats: [
 { label: 'Total Practitioners', value: totalUsers?.toLocaleString() || '0', trend: '+12%', icon: 'Users', color: 'text-indigo-600', bg: 'bg-indigo-50' },
 { label: 'Monthly Revenue', value: `$${monthlyRevenue.toLocaleString()}`, trend: '+18%', icon: 'CreditCard', color: 'text-indigo', bg: 'bg-indigo-50' },
 { label: 'Total Generations', value: totalGenerations.toLocaleString(), trend: '+24%', icon: 'Zap', color: 'text-amber-600', bg: 'bg-amber-50' },
 { label: 'Active Mindigos', value: activeMindigos?.toLocaleString() || '0', trend: '+8%', icon: 'ShieldCheck', color: 'text-rose-600', bg: 'bg-rose-50' }
 ]
 });
 } catch (error) {
 console.error('Error fetching admin stats:', error);
 return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
 }
}
