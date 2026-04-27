-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  email TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  career TEXT,
  role TEXT DEFAULT 'USER',
  status TEXT DEFAULT 'Active',
  tier TEXT DEFAULT 'Free',
  sessions INTEGER DEFAULT 0,
  access_expiry_date TIMESTAMPTZ,
  generations_count INTEGER DEFAULT 0,
  last_generation_reset TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure all columns exist in profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS career TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'USER';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Active';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'Free';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS sessions INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS access_expiry_date TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS generations_count INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_generation_reset TIMESTAMPTZ DEFAULT NOW();

-- Pricing Tiers table
CREATE TABLE IF NOT EXISTS pricing_tiers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  strike_through_price TEXT,
  duration_months INTEGER,
  features JSONB,
  is_popular BOOLEAN DEFAULT FALSE,
  cta TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default pricing tiers
INSERT INTO pricing_tiers (id, name, price, strike_through_price, duration_months, features, is_popular, cta)
VALUES 
('3_months', '3 Months Access', '$19', '$40', 3, '["250 Strategy Generations", "Full Support Strategy Engine", "Unlimited Protocol Generation", "Personal Burnout Dashboard", "Private History Library"]', true, 'Secure My Sanity'),
('1_year', '1 Year Access', '$49', '$97', 12, '["Unlimited Strategy Generations", "All Professional Features", "Regular Protocol Updates", "Permanent Profile Identity"]', false, 'Lifetime Protection')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  strike_through_price = EXCLUDED.strike_through_price,
  duration_months = EXCLUDED.duration_months,
  features = EXCLUDED.features,
  is_popular = EXCLUDED.is_popular,
  cta = EXCLUDED.cta;

CREATE TABLE IF NOT EXISTS user_stats (
  user_email TEXT PRIMARY KEY REFERENCES profiles(email) ON DELETE CASCADE,
  sessions_completed INTEGER DEFAULT 0,
  burnout_risk TEXT DEFAULT 'Low',
  burnout_breakdown JSONB,
  boundary_score INTEGER DEFAULT 0,
  resilience_breakdown JSONB,
  recent_trends JSONB,
  performance_metrics JSONB,
  freedom_score INTEGER DEFAULT 0,
  assertive_streak INTEGER DEFAULT 0,
  resentment_heatmap JSONB,
  incident_delta INTEGER DEFAULT 0,
  transformation_summary TEXT,
  reclaimed_hours NUMERIC DEFAULT 0,
  clinical_insight TEXT,
  milestone_title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure all columns exist in user_stats (in case table was created with older schema)
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS sessions_completed INTEGER DEFAULT 0;
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS burnout_risk TEXT DEFAULT 'Low';
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS burnout_breakdown JSONB;
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS boundary_score INTEGER DEFAULT 0;
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS resilience_breakdown JSONB;
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS recent_trends JSONB;
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS performance_metrics JSONB;
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS freedom_score INTEGER DEFAULT 0;
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS assertive_streak INTEGER DEFAULT 0;
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS resentment_heatmap JSONB;
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS incident_delta INTEGER DEFAULT 0;
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS transformation_summary TEXT;
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS reclaimed_hours NUMERIC DEFAULT 0;
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS clinical_insight TEXT;
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS milestone_title TEXT;

-- Boundary plans table
CREATE TABLE IF NOT EXISTS boundary_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT REFERENCES profiles(email) ON DELETE CASCADE,
  issue TEXT NOT NULL,
  bundle TEXT,
  timestamp BIGINT,
  strategy TEXT,
  scripts JSONB,
  objections JSONB,
  psychological_insight TEXT,
  personal_story TEXT,
  context TEXT,
  is_saved BOOLEAN DEFAULT FALSE,
  premium_insights JSONB,
  clinical_rationale TEXT,
  long_term_impact TEXT,
  current_phase INTEGER,
  guilt_score INTEGER,
  resilience_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure all columns exist in boundary_plans
ALTER TABLE boundary_plans ADD COLUMN IF NOT EXISTS bundle TEXT;
ALTER TABLE boundary_plans ADD COLUMN IF NOT EXISTS timestamp BIGINT;
ALTER TABLE boundary_plans ADD COLUMN IF NOT EXISTS strategy TEXT;
ALTER TABLE boundary_plans ADD COLUMN IF NOT EXISTS scripts JSONB;
ALTER TABLE boundary_plans ADD COLUMN IF NOT EXISTS objections JSONB;
ALTER TABLE boundary_plans ADD COLUMN IF NOT EXISTS psychological_insight TEXT;
ALTER TABLE boundary_plans ADD COLUMN IF NOT EXISTS personal_story TEXT;
ALTER TABLE boundary_plans ADD COLUMN IF NOT EXISTS context TEXT;
ALTER TABLE boundary_plans ADD COLUMN IF NOT EXISTS is_saved BOOLEAN DEFAULT FALSE;
ALTER TABLE boundary_plans ADD COLUMN IF NOT EXISTS premium_insights JSONB;
ALTER TABLE boundary_plans ADD COLUMN IF NOT EXISTS clinical_rationale TEXT;
ALTER TABLE boundary_plans ADD COLUMN IF NOT EXISTS long_term_impact TEXT;
ALTER TABLE boundary_plans ADD COLUMN IF NOT EXISTS current_phase INTEGER;
ALTER TABLE boundary_plans ADD COLUMN IF NOT EXISTS guilt_score INTEGER;
ALTER TABLE boundary_plans ADD COLUMN IF NOT EXISTS resilience_score INTEGER;

-- OTPs table
CREATE TABLE IF NOT EXISTS otps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Nurse Careers table
CREATE TABLE IF NOT EXISTS nurse_careers (
  name TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Support Bundles table
CREATE TABLE IF NOT EXISTS support_bundles (
  name TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bundle Issues table
CREATE TABLE IF NOT EXISTS bundle_issues (
  bundle_name TEXT REFERENCES support_bundles(name) ON DELETE CASCADE,
  issue TEXT NOT NULL,
  PRIMARY KEY (bundle_name, issue)
);

-- Pleaser Phases table
CREATE TABLE IF NOT EXISTS pleaser_phases (
  level INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  mindset_shift TEXT NOT NULL,
  experiment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Social Proof Seeds table
CREATE TABLE IF NOT EXISTS social_proof_seeds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- 'first_name', 'city', 'plan'
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT REFERENCES profiles(email) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  plan_name TEXT NOT NULL,
  status TEXT DEFAULT 'Success',
  stripe_session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS as requested by the user
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats DISABLE ROW LEVEL SECURITY;
ALTER TABLE boundary_plans DISABLE ROW LEVEL SECURITY;
ALTER TABLE otps DISABLE ROW LEVEL SECURITY;
ALTER TABLE announcements DISABLE ROW LEVEL SECURITY;
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE nurse_careers DISABLE ROW LEVEL SECURITY;
ALTER TABLE support_bundles DISABLE ROW LEVEL SECURITY;
ALTER TABLE bundle_issues DISABLE ROW LEVEL SECURITY;
ALTER TABLE pleaser_phases DISABLE ROW LEVEL SECURITY;
ALTER TABLE social_proof_seeds DISABLE ROW LEVEL SECURITY;

-- Initial data for constants
INSERT INTO nurse_careers (name) VALUES
('Staff Nurse (Med-Surg)'), ('Intensive Care (ICU)'), ('Emergency Department (ED)'),
('Operating Room (OR)'), ('Labor & Delivery (L&D)'), ('Pediatrics'), ('Oncology'),
('Psychiatric/Mental Health'), ('Community/Public Health'), ('Nurse Practitioner (NP)'),
('CRNA'), ('Nurse Educator'), ('Nurse Leader'), ('Other')
ON CONFLICT (name) DO NOTHING;

INSERT INTO support_bundles (name) VALUES
('Nurse Boundaries Builder'), ('Nurse No More Pleaser'), ('Toxic Unit Shield')
ON CONFLICT (name) DO NOTHING;

INSERT INTO bundle_issues (bundle_name, issue) VALUES
('Nurse Boundaries Builder', 'Mandatory Overtime & Extra Shifts'),
('Nurse Boundaries Builder', 'Non-Nursing Tasks (Scope Creep)'),
('Nurse Boundaries Builder', 'Aggressive or Demanding Patients'),
('Nurse Boundaries Builder', 'Calls/Texts During Off-Hours'),
('Nurse Boundaries Builder', 'Unpaid Charting After Shift'),
('Nurse Boundaries Builder', 'Floating to Unfamiliar Units'),
('Nurse Boundaries Builder', 'Interrupted Breaks & Lunch Periods'),
('Nurse Boundaries Builder', 'Nurse-to-Patient Ratio Concerns'),
('Nurse Boundaries Builder', 'Family Members Refusing to Leave'),
('Nurse Boundaries Builder', 'Inadequate PPE or Equipment Support'),
('Nurse No More Pleaser', 'Compulsive Helping with Coworker Charts'),
('Nurse No More Pleaser', 'Unable to Say ''No'' to Shift Swaps'),
('Nurse No More Pleaser', 'Apologizing to Rude Physicians'),
('Nurse No More Pleaser', 'Over-accommodating Demanding Families'),
('Nurse No More Pleaser', 'Swallowing Conflict with Management'),
('Nurse No More Pleaser', 'Taking the ''Heavy'' Assignment to Be Nice'),
('Nurse No More Pleaser', 'Stayed Late for Non-Emergent Tasks'),
('Nurse No More Pleaser', 'Feeling Like a Burden When Asking for Help'),
('Nurse No More Pleaser', 'Delegation Guilt (Doing it all yourself)'),
('Nurse No More Pleaser', 'Fear of Professional Rejection'),
('Nurse No More Pleaser', 'Saying ''Yes'' to Committees When Exhausted'),
('Nurse No More Pleaser', 'Apologizing for Hospital System Failures'),
('Toxic Unit Shield', 'Lateral Violence (Nurse-to-Nurse Bullying)'),
('Toxic Unit Shield', 'Management Gaslighting About Ratios'),
('Toxic Unit Shield', 'Retaliatory Assignment Patterning'),
('Toxic Unit Shield', 'Hostile Breakroom Dynamics'),
('Toxic Unit Shield', 'Public Disrespect from Physicians'),
('Toxic Unit Shield', 'Exclusion from Unit Decision Making'),
('Toxic Unit Shield', 'Being Targetted by Senior Nursing Staff'),
('Toxic Unit Shield', 'Moral Injury from Unsafe Resource Allocation'),
('Toxic Unit Shield', 'Gossip and Unit Clique Dynamics'),
('Toxic Unit Shield', 'Passive-Aggressive Handoff Communication'),
('Toxic Unit Shield', 'Unfair Holiday/Weekend Scheduling')
ON CONFLICT DO NOTHING;

INSERT INTO pleaser_phases (level, title, mindset_shift, experiment) VALUES
(1, 'Awareness Mapping', 'Guilt is a signal of growth, not a failure of character.', 'Track one ''Yes'' that felt like self-betrayal today.'),
(2, 'Guilt Naming', 'Uncomfortable feelings are temporary; self-betrayal is lasting.', 'Observe the physical sensation of guilt without reacting to it.'),
(3, 'The Small Safe ''No''', 'Small boundaries build the muscle for high-stakes support.', 'Decline one low-consequence request (e.g., grabbing a soda for a peer).'),
(4, 'Clarifying Capacity', 'Honesty about bandwidth is a clinical safety skill.', 'State your current tasks before agreeing to a new request.'),
(5, 'Value Alignment', 'I serve my patients best when I am not emotionally depleted.', 'Identify one task you do solely for ''likability'' and pause it.'),
(6, 'The Peer Boundary', 'Coworkers are responsible for their own workload management.', 'Gently decline helping a peer with non-urgent charting.'),
(7, 'Managing Management', 'The hospital''s staffing crisis is not my personal emergency.', 'Say ''No'' to an extra shift without giving an elaborate excuse.'),
(8, 'The Resentment Audit', 'Resentment is a compass showing where I''m over-accommodating.', 'Address one recurring minor frustration directly with a peer.'),
(9, 'High-Stakes Support', 'My professional voice is the patient''s ultimate shield.', 'Escalate a safety concern even if it feels ''confrontational''.'),
(10, 'Maintenance & Mastery', 'Assertiveness is my new clinical baseline.', 'Mentor a newer nurse on setting their first professional boundary.')
ON CONFLICT (level) DO UPDATE SET
  title = EXCLUDED.title,
  mindset_shift = EXCLUDED.mindset_shift,
  experiment = EXCLUDED.experiment;

INSERT INTO social_proof_seeds (type, value) VALUES
('first_name', 'Sarah'), ('first_name', 'Emily'), ('first_name', 'Jessica'), ('first_name', 'Chloe'), ('first_name', 'Megan'),
('first_name', 'Samantha'), ('first_name', 'Ashley'), ('first_name', 'Olivia'), ('first_name', 'Hannah'), ('first_name', 'Grace'),
('first_name', 'Madison'), ('first_name', 'Abigail'), ('first_name', 'Isabella'), ('first_name', 'Sophie'), ('first_name', 'Emma'),
('first_name', 'Lauren'), ('first_name', 'Nicole'), ('first_name', 'Heather'), ('first_name', 'Amber'), ('first_name', 'Katherine'),
('first_name', 'Rebecca'), ('first_name', 'Victoria'), ('first_name', 'Jennifer'), ('first_name', 'Rachel'), ('first_name', 'Stephanie'),
('first_name', 'Amy'), ('first_name', 'Melissa'), ('first_name', 'Amanda'), ('first_name', 'Kelly'), ('first_name', 'Kimberly'),
('first_name', 'James'), ('first_name', 'Michael'), ('first_name', 'Robert'), ('first_name', 'William'), ('first_name', 'David'),
('first_name', 'Richard'), ('first_name', 'Thomas'), ('first_name', 'Christopher'), ('first_name', 'Joseph'), ('first_name', 'Daniel'),
('first_name', 'Matthew'), ('first_name', 'Anthony'), ('first_name', 'Mark'), ('first_name', 'Paul'), ('first_name', 'Steven'),
('first_name', 'Andrew'), ('first_name', 'Kenneth'), ('first_name', 'Joshua'), ('first_name', 'Kevin'), ('first_name', 'Brian'),
('first_name', 'Timothy'), ('first_name', 'Ronald'), ('first_name', 'George'), ('first_name', 'Edward'), ('first_name', 'Jason'),
('first_name', 'Jeffrey'), ('first_name', 'Gary'), ('first_name', 'Nicholas'), ('first_name', 'Stephen'), ('first_name', 'Eric'),
('first_name', 'Jacob'), ('first_name', 'Noah'), ('first_name', 'Liam'), ('first_name', 'Mason'), ('first_name', 'Ethan'),
('first_name', 'Logan'), ('first_name', 'Lucas'), ('first_name', 'Jackson'), ('first_name', 'Aiden'), ('first_name', 'Jack'),
('first_name', 'Ava'), ('first_name', 'Mia'), ('first_name', 'Sophia'), ('first_name', 'Charlotte'), ('first_name', 'Amelia'),
('first_name', 'Evelyn'), ('first_name', 'Harper'), ('first_name', 'Lily'), ('first_name', 'Ella'), ('first_name', 'Avery'),
('first_name', 'Oliver'), ('first_name', 'Benjamin'), ('first_name', 'Alexander'), ('first_name', 'Sebastian'), ('first_name', 'Owen'),
('first_name', 'Dylan'), ('first_name', 'Luke'), ('first_name', 'Henry'), ('first_name', 'Wyatt'), ('first_name', 'Carter'),
('first_name', 'Scarlett'), ('first_name', 'Victoria'), ('first_name', 'Aria'), ('first_name', 'Grace'), ('first_name', 'Chloe'),
('first_name', 'Camila'), ('first_name', 'Penelope'), ('first_name', 'Riley'), ('first_name', 'Layla'), ('first_name', 'Lillian'),
('first_name', 'Wei'), ('first_name', 'Yuki'), ('first_name', 'Priya'), ('first_name', 'Arjun'), ('first_name', 'Hana'),
('first_name', 'Kenji'), ('first_name', 'Mei'), ('first_name', 'Raj'), ('first_name', 'Anjali'), ('first_name', 'Haruto'),
('first_name', 'Lin'), ('first_name', 'Ravi'), ('first_name', 'Saki'), ('first_name', 'Min'), ('first_name', 'Ji-won'),
('first_name', 'Sora'), ('first_name', 'Kaito'), ('first_name', 'Ying'), ('first_name', 'Linh'), ('first_name', 'Sanjay'),
('first_name', 'Akira'), ('first_name', 'Hina'), ('first_name', 'Hiroshi'), ('first_name', 'Mina'), ('first_name', 'Ryota'),
('first_name', 'Sunita'), ('first_name', 'Tatsuya'), ('first_name', 'Xing'), ('first_name', 'Yoshiko'), ('first_name', 'Zihan'),
('first_name', 'Aadesh'), ('first_name', 'Baatar'), ('first_name', 'Chanh'), ('first_name', 'Daisuke'), ('first_name', 'Emi'),
('first_name', 'Fan'), ('first_name', 'Ganesh'), ('first_name', 'Hikari'), ('first_name', 'Ichiro'), ('first_name', 'Jun'),
('first_name', 'Kiran'), ('first_name', 'Laxmi'), ('first_name', 'Manoj'), ('first_name', 'Naoko'), ('first_name', 'Osamu'),
('first_name', 'Pradeep'), ('first_name', 'Qing'), ('first_name', 'Rina'), ('first_name', 'Shigeru'), ('first_name', 'Takeshi'),
('first_name', 'Usha'), ('first_name', 'Vikas'), ('first_name', 'Wen'), ('first_name', 'Xia'), ('first_name', 'Yumi'),
('first_name', 'Zhen'), ('first_name', 'Bao'), ('first_name', 'Chi'), ('first_name', 'Dinh'), ('first_name', 'Giang'),
('first_name', 'Hien'), ('first_name', 'Khoi'), ('first_name', 'Lam'), ('first_name', 'Minh'), ('first_name', 'Nam'),
('first_name', 'Phuc'), ('first_name', 'Quy'), ('first_name', 'Son'), ('first_name', 'Thanh'), ('first_name', 'Uyen'),
('first_name', 'Viet'), ('first_name', 'Xuan'), ('first_name', 'Yen'), ('first_name', 'An'), ('first_name', 'Binh'),
('first_name', 'Cam'), ('first_name', 'Dung'), ('first_name', 'Ha'), ('first_name', 'Isamu'), ('first_name', 'Jiro'),
('first_name', 'Kaori'), ('first_name', 'Le'), ('first_name', 'Mai'), ('first_name', 'Noriko'), ('first_name', 'Ryo'),
('first_name', 'Shin'), ('first_name', 'Taro'), ('first_name', 'Ume'), ('first_name', 'Yoko'), ('first_name', 'Zoya'),
('first_name', 'Aarav'), ('first_name', 'Vihaan'), ('first_name', 'Advait'), ('first_name', 'Saanvi'), ('first_name', 'Ananya'),
('first_name', 'Aadhya'), ('first_name', 'Ishaan'), ('first_name', 'Krish'), ('first_name', 'Sai'), ('first_name', 'Vedant'),
('first_name', 'Jamal'), ('first_name', 'Keisha'), ('first_name', 'Tunde'), ('first_name', 'Nia'), ('first_name', 'Malik'),
('first_name', 'Shola'), ('first_name', 'Amara'), ('first_name', 'Kofi'), ('first_name', 'Zola'), ('first_name', 'Kwesi'),
('first_name', 'Darnell'), ('first_name', 'Ebony'), ('first_name', 'Tyrone'), ('first_name', 'Aisha'), ('first_name', 'Xavier'),
('first_name', 'Lashonda'), ('first_name', 'Marquis'), ('first_name', 'Tanisha'), ('first_name', 'Terrell'), ('first_name', 'Latoya'),
('first_name', 'Andre'), ('first_name', 'Jada'), ('first_name', 'Desmond'), ('first_name', 'Shanice'), ('first_name', 'Jermaine'),
('first_name', 'Kiara'), ('first_name', 'Quentin'), ('first_name', 'Tiana'), ('first_name', 'Dante'), ('first_name', 'Imani'),
('first_name', 'Adebayo'), ('first_name', 'Bisi'), ('first_name', 'Chidi'), ('first_name', 'Dayo'), ('first_name', 'Eniola'),
('first_name', 'Femi'), ('first_name', 'Gamba'), ('first_name', 'Hakim'), ('first_name', 'Idris'), ('first_name', 'Jabari'),
('first_name', 'Kwame'), ('first_name', 'Luthando'), ('first_name', 'Musa'), ('first_name', 'Nnamdi'), ('first_name', 'Obi'),
('first_name', 'Paki'), ('first_name', 'Quadir'), ('first_name', 'Rashid'), ('first_name', 'Sekai'), ('first_name', 'Thabo'),
('first_name', 'Uzoma'), ('first_name', 'Vuyani'), ('first_name', 'Wekesa'), ('first_name', 'Xola'), ('first_name', 'Yao'),
('first_name', 'Zaire'), ('first_name', 'Ayotunde'), ('first_name', 'Babatunde'), ('first_name', 'Chisom'), ('first_name', 'Dumaza'),
('first_name', 'Effiong'), ('first_name', 'Faraji'), ('first_name', 'Gatimu'), ('first_name', 'Hamisi'), ('first_name', 'Iniko'),
('first_name', 'Jelani'), ('first_name', 'Kojo'), ('first_name', 'Lulu'), ('first_name', 'Mosi'), ('first_name', 'Nalo'),
('first_name', 'Okoth'), ('first_name', 'Panya'), ('first_name', 'Quisqueya'), ('first_name', 'Rudo'), ('first_name', 'Simba'),
('first_name', 'Tau'), ('first_name', 'Uche'), ('first_name', 'Vumbi'), ('first_name', 'Winda'), ('first_name', 'Xhosa'),
('first_name', 'Yeboah'), ('first_name', 'Zuberi'), ('first_name', 'Zendaya'), ('first_name', 'Amare'), ('first_name', 'Ira'),
('first_name', 'Kamari'), ('first_name', 'Kymani'), ('first_name', 'Omari'), ('first_name', 'Taye'), ('first_name', 'Zion'),
('first_name', 'Aaliyah'), ('first_name', 'Brianna'), ('first_name', 'Deja'), ('first_name', 'Destiny'), ('first_name', 'Diamond'),
('first_name', 'Essence'), ('first_name', 'Genesis'), ('first_name', 'Heaven'), ('first_name', 'India'), ('first_name', 'Journey'),
('first_name', 'Carlos'), ('first_name', 'Maria'), ('first_name', 'Jose'), ('first_name', 'Elena'), ('first_name', 'Miguel'),
('first_name', 'Sofia'), ('first_name', 'Juan'), ('first_name', 'Isabella'), ('first_name', 'Luis'), ('first_name', 'Camila'),
('first_name', 'Mateo'), ('first_name', 'Valentina'), ('first_name', 'Diego'), ('first_name', 'Lucia'), ('first_name', 'Alejandro'),
('first_name', 'Mariana'), ('first_name', 'Javier'), ('first_name', 'Ximena'), ('first_name', 'Ricardo'), ('first_name', 'Estrella'),
('first_name', 'Fernando'), ('first_name', 'Lola'), ('first_name', 'Raul'), ('first_name', 'Marisol'), ('first_name', 'Pedro'),
('first_name', 'Carmen'), ('first_name', 'Santiago'), ('first_name', 'Juana'), ('first_name', 'Antonio'), ('first_name', 'Pilar'),
('first_name', 'Adrian'), ('first_name', 'Beatriz'), ('first_name', 'Cesar'), ('first_name', 'Dolores'), ('first_name', 'Enrique'),
('first_name', 'Felicia'), ('first_name', 'Gabriel'), ('first_name', 'Hilda'), ('first_name', 'Ignacio'), ('first_name', 'Julia'),
('first_name', 'Leonardo'), ('first_name', 'Mercedes'), ('first_name', 'Nicolas'), ('first_name', 'Olga'), ('first_name', 'Pablo'),
('first_name', 'Queta'), ('first_name', 'Ramon'), ('first_name', 'Silvia'), ('first_name', 'Tomas'), ('first_name', 'Ursula'),
('first_name', 'Victor'), ('first_name', 'Yolanda'), ('first_name', 'Zoe'), ('first_name', 'Agustin'), ('first_name', 'Belinda'),
('first_name', 'Claudio'), ('first_name', 'Dora'), ('first_name', 'Emilio'), ('first_name', 'Florencia'), ('first_name', 'Guillermo'),
('first_name', 'Hugo'), ('first_name', 'Ines'), ('first_name', 'Joquin'), ('first_name', 'Katia'), ('first_name', 'Lorenzo'),
('first_name', 'Marta'), ('first_name', 'Noe'), ('first_name', 'Ofelia'), ('first_name', 'Pascual'), ('first_name', 'Raquel'),
('first_name', 'Salvador'), ('first_name', 'Teresa'), ('first_name', 'Uriel'), ('first_name', 'Veronica'), ('first_name', 'Wilfredo'),
('first_name', 'Xiomara'), ('first_name', 'Yadira'), ('first_name', 'Zulima'), ('first_name', 'Alvaro'), ('first_name', 'Blanca'),
('first_name', 'Dario'), ('first_name', 'Esperanza'), ('first_name', 'Facundo'), ('first_name', 'Graciela'), ('first_name', 'Hernan'),
('first_name', 'Irma'), ('first_name', 'Jorge'), ('first_name', 'Leonor'), ('first_name', 'Manuela'), ('first_name', 'Natalia'),
('first_name', 'Oscar'), ('first_name', 'Paola'), ('first_name', 'Quintin'), ('first_name', 'Rocio'), ('first_name', 'Sebastian'),
('first_name', 'Teodora'), ('first_name', 'Ubaldo'), ('first_name', 'Virginia'), ('first_name', 'Waldemar'), ('first_name', 'Yesenia'),
('city', 'New York, NY'), ('city', 'London, UK'), ('city', 'Toronto, ON'), ('city', 'Chicago, IL'), ('city', 'Los Angeles, CA'),
('city', 'Manchester, UK'), ('city', 'Vancouver, BC'), ('city', 'Austin, TX'), ('city', 'Houston, TX'), ('city', 'Seattle, WA'),
('city', 'Birmingham, UK'), ('city', 'Montreal, QC'), ('city', 'Calgary, AB'), ('city', 'Denver, CO'), ('city', 'Philadelphia, PA'),
('city', 'San Francisco, CA'), ('city', 'Boston, MA'), ('city', 'Ottawa, ON'), ('city', 'Leeds, UK'), ('city', 'Glasgow, UK'),
('plan', 'The Professional'), ('plan', 'Lifetime Shield')
ON CONFLICT DO NOTHING;

-- Initial announcements
INSERT INTO announcements (title, content, active)
VALUES 
  ('New Pricing Tiers Live!', 'We have introduced 3 Months and 1 Year access plans.', TRUE),
  ('System Maintenance', 'Scheduled maintenance on Sunday at 2 AM UTC.', FALSE)
ON CONFLICT DO NOTHING;

-- Add fallback policies just in case RLS remains enabled
DROP POLICY IF EXISTS "Allow all on profiles" ON profiles;
CREATE POLICY "Allow all on profiles" ON profiles FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on user_stats" ON user_stats;
CREATE POLICY "Allow all on user_stats" ON user_stats FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on boundary_plans" ON boundary_plans;
CREATE POLICY "Allow all on boundary_plans" ON boundary_plans FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on otps" ON otps;
CREATE POLICY "Allow all on otps" ON otps FOR ALL USING (true) WITH CHECK (true);
