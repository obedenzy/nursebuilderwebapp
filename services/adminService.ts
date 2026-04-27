import { supabase } from '../lib/supabase';

export const adminService = {
  async getStats() {
    // Total Users
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    // Total Generations
    const { data: profiles } = await supabase
      .from('profiles')
      .select('generations_count');

    const totalGenerations = profiles?.reduce((sum: number, p: any) => sum + (p.generations_count || 0), 0) || 0;

    // Active Members (Tier != 'Free')
    const { count: activeMembers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .neq('tier', 'Free');

    // Simple estimate
    const monthlyRevenue = activeMembers ? activeMembers * 40 : 0;

    return {
      stats: [
        { label: 'Total Practitioners', value: totalUsers?.toLocaleString() || '0', trend: '+12%', icon: 'Users', color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Monthly Revenue', value: `$${monthlyRevenue.toLocaleString()}`, trend: '+18%', icon: 'CreditCard', color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Total Generations', value: totalGenerations.toLocaleString(), trend: '+24%', icon: 'Zap', color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Active Members', value: activeMembers?.toLocaleString() || '0', trend: '+8%', icon: 'ShieldCheck', color: 'text-rose-600', bg: 'bg-rose-50' }
      ]
    };
  },

  async getAnnouncements() {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { announcements: data };
  },

  async createAnnouncement(announcement: any) {
    const { data, error } = await supabase
      .from('announcements')
      .insert([announcement])
      .select()
      .single();
    
    if (error) throw error;
    return { announcement: data };
  },

  async updateAnnouncement(id: string, updates: any) {
    const { data, error } = await supabase
      .from('announcements')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return { announcement: data };
  },

  async getTransactions() {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { transactions: data || [] };
  },

  async getUsers() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const users = data.map((profile: any) => ({
      id: profile.id,
      name: profile.name || (profile.first_name && profile.last_name ? `${profile.first_name} ${profile.last_name}` : null) || profile.email || 'Practitioner',
      email: profile.email,
      tier: profile.tier || 'Free',
      specialty: profile.specialty || 'General Nursing',
      joined: new Date(profile.created_at).toLocaleDateString(),
      sessions: profile.sessions || 0,
      status: profile.status || 'Active',
      generations: profile.generations_count || 0,
      expiry: profile.access_expiry_date ? new Date(profile.access_expiry_date).toLocaleDateString() : 'N/A'
    }));

    return { users };
  },

  async getPricing() {
    const { data, error } = await supabase
      .from('pricing_tiers')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return { tiers: data };
  },

  async updatePricing(id: string, updates: any) {
    const { data, error } = await supabase
      .from('pricing_tiers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return { tier: data };
  }
};
