import { UserStats, BoundaryPlan, BundleType, PleaserPhase } from "../types";
import { supabase } from "./supabase";

export const DEFAULT_CAREERS = [
  'Staff Nurse (Med-Surg)', 'Intensive Care (ICU)', 'Emergency Department (ED)',
  'Operating Room (OR)', 'Labor & Delivery (L&D)', 'Pediatrics', 'Oncology',
  'Psychiatric/Mental Health', 'Community/Public Health', 'Nurse Practitioner (NP)',
  'CRNA', 'Nurse Educator', 'Nurse Leader', 'Other'
];

export const DEFAULT_BUNDLES = ['Nurse Boundaries Builder', 'Nurse No More Pleaser', 'Toxic Unit Shield'];

export const DEFAULT_BUNDLE_ISSUES: Record<string, string[]> = {
  'Nurse Boundaries Builder': [
    'Mandatory Overtime & Extra Shifts',
    'Non-Nursing Tasks (Scope Creep)',
    'Aggressive or Demanding Patients',
    'Calls/Texts During Off-Hours',
    'Unpaid Charting After Shift',
    'Floating to Unfamiliar Units',
    'Interrupted Breaks & Lunch Periods',
    'Nurse-to-Patient Ratio Concerns',
    'Family Members Refusing to Leave',
    'Inadequate PPE or Equipment Support'
  ],
  'Nurse No More Pleaser': [
    'Compulsive Helping with Coworker Charts',
    'Unable to Say \'No\' to Shift Swaps',
    'Apologizing to Rude Physicians',
    'Over-accommodating Demanding Families',
    'Swallowing Conflict with Management',
    'Taking the \'Heavy\' Assignment to Be Nice',
    'Stayed Late for Non-Emergent Tasks',
    'Feeling Like a Burden When Asking for Help',
    'Delegation Guilt (Doing it all yourself)',
    'Fear of Professional Rejection',
    'Saying \'Yes\' to Committees When Exhausted',
    'Apologizing for Hospital System Failures'
  ],
  'Toxic Unit Shield': [
    'Lateral Violence (Nurse-to-Nurse Bullying)',
    'Management Gaslighting About Ratios',
    'Retaliatory Assignment Patterning',
    'Hostile Breakroom Dynamics',
    'Public Disrespect from Physicians',
    'Exclusion from Unit Decision Making',
    'Being Targetted by Senior Nursing Staff',
    'Moral Injury from Unsafe Resource Allocation',
    'Gossip and Unit Clique Dynamics',
    'Passive-Aggressive Handoff Communication',
    'Unfair Holiday/Weekend Scheduling'
  ]
};

export const DEFAULT_PLEASER_PHASES: PleaserPhase[] = [
  {
    level: 1,
    title: 'Awareness Mapping',
    mindsetShift: 'Guilt is a signal of growth, not a failure of character.',
    experiment: 'Track one \'Yes\' that felt like self-betrayal today.',
    completed: false
  },
  {
    level: 2,
    title: 'Guilt Naming',
    mindsetShift: 'Uncomfortable feelings are temporary; self-betrayal is lasting.',
    experiment: 'Observe the physical sensation of guilt without reacting to it.',
    completed: false
  },
  {
    level: 3,
    title: 'The Small Safe \'No\'',
    mindsetShift: 'Small boundaries build the muscle for high-stakes support.',
    experiment: 'Decline one low-consequence request (e.g., grabbing a soda for a peer).',
    completed: false
  },
  {
    level: 4,
    title: 'Clarifying Capacity',
    mindsetShift: 'Honesty about bandwidth is a clinical safety skill.',
    experiment: 'State your current tasks before agreeing to a new request.',
    completed: false
  },
  {
    level: 5,
    title: 'Value Alignment',
    mindsetShift: 'I serve my patients best when I am not emotionally depleted.',
    experiment: 'Identify one task you do solely for \'likability\' and pause it.',
    completed: false
  },
  {
    level: 6,
    title: 'The Peer Boundary',
    mindsetShift: 'Coworkers are responsible for their own workload management.',
    experiment: 'Gently decline helping a peer with non-urgent charting.',
    completed: false
  },
  {
    level: 7,
    title: 'Managing Management',
    mindsetShift: 'The hospital\'s staffing crisis is not my personal emergency.',
    experiment: 'Say \'No\' to an extra shift without giving an elaborate excuse.',
    completed: false
  },
  {
    level: 8,
    title: 'The Resentment Audit',
    mindsetShift: 'Resentment is a compass showing where I\'m over-accommodating.',
    experiment: 'Address one recurring minor frustration directly with a peer.',
    completed: false
  },
  {
    level: 9,
    title: 'High-Stakes Support',
    mindsetShift: 'My professional voice is the patient\'s ultimate shield.',
    experiment: 'Escalate a safety concern even if it feels \'confrontational\'.',
    completed: false
  },
  {
    level: 10,
    title: 'Maintenance & Mastery',
    mindsetShift: 'Assertiveness is my new clinical baseline.',
    experiment: 'Mentor a newer nurse on setting their first professional boundary.',
    completed: false
  }
];

export const DEFAULT_SOCIAL_PROOF_SEEDS = {
  firstNames: [
    'Sarah', 'Emily', 'Jessica', 'Chloe', 'Megan',
    'Samantha', 'Ashley', 'Olivia', 'Hannah', 'Grace',
    'Madison', 'Abigail', 'Isabella', 'Sophie', 'Emma',
    'Lauren', 'Nicole', 'Heather', 'Amber', 'Katherine',
    'Rebecca', 'Victoria', 'Jennifer', 'Rachel', 'Stephanie',
    'Maria', 'Elena', 'Daniela', 'Karen', 'Lisa'
  ],
  cities: [
    'New York, NY', 'London, UK', 'Toronto, ON', 'Chicago, IL', 'Los Angeles, CA',
    'Manchester, UK', 'Vancouver, BC', 'Austin, TX', 'Houston, TX', 'Seattle, WA',
    'Birmingham, UK', 'Montreal, QC', 'Calgary, AB', 'Denver, CO', 'Philadelphia, PA',
    'San Francisco, CA', 'Boston, MA', 'Ottawa, ON', 'Leeds, UK', 'Glasgow, UK'
  ],
  plans: ['3 Months Access', '1 Year Access']
};

export const DEFAULT_PRICING_PLANS = [
  {
    id: '3_months',
    name: '3 Months Access',
    price: '$19',
    strikeThroughPrice: '$40',
    period: "3 months",
    durationMonths: 3,
    features: ["250 Strategy Generations", "Full Support Strategy Engine", "Unlimited Protocol Generation", "Personal Burnout Dashboard", "Private History Library"],
    highlight: true,
    cta: 'Secure My Sanity'
  },
  {
    id: '1_year',
    name: '1 Year Access',
    price: '$49',
    strikeThroughPrice: '$97',
    period: "1 year",
    durationMonths: 12,
    features: ["Unlimited Strategy Generations", "All Professional Features", "Regular Protocol Updates", "Permanent Profile Identity"],
    highlight: false,
    cta: 'Lifetime Protection'
  }
];

// Database interface using Supabase
class SupabaseDatabase {
  async getUser(email: string) {
    const normalizedEmail = email.trim().toLowerCase();
    
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      console.error('Supabase configuration is missing.', { url: !!url, key: !!key });
      throw new Error(`Database configuration is missing. Please check your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in the settings. ${!url ? 'URL is missing. ' : ''}${!key ? 'Key is missing. ' : ''}`);
    }

    const projectRef = url.split('//')[1]?.split('.')[0];
    
    // Use ilike for case-insensitive matching
    const maskedKey = key.length > 10 ? `${key.substring(0, 5)}...${key.substring(key.length - 5)}` : '***';
    if (!key.includes('.')) {
      console.warn(`WARNING: NEXT_PUBLIC_SUPABASE_ANON_KEY does not look like a standard JWT (missing dots). Current key: ${key}`);
    }

    const { data, error, status, statusText } = await supabase
      .from('profiles')
      .select('*')
      .ilike('email', normalizedEmail)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
    
    if (data) {
      return data;
    }
    
    // Check total count explicitly
    const { count, error: countError, status: countStatus, statusText: countStatusText } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    
    if (count === 0) {
      console.warn(`THE PROFILES TABLE IS COMPLETELY EMPTY. This usually means:
1. No users have signed up yet.
2. Row Level Security (RLS) is enabled but no SELECT policy exists.
3. You are connected to a different Supabase project than intended.`);
    }

    // Try a prefix match to catch typos like "email@domain.comn"
    const { data: prefixMatch } = await supabase
      .from('profiles')
      .select('*')
      .ilike('email', `${normalizedEmail}%`)
      .limit(1)
      .maybeSingle();
    
    if (prefixMatch) {
      const suffix = prefixMatch.email.slice(normalizedEmail.length);
      // If the suffix is just 1-2 characters, it's likely a typo (like a trailing 'n' or 'm')
      if (suffix.length <= 2) {
        return prefixMatch;
      }
    }

    // Fallback: List ALL emails in the table to see what's actually there
    const { data: allProfiles, error: listError } = await supabase
      .from('profiles')
      .select('email');
    
    if (listError) {
      // Silently fail list error
    } else if (allProfiles) {
      const emails = allProfiles.map((p: any) => `"${p.email}"`);
      
      // Check for common issues: hidden characters, spaces, or case sensitivity
      const match = allProfiles.find((p: any) => {
        const cleanDb = p.email.trim().toLowerCase().replace(/[^a-z0-9@.]/g, '');
        const cleanSearch = normalizedEmail.replace(/[^a-z0-9@.]/g, '');
        return cleanDb === cleanSearch || cleanDb.startsWith(cleanSearch) || cleanSearch.startsWith(cleanDb);
      });

      if (match) {
        const { data: matchData } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', match.email)
          .maybeSingle();
        if (matchData) return matchData;
      }
    }
    
    // Check total count explicitly
    // Already done above in this version of the code
    
    return null;
  }

  async getAllUserEmails() {
    const { data, error } = await supabase
      .from('profiles')
      .select('email');
    
    if (error) return [];
    return data.map((p: any) => p.email);
  }

  private async safeUpsert(table: string, data: any, onConflict: string) {
    let currentData = { ...data };
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      const { data: result, error, status, statusText } = await supabase
        .from(table)
        .upsert([currentData], { onConflict })
        .select()
        .maybeSingle();

      if (!error) return { data: result, error: null, status, statusText };

      // PGRST204: Column not found in schema cache
      if (error.code === 'PGRST204') {
        const match = error.message.match(/Could not find the '(.+)' column/);
        if (match && match[1]) {
          const missingColumn = match[1];
          delete currentData[missingColumn];
          attempts++;
          continue;
        }
      }

      return { data: result, error, status, statusText };
    }

    throw new Error(`Too many retries attempting to upsert to ${table}`);
  }

  private async safeUpdate(table: string, updates: any, email: string) {
    let currentUpdates = { ...updates };
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      const { data: result, error, status, statusText } = await supabase
        .from(table)
        .update(currentUpdates)
        .eq('user_email', email)
        .select()
        .maybeSingle();

      if (!error) return { data: result, error: null, status, statusText };

      if (error.code === 'PGRST204') {
        const match = error.message.match(/Could not find the '(.+)' column/);
        if (match && match[1]) {
          const missingColumn = match[1];
          delete currentUpdates[missingColumn];
          attempts++;
          continue;
        }
      }

      return { data: result, error, status, statusText };
    }

    throw new Error(`Too many retries attempting to update ${table}`);
  }

  async createUser(userData: any) {
    // Aggressive cleaning for email
    let normalizedEmail = userData.email.trim().toLowerCase();
    // Remove any trailing characters that are clearly typos (like a trailing 'n' after .com)
    if (normalizedEmail.endsWith('.comn')) normalizedEmail = normalizedEmail.slice(0, -1);
    if (normalizedEmail.endsWith('.con')) normalizedEmail = normalizedEmail.slice(0, -1) + 'm';
    
    const { data: profileData, error: profileError, status, statusText } = await supabase
      .from('profiles')
      .upsert([{
        email: normalizedEmail,
        name: userData.name,
        first_name: userData.firstName,
        last_name: userData.lastName,
        career: userData.career,
        role: 'USER',
        status: 'Active',
        tier: 'Free',
        sessions: 1
      }], { onConflict: 'email' })
      .select();

    if (profileError) {
      console.error('Error creating profile:', profileError);
      throw profileError;
    }

    const profile = profileData && profileData.length > 0 ? profileData[0] : null;

    if (!profile) {
      console.error('Profile creation returned no data but no error. This is a CRITICAL issue. It usually means Row Level Security (RLS) is enabled on the "profiles" table but no "INSERT" or "SELECT" policies exist for the anon key.');
      throw new Error("Profile creation failed: No data returned. Please check Supabase RLS policies for the 'profiles' table.");
    }

    if (profile) {
      // Initialize stats for new user
      const defaultStats = this.getDefaultStats(normalizedEmail);
      
      const { error: statsError, status: statsStatus, statusText: statsStatusText } = await this.safeUpsert('user_stats', defaultStats, 'user_email');
  
      if (statsError) {
        console.error('Error initializing stats (upsert):', statsError);
        console.error('Error message:', statsError.message);
        console.error('Error code:', statsError.code);
        console.error('Error details:', statsError.details);
        console.error('Status:', statsStatus, 'StatusText:', statsStatusText);
        console.error('This often happens if the "user_stats" table does not exist or has RLS enabled without an INSERT/UPDATE policy.');
      }
    }

    return profile;
  }

  private getDefaultStats(email: string) {
    return {
      user_email: email,
      sessions_completed: 0,
      burnout_risk: 'Low',
      boundary_score: 0,
      freedom_score: 0,
      assertive_streak: 0,
      incident_delta: 0,
      reclaimed_hours: 0,
      clinical_insight: "Resentment peaks on Mondays and Wednesdays. These shifts correlate with lower staffing ratios. Use high-impact Peer Boundaries during handoff.",
      milestone_title: "First 5-shift Guilt-Free Streak Completed!",
      transformation_summary: "Welcome to NurseBuilder. Start your first session to see your metrics.",
      burnout_breakdown: [
        { label: "Emotional Exhaustion", value: "Low", info: "Based on recent shift patterns." },
        { label: "Depersonalization", value: "None", info: "Maintaining clinical empathy." }
      ],
      resilience_breakdown: [
        { label: "Self-Regulation", value: "75%", info: "Ability to pause before reacting." },
        { label: "Boundary Clarity", value: "60%", info: "Clarity in professional role." }
      ],
      recent_trends: [
        { day: "Mon", score: 45 },
        { day: "Tue", score: 52 },
        { day: "Wed", score: 48 },
        { day: "Thu", score: 61 },
        { day: "Fri", score: 55 }
      ],
      performance_metrics: [
        { label: "Assertiveness", value: "Medium", info: "Consistency in boundary setting." },
        { label: "Guilt Management", value: "Improving", info: "Reduction in self-betrayal." }
      ],
      resentment_heatmap: {
        "Mon": 8, "Tue": 4, "Wed": 7, "Thu": 3, "Fri": 5, "Sat": 2, "Sun": 2
      }
    };
  }

  async getStats(email: string) {
    const normalizedEmail = email.trim().toLowerCase();
    
    // Fetch all plans to calculate real metrics
    const { data: plans, error: plansError } = await supabase
      .from('boundary_plans')
      .select('created_at, bundle, issue, resilience_score, guilt_score')
      .eq('user_email', normalizedEmail);

    if (plansError) {
      console.error('Error fetching plans for stats calculation:', plansError);
    }

    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_email', normalizedEmail)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching stats:', error);
      return null;
    }

    // Calculation logic from real data
    const allPlans = plans || [];
    const sessionsCompleted = allPlans.length;
    
    // Calculate reclaimed hours (This Week - last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const plansThisWeek = allPlans.filter((p: any) => new Date(p.created_at) >= sevenDaysAgo);
    const reclaimedHours = Number((plansThisWeek.length * 0.5).toFixed(1));
    
    const freedomScore = Math.min(100, sessionsCompleted * 10);
    const freedomGain = Math.min(100, plansThisWeek.length * 10);
    const boundaryScore = Math.min(100, sessionsCompleted * 8);
    const incidentDelta = Math.min(95, sessionsCompleted * 5);
    
    // Calculate assertive streak
    let assertiveStreak = 0;
    if (allPlans.length > 0) {
      const dates = allPlans.map((p: any) => new Date(p.created_at).toDateString());
      const uniqueDates = Array.from(new Set(dates)).map(d => new Date(d as string));
      uniqueDates.sort((a, b) => b.getTime() - a.getTime());
      
      let current = new Date();
      current.setHours(0, 0, 0, 0);
      
      // Check if the most recent plan is today or yesterday
      const latestPlanDate = uniqueDates[0];
      const diffDays = Math.floor((current.getTime() - latestPlanDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 1) {
        assertiveStreak = 1;
        for (let i = 0; i < uniqueDates.length - 1; i++) {
          const d1 = uniqueDates[i];
          const d2 = uniqueDates[i+1];
          const diff = Math.floor((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));
          if (diff === 1) {
            assertiveStreak++;
          } else {
            break;
          }
        }
      }
    }

    // Calculate resentment heatmap (plans per day of week)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const heatmap: { [key: string]: number } = { 'Sun': 0, 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0 };
    allPlans.forEach((p: any) => {
      const dayName = days[new Date(p.created_at).getDay()];
      heatmap[dayName]++;
    });

    // Calculate Strategy Focus (Burnout Breakdown replacement)
    const bundleCounts: { [key: string]: number } = {};
    allPlans.forEach((p: any) => {
      const b = p.bundle || 'General';
      bundleCounts[b] = (bundleCounts[b] || 0) + 1;
    });
    const burnoutBreakdown = Object.entries(bundleCounts).map(([label, count]) => ({
      label,
      value: count,
      info: `Strategies generated for this focus area.`
    }));

    // Calculate Issue Distribution (Resilience Breakdown replacement)
    const issueCounts: { [key: string]: number } = {};
    allPlans.forEach((p: any) => {
      const issue = p.issue || 'Other';
      issueCounts[issue] = (issueCounts[issue] || 0) + 1;
    });
    const resilienceBreakdown = Object.entries(issueCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([label, count]) => ({
        label: label.length > 20 ? label.substring(0, 17) + '...' : label,
        value: count,
        info: `Frequency of this boundary challenge.`
      }));

    // Calculate Recent Trends (last 7 days)
    const recentTrends = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dStr = d.toDateString();
      const count = allPlans.filter((p: any) => new Date(p.created_at).toDateString() === dStr).length;
      recentTrends.push({ day: d.toLocaleDateString('en-US', { weekday: 'short' }), score: count * 10 });
    }

    const calculatedStats = {
      sessionsCompleted,
      burnoutRisk: sessionsCompleted < 3 ? 'High' : sessionsCompleted < 7 ? 'Moderate' : 'Low',
      burnoutBreakdown: burnoutBreakdown.length > 0 ? burnoutBreakdown : [
        { label: "Focus Areas", value: "0", info: "Generate more plans to see focus areas." }
      ],
      boundaryScore,
      resilienceBreakdown: resilienceBreakdown.length > 0 ? resilienceBreakdown : [
        { label: "Top Challenges", value: "0", info: "Generate more plans to see challenges." }
      ],
      recentTrends,
      performanceMetrics: [
        { label: "Assertiveness", value: assertiveStreak > 3 ? "High" : "Developing", info: "Based on your current streak." },
        { label: "Consistency", value: sessionsCompleted > 5 ? "Solid" : "Building", info: "Total volume of boundary work." }
      ],
      freedomScore,
      assertiveStreak,
      resentmentHeatmap: heatmap,
      incidentDelta,
      freedomGain,
      transformationSummary: sessionsCompleted > 0 
        ? `You have successfully built ${sessionsCompleted} professional boundaries.` 
        : "Welcome to NurseBuilder. Start your first session to see your metrics.",
      reclaimedHours,
      clinicalInsight: sessionsCompleted > 0 
        ? `Most of your boundary work happens on ${Object.entries(heatmap).sort((a, b) => b[1] - a[1])[0][0]}s.` 
        : "No clinical insight available yet.",
      milestoneTitle: sessionsCompleted >= 10 ? "Boundary Master: 10+ Plans Created" : sessionsCompleted >= 5 ? "Consistent Protector: 5+ Plans Created" : "First Steps: Keep going to unlock milestones!"
    };

    if (!data) {
      // Ensure profile exists
      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', normalizedEmail)
        .maybeSingle();

      if (!profile) {
        await supabase
          .from('profiles')
          .upsert([{
            email: normalizedEmail,
            name: normalizedEmail.split('@')[0],
            role: 'USER',
            status: 'Active',
            tier: 'Free'
          }], { onConflict: 'email' });
      }

      // Create/Update user_stats with calculated values
      const dbStats = {
        user_email: normalizedEmail,
        sessions_completed: sessionsCompleted,
        burnout_risk: calculatedStats.burnoutRisk,
        burnout_breakdown: calculatedStats.burnoutBreakdown,
        boundary_score: boundaryScore,
        resilience_breakdown: calculatedStats.resilienceBreakdown,
        recent_trends: calculatedStats.recentTrends,
        performance_metrics: calculatedStats.performanceMetrics,
        freedom_score: freedomScore,
        assertive_streak: assertiveStreak,
        resentment_heatmap: heatmap,
        incident_delta: incidentDelta,
        freedom_gain: freedomGain,
        transformation_summary: calculatedStats.transformationSummary,
        reclaimed_hours: reclaimedHours,
        clinical_insight: calculatedStats.clinicalInsight,
        milestone_title: calculatedStats.milestoneTitle
      };

      await this.safeUpsert('user_stats', dbStats, 'user_email');
      return calculatedStats as UserStats;
    }

    // Update existing stats with calculated values to keep them in sync
    const dbUpdates = {
      sessions_completed: sessionsCompleted,
      burnout_risk: calculatedStats.burnoutRisk,
      burnout_breakdown: calculatedStats.burnoutBreakdown,
      boundary_score: boundaryScore,
      resilience_breakdown: calculatedStats.resilienceBreakdown,
      recent_trends: calculatedStats.recentTrends,
      performance_metrics: calculatedStats.performanceMetrics,
      freedom_score: freedomScore,
      assertive_streak: assertiveStreak,
      resentment_heatmap: heatmap,
      incident_delta: incidentDelta,
      freedom_gain: freedomGain,
      transformation_summary: calculatedStats.transformationSummary,
      reclaimed_hours: reclaimedHours,
      clinical_insight: calculatedStats.clinicalInsight,
      milestone_title: calculatedStats.milestoneTitle
    };
    
    await this.safeUpdate('user_stats', dbUpdates, normalizedEmail);

    return calculatedStats as UserStats;
  }

  private mapStatsFromDB(data: any) {
    return {
      sessionsCompleted: data.sessions_completed || 0,
      burnoutRisk: data.burnout_risk || 'Low',
      burnoutBreakdown: data.burnout_breakdown || [],
      boundaryScore: data.boundary_score || 0,
      resilienceBreakdown: data.resilience_breakdown || [],
      recentTrends: data.recent_trends || [],
      performanceMetrics: data.performance_metrics || [],
      freedomScore: data.freedom_score || 0,
      assertiveStreak: data.assertive_streak || 0,
      resentmentHeatmap: data.resentment_heatmap || {},
      incidentDelta: data.incident_delta || 0,
      freedomGain: data.freedom_gain || 0,
      transformationSummary: data.transformation_summary || "",
      reclaimedHours: data.reclaimed_hours || 0,
      clinicalInsight: data.clinical_insight || "No clinical insight available yet.",
      milestoneTitle: data.milestone_title || "Keep going to unlock milestones!"
    } as UserStats;
  }

  async updateStats(email: string, newStats: Partial<UserStats>) {
    const normalizedEmail = email.trim().toLowerCase();
    // Map camelCase to snake_case for the database
    const updates: any = {};
    if (newStats.sessionsCompleted !== undefined) updates.sessions_completed = newStats.sessionsCompleted;
    if (newStats.burnoutRisk !== undefined) updates.burnout_risk = newStats.burnoutRisk;
    if (newStats.burnoutBreakdown !== undefined) updates.burnout_breakdown = newStats.burnoutBreakdown;
    if (newStats.boundaryScore !== undefined) updates.boundary_score = newStats.boundaryScore;
    if (newStats.resilienceBreakdown !== undefined) updates.resilience_breakdown = newStats.resilienceBreakdown;
    if (newStats.recentTrends !== undefined) updates.recent_trends = newStats.recentTrends;
    if (newStats.performanceMetrics !== undefined) updates.performance_metrics = newStats.performanceMetrics;
    if (newStats.freedomScore !== undefined) updates.freedom_score = newStats.freedomScore;
    if (newStats.assertiveStreak !== undefined) updates.assertive_streak = newStats.assertiveStreak;
    if (newStats.resentmentHeatmap !== undefined) updates.resentment_heatmap = newStats.resentmentHeatmap;
    if (newStats.incidentDelta !== undefined) updates.incident_delta = newStats.incidentDelta;
    if (newStats.freedomGain !== undefined) updates.freedom_gain = newStats.freedomGain;
    if (newStats.transformationSummary !== undefined) updates.transformation_summary = newStats.transformationSummary;
    if (newStats.reclaimedHours !== undefined) updates.reclaimed_hours = newStats.reclaimedHours;
    if (newStats.clinicalInsight !== undefined) updates.clinical_insight = newStats.clinicalInsight;
    if (newStats.milestoneTitle !== undefined) updates.milestone_title = newStats.milestoneTitle;

    const { data, error } = await this.safeUpdate('user_stats', updates, normalizedEmail);

    if (error) {
      console.error('Error updating stats:', error);
      return null;
    }
    return data;
  }

  async updateProfile(email: string, updates: any) {
    const normalizedEmail = email.trim().toLowerCase();
    // Map camelCase to snake_case if necessary
    const dbUpdates: any = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.firstName !== undefined) dbUpdates.first_name = updates.firstName;
    if (updates.lastName !== undefined) dbUpdates.last_name = updates.lastName;
    if (updates.career !== undefined) dbUpdates.career = updates.career;
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.tier !== undefined) dbUpdates.tier = updates.tier;
    if (updates.sessions !== undefined) dbUpdates.sessions = updates.sessions;
    if (updates.accessExpiryDate !== undefined) dbUpdates.access_expiry_date = updates.accessExpiryDate;
    if (updates.generationsCount !== undefined) dbUpdates.generations_count = updates.generationsCount;
    if (updates.lastGenerationReset !== undefined) dbUpdates.last_generation_reset = updates.lastGenerationReset;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(dbUpdates)
        .eq('email', normalizedEmail)
        .select()
        .maybeSingle();
      
      if (error) {
        console.error('Supabase Error updating profile:', error.message || error, error.details || '');
        throw error;
      }

      if (!data) {
        // Try one more time with case-insensitive check if exact match failed
        
        // We can't use .ilike() with .update(), so we find the email first
        const { data: foundUser, error: findError } = await supabase
          .from('profiles')
          .select('email')
          .ilike('email', normalizedEmail)
          .maybeSingle();
        
        if (findError) {
          console.error('Error finding user for case-insensitive update:', findError);
          throw findError;
        }

        if (foundUser) {
          const { data: retryData, error: retryError } = await supabase
            .from('profiles')
            .update(dbUpdates)
            .eq('email', foundUser.email)
            .select()
            .single();
          
          if (retryError) {
            console.error('Error in retry update:', retryError);
            throw retryError;
          }
          return retryData;
        }
        
        console.error(`User "${normalizedEmail}" not found even with case-insensitive search.`);
        return null;
      }

      return data;
    } catch (err: any) {
      console.error('Unexpected error in updateProfile:', err.message || err, err.stack);
      throw err;
    }
  }

  async deleteUser(email: string) {
    const normalizedEmail = email.trim().toLowerCase();
    
    // Delete boundary plans first
    const { error: plansError } = await supabase
      .from('boundary_plans')
      .delete()
      .eq('user_email', normalizedEmail);
    
    if (plansError) {
      console.warn('Error deleting plans for user:', plansError);
    }

    // Delete user stats
    const { error: statsError } = await supabase
      .from('user_stats')
      .delete()
      .eq('user_email', normalizedEmail);
    
    if (statsError) {
      console.warn('Error deleting stats for user:', statsError);
    }

    // Delete actual profile
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('email', normalizedEmail);

    if (profileError) {
      console.error('Error deleting profile:', profileError);
      throw profileError;
    }

    return true;
  }

  private mapPlanFromDB(p: any): BoundaryPlan {
    return {
      id: p.id,
      issue: p.issue,
      bundle: p.bundle,
      timestamp: p.timestamp,
      strategy: p.strategy,
      scripts: p.scripts,
      objections: p.objections,
      psychologicalInsight: p.psychological_insight,
      personalStory: p.personal_story,
      context: p.context,
      isSaved: p.is_saved,
      premiumInsights: p.premium_insights,
      clinicalRationale: p.clinical_rationale,
      longTermImpact: p.long_term_impact,
      currentPhase: p.current_phase,
      guiltScore: p.guilt_score,
      resilienceScore: p.resilience_score
    };
  }

  async getPlans(email: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const { data, error } = await supabase
      .from('boundary_plans')
      .select('*')
      .eq('user_email', normalizedEmail)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching plans:', error);
      return [];
    }

    return data.map((p: any) => this.mapPlanFromDB(p));
  }

  async addPlan(email: string, plan: BoundaryPlan) {
    const normalizedEmail = email.trim().toLowerCase();
    const { data, error } = await supabase
      .from('boundary_plans')
      .insert([{
        user_email: normalizedEmail,
        issue: plan.issue,
        bundle: plan.bundle,
        timestamp: plan.timestamp,
        strategy: plan.strategy,
        scripts: plan.scripts,
        objections: plan.objections,
        psychological_insight: plan.psychologicalInsight,
        personal_story: plan.personalStory,
        context: plan.context,
        is_saved: plan.isSaved,
        premium_insights: plan.premiumInsights,
        clinical_rationale: plan.clinicalRationale,
        long_term_impact: plan.longTermImpact,
        current_phase: plan.currentPhase,
        guilt_score: plan.guiltScore,
        resilience_score: plan.resilienceScore
      }])
      .select()
      .single();

    if (error) {
      console.error('Error adding plan:', JSON.stringify(error, null, 2));
      throw error;
    }

    // Stats will be recalculated on next getStats call
    
    return this.mapPlanFromDB(data);
  }

  async updatePlan(email: string, planId: string, updates: Partial<BoundaryPlan>) {
    const normalizedEmail = email.trim().toLowerCase();
    // Map camelCase to snake_case
    const dbUpdates: any = {};
    if (updates.issue !== undefined) dbUpdates.issue = updates.issue;
    if (updates.bundle !== undefined) dbUpdates.bundle = updates.bundle;
    if (updates.timestamp !== undefined) dbUpdates.timestamp = updates.timestamp;
    if (updates.strategy !== undefined) dbUpdates.strategy = updates.strategy;
    if (updates.scripts !== undefined) dbUpdates.scripts = updates.scripts;
    if (updates.objections !== undefined) dbUpdates.objections = updates.objections;
    if (updates.psychologicalInsight !== undefined) dbUpdates.psychological_insight = updates.psychologicalInsight;
    if (updates.personalStory !== undefined) dbUpdates.personal_story = updates.personalStory;
    if (updates.context !== undefined) dbUpdates.context = updates.context;
    if (updates.isSaved !== undefined) dbUpdates.is_saved = updates.isSaved;
    if (updates.premiumInsights !== undefined) dbUpdates.premium_insights = updates.premiumInsights;
    if (updates.clinicalRationale !== undefined) dbUpdates.clinical_rationale = updates.clinicalRationale;
    if (updates.longTermImpact !== undefined) dbUpdates.long_term_impact = updates.longTermImpact;
    if (updates.currentPhase !== undefined) dbUpdates.current_phase = updates.currentPhase;
    if (updates.guiltScore !== undefined) dbUpdates.guilt_score = updates.guiltScore;
    if (updates.resilienceScore !== undefined) dbUpdates.resilience_score = updates.resilienceScore;

    const { data, error } = await supabase
      .from('boundary_plans')
      .update(dbUpdates)
      .eq('id', planId)
      .eq('user_email', normalizedEmail)
      .select()
      .single();

    if (error) {
      console.error('Error updating plan:', JSON.stringify(error, null, 2));
      throw error;
    }
    return this.mapPlanFromDB(data);
  }

  async deletePlan(email: string, planId: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const { error } = await supabase
      .from('boundary_plans')
      .delete()
      .eq('id', planId)
      .eq('user_email', normalizedEmail);
    
    if (error) {
      console.error('Error deleting plan:', JSON.stringify(error, null, 2));
      throw error;
    }
    return true;
  }

  // OTP Management
  async createOTP(email: string, code: string) {
    const normalizedEmail = email.trim().toLowerCase();
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder'))) {
      console.error('Supabase configuration is missing or using placeholders.');
      throw new Error('Database configuration missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
    }
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    const { error } = await supabase
      .from('otps')
      .insert([{ email: normalizedEmail, code, expires_at: expiresAt.toISOString() }]);
    
    if (error) {
      console.error('Error creating OTP:', JSON.stringify(error, null, 2));
      throw new Error(`Database error: ${error.message || 'Unknown error'}`);
    }
    return true;
  }

  async verifyOTP(email: string, code: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const { data, error } = await supabase
      .from('otps')
      .select('*')
      .eq('email', normalizedEmail)
      .eq('code', code)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error verifying OTP:', error);
      return false;
    }

    if (data && data.length > 0) {
      // Delete all OTPs for this user upon successful verification for security
      await supabase.from('otps').delete().eq('email', normalizedEmail);
      return true;
    }

    return false;
  }

  async cleanupOTPs() {
    const { error } = await supabase
      .from('otps')
      .delete()
      .lt('expires_at', new Date().toISOString());
    
    if (error) {
      console.error('Error cleaning up OTPs:', error);
    }
  }

  async getPricingTiers() {
    const { data, error } = await supabase
      .from('pricing_tiers')
      .select('*')
      .order('duration_months', { ascending: true });

    if (error) {
      console.error('Error fetching pricing tiers:', error);
      throw error;
    }

    return data;
  }

  // App Constants
  async getNurseCareers() {
    try {
      const { data, error } = await supabase
        .from('nurse_careers')
        .select('name')
        .order('name');
      
      if (error) {
        return DEFAULT_CAREERS;
      }
      return data && data.length > 0 ? data.map((c: any) => c.name) : DEFAULT_CAREERS;
    } catch (e) {
      return DEFAULT_CAREERS;
    }
  }

  async getSupportBundles() {
    try {
      const { data, error } = await supabase
        .from('support_bundles')
        .select('name')
        .order('name');
      
      if (error) {
        return DEFAULT_BUNDLES;
      }
      return data && data.length > 0 ? data.map((b: any) => b.name) : DEFAULT_BUNDLES;
    } catch (e) {
      return DEFAULT_BUNDLES;
    }
  }

  async getBundleIssues() {
    try {
      const { data, error } = await supabase
        .from('bundle_issues')
        .select('bundle_name, issue');
      
      if (error) {
        return DEFAULT_BUNDLE_ISSUES;
      }
      
      if (!data || data.length === 0) return DEFAULT_BUNDLE_ISSUES;

      const result: Record<string, string[]> = {};
      data.forEach((item: any) => {
        if (!result[item.bundle_name]) result[item.bundle_name] = [];
        result[item.bundle_name].push(item.issue);
      });
      return result;
    } catch (e) {
      return DEFAULT_BUNDLE_ISSUES;
    }
  }

  async getPleaserPhases() {
    try {
      const { data, error } = await supabase
        .from('pleaser_phases')
        .select('*')
        .order('level');
      
      if (error) {
        return DEFAULT_PLEASER_PHASES;
      }
      return data && data.length > 0 ? data.map((p: any) => ({
        level: p.level,
        title: p.title,
        mindsetShift: p.mindset_shift,
        experiment: p.experiment,
        completed: false
      })) : DEFAULT_PLEASER_PHASES;
    } catch (e) {
      return DEFAULT_PLEASER_PHASES;
    }
  }

  async getPricingPlans() {
    try {
      const { data, error } = await supabase
        .from('pricing_tiers')
        .select('*')
        .order('duration_months');
      
      if (error) {
        return DEFAULT_PRICING_PLANS;
      }
      
      if (!data || data.length === 0) return DEFAULT_PRICING_PLANS;

      return data.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        strikeThroughPrice: p.strike_through_price,
        period: p.duration_months === 3 ? "3 months" : "1 year",
        durationMonths: p.duration_months,
        features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features,
        highlight: p.is_popular,
        cta: p.cta
      }));
    } catch (e) {
      return DEFAULT_PRICING_PLANS;
    }
  }

  async getSocialProofSeeds() {
    try {
      const [seedsRes, tiersRes] = await Promise.all([
        supabase.from('social_proof_seeds').select('type, value'),
        supabase.from('pricing_tiers').select('name')
      ]);
      
      const { data, error } = seedsRes;
      const { data: tiersData, error: tiersError } = tiersRes;
      
      if (error) {
        return DEFAULT_SOCIAL_PROOF_SEEDS;
      }
      
      const seeds = {
        firstNames: [] as string[],
        cities: [] as string[],
        plans: [] as string[]
      };
      
      if (data && data.length > 0) {
        data.forEach((item: any) => {
          if (item.type === 'first_name') seeds.firstNames.push(item.value);
          else if (item.type === 'city') seeds.cities.push(item.value);
          else if (item.type === 'plan') seeds.plans.push(item.value);
        });
      }
      
      // Always add real pricing tier names to plans if available
      if (tiersData && tiersData.length > 0) {
        const tierNames = tiersData.map((t: any) => t.name);
        seeds.plans = [...new Set([...seeds.plans, ...tierNames])];
      }
      
      // Ensure all arrays have some values from defaults if empty
      if (seeds.firstNames.length === 0) seeds.firstNames = DEFAULT_SOCIAL_PROOF_SEEDS.firstNames;
      if (seeds.cities.length === 0) seeds.cities = DEFAULT_SOCIAL_PROOF_SEEDS.cities;
      if (seeds.plans.length === 0) seeds.plans = DEFAULT_SOCIAL_PROOF_SEEDS.plans;
      
      return seeds;
    } catch (e) {
      return DEFAULT_SOCIAL_PROOF_SEEDS;
    }
  }
}

export const db = new SupabaseDatabase();
