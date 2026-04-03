-- ═══════════════════════════════════════
-- JAL NEETI TECHNOLOGIES — FULL DATABASE SCHEMA
-- Execute in Supabase SQL Editor
-- ═══════════════════════════════════════

-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═══════════════════════════════════════
-- LOOKUP / REFERENCE TABLES
-- ═══════════════════════════════════════

CREATE TABLE ref_status (
  code TEXT PRIMARY KEY,
  domain TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  color TEXT
);

INSERT INTO ref_status (code, domain, label, sort_order, color) VALUES
  ('lead_new', 'lead', 'New', 1, '#3B82F6'),
  ('lead_contacted', 'lead', 'Contacted', 2, '#8B5CF6'),
  ('lead_qualified', 'lead', 'Qualified', 3, '#F59E0B'),
  ('lead_converted', 'lead', 'Converted', 4, '#22C55E'),
  ('lead_lost', 'lead', 'Lost', 5, '#EF4444'),
  ('inv_interested', 'investor', 'Interested', 1, '#3B82F6'),
  ('inv_call_scheduled', 'investor', 'Call Scheduled', 2, '#8B5CF6'),
  ('inv_due_diligence', 'investor', 'Due Diligence', 3, '#F59E0B'),
  ('inv_committed', 'investor', 'Committed', 4, '#22C55E'),
  ('inv_funded', 'investor', 'Funded', 5, '#14B8A6'),
  ('inv_declined', 'investor', 'Declined', 6, '#EF4444'),
  ('tender_discovered', 'tender', 'Discovered', 1, '#94A3B8'),
  ('tender_monitoring', 'tender', 'Monitoring', 2, '#3B82F6'),
  ('tender_evaluating', 'tender', 'Evaluating', 3, '#8B5CF6'),
  ('tender_preparing', 'tender', 'Preparing Bid', 4, '#F59E0B'),
  ('tender_submitted', 'tender', 'Submitted', 5, '#14B8A6'),
  ('tender_won', 'tender', 'Won', 6, '#22C55E'),
  ('tender_lost', 'tender', 'Lost', 7, '#EF4444'),
  ('tender_expired', 'tender', 'Expired', 8, '#94A3B8'),
  ('unit_manufacturing', 'unit', 'Manufacturing', 1, '#F59E0B'),
  ('unit_testing', 'unit', 'Factory Testing', 2, '#8B5CF6'),
  ('unit_transit', 'unit', 'In Transit', 3, '#3B82F6'),
  ('unit_commissioning', 'unit', 'Commissioning', 4, '#14B8A6'),
  ('unit_operational', 'unit', 'Operational', 5, '#22C55E'),
  ('unit_maintenance', 'unit', 'Under Maintenance', 6, '#F59E0B'),
  ('unit_offline', 'unit', 'Offline', 7, '#EF4444'),
  ('unit_decommissioned', 'unit', 'Decommissioned', 8, '#94A3B8'),
  ('app_new', 'application', 'New', 1, '#3B82F6'),
  ('app_reviewing', 'application', 'Reviewing', 2, '#8B5CF6'),
  ('app_shortlisted', 'application', 'Shortlisted', 3, '#F59E0B'),
  ('app_interview', 'application', 'Interview Scheduled', 4, '#14B8A6'),
  ('app_offered', 'application', 'Offered', 5, '#22C55E'),
  ('app_hired', 'application', 'Hired', 6, '#22C55E'),
  ('app_rejected', 'application', 'Rejected', 7, '#EF4444'),
  ('wo_open', 'work_order', 'Open', 1, '#3B82F6'),
  ('wo_assigned', 'work_order', 'Assigned', 2, '#8B5CF6'),
  ('wo_in_progress', 'work_order', 'In Progress', 3, '#F59E0B'),
  ('wo_completed', 'work_order', 'Completed', 4, '#22C55E'),
  ('wo_verified', 'work_order', 'Verified', 5, '#14B8A6'),
  ('contract_draft', 'contract', 'Draft', 1, '#94A3B8'),
  ('contract_negotiating', 'contract', 'Negotiating', 2, '#F59E0B'),
  ('contract_signed', 'contract', 'Signed', 3, '#22C55E'),
  ('contract_active', 'contract', 'Active', 4, '#14B8A6'),
  ('contract_expired', 'contract', 'Expired', 5, '#94A3B8'),
  ('contract_terminated', 'contract', 'Terminated', 6, '#EF4444');

-- ═══════════════════════════════════════
-- CORE PLATFORM
-- ═══════════════════════════════════════

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL DEFAULT 'jalneeti',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO organizations (name, slug, type) VALUES ('Jal Neeti Technologies Pvt Ltd', 'jalneeti', 'jalneeti');

CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  org_id UUID REFERENCES organizations(id),
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'viewer',
  permissions JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  changes JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type TEXT NOT NULL,
  channel TEXT NOT NULL DEFAULT 'in_app',
  title TEXT NOT NULL,
  body TEXT,
  action_url TEXT,
  entity_type TEXT,
  entity_id UUID,
  is_read BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  enabled BOOLEAN DEFAULT FALSE,
  description TEXT,
  rollout_pct INT DEFAULT 0,
  metadata JSONB DEFAULT '{}'
);

-- ═══════════════════════════════════════
-- SALES & CRM
-- ═══════════════════════════════════════

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  designation TEXT,
  organization_name TEXT,
  source TEXT NOT NULL,
  lead_type TEXT NOT NULL,
  country TEXT DEFAULT 'India',
  state TEXT,
  city TEXT,
  location geography(POINT, 4326),
  status TEXT NOT NULL DEFAULT 'lead_new' REFERENCES ref_status(code),
  score INT DEFAULT 0,
  estimated_value NUMERIC,
  last_contacted_at TIMESTAMPTZ,
  next_followup_at TIMESTAMPTZ,
  assigned_to UUID REFERENCES users(id),
  metadata JSONB DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  converted_to_account_id UUID,
  converted_at TIMESTAMPTZ,
  created_by UUID REFERENCES users(id),
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_type ON leads(lead_type);
CREATE INDEX idx_leads_state ON leads(state);
CREATE INDEX idx_leads_next_followup ON leads(next_followup_at) WHERE next_followup_at IS NOT NULL;
CREATE INDEX idx_leads_tags ON leads USING GIN(tags);
CREATE INDEX idx_leads_trgm_name ON leads USING GIN(full_name gin_trgm_ops);

CREATE TABLE lead_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id),
  activity_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  performed_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════
-- INVESTOR RELATIONS
-- ═══════════════════════════════════════

CREATE TABLE investment_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  min_amount NUMERIC NOT NULL,
  max_amount NUMERIC,
  currency TEXT DEFAULT 'INR',
  benefits JSONB NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0
);

CREATE TABLE investors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  lead_id UUID REFERENCES leads(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  nationality TEXT,
  residency_country TEXT,
  nri_status TEXT,
  pan_number TEXT,
  tier_id UUID REFERENCES investment_tiers(id),
  total_invested NUMERIC DEFAULT 0,
  total_equity_pct NUMERIC DEFAULT 0,
  has_portal_access BOOLEAN DEFAULT TRUE,
  has_board_observer BOOLEAN DEFAULT FALSE,
  preferred_language TEXT DEFAULT 'en',
  timezone TEXT DEFAULT 'Asia/Kolkata',
  onboarded_at TIMESTAMPTZ,
  status TEXT DEFAULT 'inv_interested' REFERENCES ref_status(code),
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id UUID NOT NULL REFERENCES investors(id),
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  exchange_rate NUMERIC,
  amount_inr NUMERIC NOT NULL,
  equity_pct NUMERIC,
  instrument TEXT NOT NULL,
  payment_method TEXT,
  payment_ref TEXT,
  payment_status TEXT DEFAULT 'pending',
  received_at TIMESTAMPTZ,
  share_certificate_number TEXT,
  agreement_doc_url TEXT,
  blockchain_tx_hash TEXT,
  blockchain_verified BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE fund_utilization (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  subcategory TEXT,
  description TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  spent_at DATE NOT NULL,
  unit_id UUID,
  contract_id UUID,
  vendor_id UUID,
  invoice_url TEXT,
  receipt_url TEXT,
  approved_by UUID REFERENCES users(id),
  blockchain_tx_hash TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE investor_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  quarter TEXT,
  attachments JSONB DEFAULT '[]',
  is_public BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════
-- SITES & ASSET MANAGEMENT
-- ═══════════════════════════════════════

CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  site_code TEXT UNIQUE,
  site_type TEXT NOT NULL,
  address TEXT,
  city TEXT NOT NULL,
  district TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT,
  location geography(POINT, 4326),
  population_served INT,
  sewage_generation_kld NUMERIC,
  power_availability TEXT,
  road_access TEXT,
  flood_risk TEXT,
  land_ownership TEXT,
  land_area_sqm NUMERIC,
  customer_lead_id UUID REFERENCES leads(id),
  customer_contact_name TEXT,
  customer_contact_phone TEXT,
  status TEXT DEFAULT 'prospective',
  survey_date DATE,
  survey_report_url TEXT,
  photos JSONB DEFAULT '[]',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sites_location ON sites USING GIST(location);
CREATE INDEX idx_sites_state ON sites(state);
CREATE INDEX idx_sites_status ON sites(status);

CREATE TABLE units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  serial_number TEXT UNIQUE NOT NULL,
  model TEXT NOT NULL,
  variant TEXT DEFAULT 'standard',
  name TEXT,
  capacity_kld NUMERIC NOT NULL,
  site_id UUID REFERENCES sites(id),
  assembly_started_at DATE,
  assembly_completed_at DATE,
  factory_test_passed_at DATE,
  qc_certificate_url TEXT,
  shipped_at DATE,
  delivered_at DATE,
  commissioned_at DATE,
  commissioned_by UUID REFERENCES users(id),
  solar_capacity_kwp NUMERIC,
  battery_capacity_kwh NUMERIC,
  has_generator BOOLEAN DEFAULT FALSE,
  generator_type TEXT,
  generator_capacity_kva NUMERIC,
  iot_gateway_id TEXT,
  iot_sim_number TEXT,
  iot_firmware_version TEXT,
  mqtt_topic TEXT,
  bio_media_type TEXT,
  diffuser_type TEXT,
  polishing_type TEXT,
  tank_material TEXT,
  contract_id UUID,
  status TEXT DEFAULT 'unit_manufacturing' REFERENCES ref_status(code),
  warranty_expiry DATE,
  total_litres_treated BIGINT DEFAULT 0,
  total_operating_hours INT DEFAULT 0,
  total_biogas_m3 NUMERIC DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  photos JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_units_serial ON units(serial_number);
CREATE INDEX idx_units_model ON units(model);
CREATE INDEX idx_units_status ON units(status);
CREATE INDEX idx_units_site ON units(site_id);

CREATE TABLE unit_components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES units(id),
  component_type TEXT NOT NULL,
  manufacturer TEXT,
  model_number TEXT,
  serial_number TEXT,
  installed_at DATE,
  warranty_expiry DATE,
  expected_life_years NUMERIC,
  replacement_cost NUMERIC,
  last_serviced_at DATE,
  next_service_due DATE,
  status TEXT DEFAULT 'operational',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════
-- IoT & MONITORING
-- ═══════════════════════════════════════

CREATE TABLE sensor_readings (
  id UUID DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES units(id),
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ph_inlet NUMERIC,
  ph_outlet NUMERIC,
  bod_outlet NUMERIC,
  cod_outlet NUMERIC,
  tss_outlet NUMERIC,
  do_mbbr NUMERIC,
  ammonia_outlet NUMERIC,
  turbidity_outlet NUMERIC,
  flow_inlet_lph NUMERIC,
  flow_outlet_lph NUMERIC,
  cumulative_litres BIGINT,
  temp_mbbr NUMERIC,
  temp_ambient NUMERIC,
  power_source TEXT,
  power_consumption_kw NUMERIC,
  solar_generation_kw NUMERIC,
  battery_soc_pct NUMERIC,
  sludge_level_abr_pct NUMERIC,
  sludge_level_clarifier_pct NUMERIC,
  biogas_flow_lph NUMERIC,
  blower_speed_rpm NUMERIC,
  blower_current_a NUMERIC,
  is_alarm BOOLEAN DEFAULT FALSE,
  alarm_codes TEXT[],
  raw_payload JSONB,
  PRIMARY KEY (id, recorded_at)
) PARTITION BY RANGE (recorded_at);

CREATE TABLE sensor_readings_2027_q1 PARTITION OF sensor_readings
  FOR VALUES FROM ('2027-01-01') TO ('2027-04-01');
CREATE TABLE sensor_readings_2027_q2 PARTITION OF sensor_readings
  FOR VALUES FROM ('2027-04-01') TO ('2027-07-01');
CREATE TABLE sensor_readings_2027_q3 PARTITION OF sensor_readings
  FOR VALUES FROM ('2027-07-01') TO ('2027-10-01');
CREATE TABLE sensor_readings_2027_q4 PARTITION OF sensor_readings
  FOR VALUES FROM ('2027-10-01') TO ('2028-01-01');

CREATE INDEX idx_sensor_unit_time ON sensor_readings(unit_id, recorded_at DESC);
CREATE INDEX idx_sensor_alarms ON sensor_readings(unit_id, recorded_at DESC) WHERE is_alarm = TRUE;

CREATE TABLE daily_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES units(id),
  date DATE NOT NULL,
  litres_treated NUMERIC,
  avg_bod NUMERIC,
  avg_cod NUMERIC,
  avg_tss NUMERIC,
  avg_ph NUMERIC,
  avg_do NUMERIC,
  cpcb_compliant BOOLEAN,
  compliance_pct NUMERIC,
  total_kwh_consumed NUMERIC,
  solar_kwh NUMERIC,
  grid_kwh NUMERIC,
  generator_kwh NUMERIC,
  generator_fuel_litres NUMERIC,
  biogas_m3 NUMERIC,
  uptime_hours NUMERIC,
  uptime_pct NUMERIC,
  alarm_count INT DEFAULT 0,
  energy_cost_inr NUMERIC,
  cost_per_kl NUMERIC,
  co2e_prevented_kg NUMERIC,
  UNIQUE(unit_id, date)
);

CREATE INDEX idx_daily_unit_date ON daily_summaries(unit_id, date DESC);

CREATE TABLE alert_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  parameter TEXT NOT NULL,
  condition TEXT NOT NULL,
  threshold NUMERIC NOT NULL,
  severity TEXT NOT NULL DEFAULT 'warning',
  notify_channels TEXT[] DEFAULT '{"in_app"}',
  escalation_minutes INT DEFAULT 30,
  is_active BOOLEAN DEFAULT TRUE,
  applies_to_models TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES units(id),
  rule_id UUID REFERENCES alert_rules(id),
  severity TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  parameter TEXT,
  value NUMERIC,
  threshold NUMERIC,
  acknowledged_at TIMESTAMPTZ,
  acknowledged_by UUID REFERENCES users(id),
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES users(id),
  resolution_notes TEXT,
  escalated BOOLEAN DEFAULT FALSE,
  escalated_to UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════
-- CONTRACTS & REVENUE
-- ═══════════════════════════════════════

CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_number TEXT UNIQUE,
  customer_name TEXT NOT NULL,
  customer_lead_id UUID REFERENCES leads(id),
  site_id UUID REFERENCES sites(id),
  contract_type TEXT NOT NULL,
  total_value NUMERIC,
  currency TEXT DEFAULT 'INR',
  start_date DATE,
  end_date DATE,
  duration_years INT,
  subsidy_scheme TEXT,
  subsidy_pct NUMERIC,
  subsidy_amount NUMERIC,
  subsidy_status TEXT,
  monthly_om_fee NUMERIC,
  annual_escalation_pct NUMERIC DEFAULT 5,
  water_sale_rate_per_kl NUMERIC,
  contract_doc_url TEXT,
  status TEXT DEFAULT 'contract_draft' REFERENCES ref_status(code),
  signed_at DATE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE units ADD CONSTRAINT fk_units_contract FOREIGN KEY (contract_id) REFERENCES contracts(id);

CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL REFERENCES contracts(id),
  unit_id UUID REFERENCES units(id),
  invoice_number TEXT UNIQUE NOT NULL,
  invoice_type TEXT NOT NULL,
  period_start DATE,
  period_end DATE,
  subtotal NUMERIC NOT NULL,
  gst_pct NUMERIC DEFAULT 18,
  gst_amount NUMERIC,
  total NUMERIC NOT NULL,
  due_date DATE,
  paid_amount NUMERIC DEFAULT 0,
  payment_status TEXT DEFAULT 'pending',
  paid_at DATE,
  payment_ref TEXT,
  invoice_pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE water_metering (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES units(id),
  date DATE NOT NULL,
  litres_treated NUMERIC NOT NULL,
  litres_sold NUMERIC,
  buyer_type TEXT,
  rate_per_kl NUMERIC,
  revenue_inr NUMERIC,
  UNIQUE(unit_id, date)
);

CREATE TABLE byproduct_sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES units(id),
  date DATE NOT NULL,
  product_type TEXT NOT NULL,
  quantity NUMERIC NOT NULL,
  unit_of_measure TEXT,
  rate NUMERIC,
  revenue_inr NUMERIC,
  buyer_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════
-- GOVERNMENT & COMPLIANCE
-- ═══════════════════════════════════════

CREATE TABLE tenders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tender_id_external TEXT,
  title TEXT NOT NULL,
  description TEXT,
  issuing_authority TEXT NOT NULL,
  portal TEXT,
  portal_url TEXT,
  state TEXT NOT NULL,
  district TEXT,
  scheme TEXT,
  category TEXT,
  estimated_value NUMERIC,
  emd_amount NUMERIC,
  published_at DATE,
  prebid_meeting_at TIMESTAMPTZ,
  submission_deadline TIMESTAMPTZ,
  opening_at TIMESTAMPTZ,
  award_date DATE,
  status TEXT DEFAULT 'tender_discovered' REFERENCES ref_status(code),
  decision TEXT,
  decision_reason TEXT,
  bid_amount NUMERIC,
  bid_submitted_at TIMESTAMPTZ,
  bid_doc_url TEXT,
  won BOOLEAN,
  winning_amount NUMERIC,
  winner_name TEXT,
  assigned_to UUID REFERENCES users(id),
  documents JSONB DEFAULT '[]',
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  created_by UUID REFERENCES users(id),
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tenders_deadline ON tenders(submission_deadline) WHERE submission_deadline > NOW();
CREATE INDEX idx_tenders_status ON tenders(status);
CREATE INDEX idx_tenders_state ON tenders(state);
CREATE INDEX idx_tenders_scheme ON tenders(scheme);

CREATE TABLE initiatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name TEXT NOT NULL,
  description TEXT,
  state TEXT NOT NULL,
  district TEXT NOT NULL,
  city_village TEXT,
  location geography(POINT, 4326),
  scheme TEXT,
  initiative_type TEXT,
  capacity_mld NUMERIC,
  estimated_cost NUMERIC,
  status TEXT NOT NULL,
  implementing_agency TEXT,
  contractor TEXT,
  planned_start DATE,
  planned_completion DATE,
  actual_start DATE,
  actual_completion DATE,
  opportunity_type TEXT,
  opportunity_notes TEXT,
  related_tender_id UUID REFERENCES tenders(id),
  source_url TEXT,
  source_name TEXT,
  last_verified_at DATE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_initiatives_location ON initiatives USING GIST(location);
CREATE INDEX idx_initiatives_state ON initiatives(state);
CREATE INDEX idx_initiatives_opportunity ON initiatives(opportunity_type) WHERE opportunity_type != 'none';

CREATE TABLE permits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID REFERENCES units(id),
  site_id UUID REFERENCES sites(id),
  permit_type TEXT NOT NULL,
  issuing_authority TEXT NOT NULL,
  applied_at DATE,
  issued_at DATE,
  valid_until DATE,
  renewal_due DATE,
  permit_number TEXT,
  document_url TEXT,
  status TEXT DEFAULT 'applied',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE compliance_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES units(id),
  report_type TEXT NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  compliant BOOLEAN,
  parameters_tested JSONB,
  submitted_to TEXT,
  submitted_at DATE,
  report_url TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════
-- HIRING & PEOPLE
-- ═══════════════════════════════════════

CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

INSERT INTO departments (name, slug) VALUES
  ('Engineering', 'engineering'),
  ('Operations', 'operations'),
  ('Community & Rural', 'community'),
  ('Finance & Compliance', 'finance'),
  ('Technology & IoT', 'tech'),
  ('Sales & Partnerships', 'sales'),
  ('Leadership', 'leadership');

CREATE TABLE job_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  department_id UUID REFERENCES departments(id),
  location TEXT NOT NULL,
  location_type TEXT DEFAULT 'on_site',
  employment_type TEXT NOT NULL,
  salary_band TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  benefits TEXT,
  application_deadline DATE,
  max_applicants INT,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  slug TEXT UNIQUE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES job_listings(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  linkedin_url TEXT,
  resume_url TEXT,
  cover_note TEXT,
  source TEXT,
  referral_by TEXT,
  status TEXT DEFAULT 'app_new' REFERENCES ref_status(code),
  rating INT,
  reviewer_notes TEXT,
  interview_scheduled_at TIMESTAMPTZ,
  interview_type TEXT,
  interview_feedback TEXT,
  offer_made_at DATE,
  offer_amount TEXT,
  offer_accepted BOOLEAN,
  joined_at DATE,
  reviewed_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_job ON applications(job_id);

CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  application_id UUID REFERENCES applications(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  employee_code TEXT UNIQUE,
  department_id UUID REFERENCES departments(id),
  designation TEXT NOT NULL,
  location TEXT NOT NULL,
  employment_type TEXT NOT NULL,
  joined_at DATE NOT NULL,
  salary_ctc NUMERIC,
  reporting_to UUID REFERENCES employees(id),
  is_active BOOLEAN DEFAULT TRUE,
  left_at DATE,
  leaving_reason TEXT,
  skills TEXT[],
  certifications JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE jal_mitras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  language TEXT DEFAULT 'hindi',
  village TEXT NOT NULL,
  district TEXT NOT NULL,
  state TEXT NOT NULL,
  unit_ids UUID[] DEFAULT '{}',
  site_ids UUID[] DEFAULT '{}',
  trained_at DATE,
  training_level TEXT,
  certification_url TEXT,
  monthly_stipend NUMERIC,
  payment_method TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════
-- MAINTENANCE & WORK ORDERS
-- ═══════════════════════════════════════

CREATE TABLE maintenance_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_name TEXT NOT NULL,
  description TEXT,
  component_type TEXT,
  applies_to_models TEXT[] DEFAULT '{}',
  frequency_days INT NOT NULL,
  priority TEXT DEFAULT 'medium',
  estimated_duration_hrs NUMERIC,
  requires_specialist BOOLEAN DEFAULT FALSE,
  instructions TEXT,
  checklist JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE work_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wo_number TEXT UNIQUE,
  wo_type TEXT NOT NULL,
  trigger_type TEXT,
  alert_id UUID REFERENCES alerts(id),
  schedule_id UUID REFERENCES maintenance_schedules(id),
  unit_id UUID NOT NULL REFERENCES units(id),
  site_id UUID REFERENCES sites(id),
  component_type TEXT,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium',
  assigned_to UUID REFERENCES users(id),
  jal_mitra_id UUID REFERENCES jal_mitras(id),
  scheduled_for DATE,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  resolution_notes TEXT,
  parts_used JSONB DEFAULT '[]',
  labor_hours NUMERIC,
  total_cost NUMERIC,
  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMPTZ,
  before_photos JSONB DEFAULT '[]',
  after_photos JSONB DEFAULT '[]',
  status TEXT DEFAULT 'wo_open' REFERENCES ref_status(code),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_wo_unit ON work_orders(unit_id);
CREATE INDEX idx_wo_status ON work_orders(status);
CREATE INDEX idx_wo_scheduled ON work_orders(scheduled_for) WHERE status IN ('wo_open', 'wo_assigned');

-- ═══════════════════════════════════════
-- IMPACT & TRANSPARENCY
-- ═══════════════════════════════════════

CREATE TABLE impact_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_key TEXT UNIQUE NOT NULL,
  metric_value NUMERIC NOT NULL,
  display_unit TEXT,
  display_label TEXT NOT NULL,
  display_format TEXT,
  category TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO impact_metrics (metric_key, metric_value, display_unit, display_label, display_format, category, sort_order) VALUES
  ('total_litres_treated', 0, 'litres', 'Litres Treated', 'compact', 'impact', 1),
  ('total_units_deployed', 0, 'units', 'JalBox Units Deployed', 'number', 'operational', 2),
  ('total_households_served', 0, 'households', 'Households Served', 'compact', 'impact', 3),
  ('total_villages_served', 0, 'villages', 'Villages Served', 'number', 'impact', 4),
  ('total_cities_served', 0, 'cities', 'Cities Served', 'number', 'impact', 5),
  ('total_jobs_created', 0, 'jobs', 'Jobs Created', 'number', 'community', 6),
  ('total_co2e_prevented', 0, 'tonnes_co2e', 'Tonnes CO2e Prevented', 'compact', 'impact', 7),
  ('total_funds_raised', 0, 'INR', 'Funds Raised', 'currency', 'financial', 8),
  ('total_funds_deployed', 0, 'INR', 'Funds Deployed', 'currency', 'financial', 9),
  ('stp_uptime_pct', 0, '%', 'Average STP Uptime', 'percentage', 'operational', 10);

CREATE TABLE carbon_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID NOT NULL REFERENCES units(id),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  methodology TEXT,
  methane_prevented_tonnes NUMERIC,
  co2e_tonnes NUMERIC NOT NULL,
  credits_issued NUMERIC,
  credit_price_usd NUMERIC,
  revenue_usd NUMERIC,
  verification_body TEXT,
  certificate_url TEXT,
  status TEXT DEFAULT 'calculated',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE community_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID REFERENCES units(id),
  site_id UUID REFERENCES sites(id),
  respondent_name TEXT,
  respondent_type TEXT,
  rating INT,
  category TEXT,
  feedback_text TEXT,
  responded_by UUID REFERENCES users(id),
  response_text TEXT,
  responded_at TIMESTAMPTZ,
  collected_via TEXT,
  collected_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════
-- SUPPLY CHAIN & INVENTORY
-- ═══════════════════════════════════════

CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  gst_number TEXT,
  material_source TEXT,
  is_bioneer_supplier BOOLEAN DEFAULT FALSE,
  quality_rating NUMERIC,
  delivery_rating NUMERIC,
  price_rating NUMERIC,
  overall_rating NUMERIC,
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bom_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model TEXT NOT NULL,
  variant TEXT NOT NULL,
  version INT DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  items JSONB NOT NULL,
  total_cost NUMERIC,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE purchase_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  po_number TEXT UNIQUE NOT NULL,
  vendor_id UUID NOT NULL REFERENCES vendors(id),
  items JSONB NOT NULL,
  total_amount NUMERIC NOT NULL,
  gst_amount NUMERIC,
  grand_total NUMERIC NOT NULL,
  unit_ids UUID[] DEFAULT '{}',
  ordered_at DATE,
  expected_delivery DATE,
  delivered_at DATE,
  payment_status TEXT DEFAULT 'pending',
  payment_terms TEXT,
  status TEXT DEFAULT 'draft',
  po_doc_url TEXT,
  invoice_url TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════
-- CONTENT & COMMS
-- ═══════════════════════════════════════

CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  body TEXT NOT NULL,
  cover_image_url TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  author_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_name TEXT NOT NULL,
  designation TEXT,
  organization TEXT,
  quote TEXT NOT NULL,
  photo_url TEXT,
  unit_id UUID REFERENCES units(id),
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE contact_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  category TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  assigned_to UUID REFERENCES users(id),
  response_notes TEXT,
  responded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════
-- VIEWS FOR COMMON QUERIES
-- ═══════════════════════════════════════

CREATE VIEW v_active_units AS
SELECT
  u.id, u.serial_number, u.model, u.variant, u.name, u.capacity_kld, u.status,
  u.commissioned_at, u.total_litres_treated, u.total_operating_hours,
  s.name AS site_name, s.city, s.district, s.state, s.site_type,
  s.location, s.population_served,
  u.solar_capacity_kwp, u.battery_capacity_kwh, u.has_generator,
  u.bio_media_type, u.diffuser_type, u.polishing_type
FROM units u
LEFT JOIN sites s ON u.site_id = s.id
WHERE u.status NOT IN ('unit_decommissioned');

CREATE VIEW v_investor_portfolio AS
SELECT
  i.id, i.full_name, i.email, i.residency_country, i.nri_status,
  i.status, i.tier_id, t.name AS tier_name,
  i.total_invested, i.total_equity_pct,
  COUNT(inv.id) AS investment_count,
  MAX(inv.received_at) AS last_investment_at
FROM investors i
LEFT JOIN investment_tiers t ON i.tier_id = t.id
LEFT JOIN investments inv ON inv.investor_id = i.id
GROUP BY i.id, i.full_name, i.email, i.residency_country, i.nri_status,
         i.status, i.tier_id, t.name, i.total_invested, i.total_equity_pct;

CREATE VIEW v_upcoming_tenders AS
SELECT
  id, title, issuing_authority, state, district, scheme,
  estimated_value, submission_deadline, status, assigned_to,
  submission_deadline - CURRENT_DATE AS days_remaining
FROM tenders
WHERE submission_deadline > CURRENT_DATE
  AND status NOT IN ('tender_won', 'tender_lost', 'tender_expired')
ORDER BY submission_deadline ASC;

CREATE VIEW v_unit_health AS
SELECT
  u.id, u.serial_number, u.name, u.model, u.status,
  s.city, s.state,
  ds.date AS last_summary_date,
  ds.litres_treated AS yesterday_litres,
  ds.avg_bod, ds.avg_tss, ds.avg_ph, ds.avg_do,
  ds.cpcb_compliant, ds.uptime_pct,
  ds.energy_cost_inr, ds.cost_per_kl,
  (SELECT COUNT(*) FROM alerts a WHERE a.unit_id = u.id AND a.resolved_at IS NULL) AS open_alerts,
  (SELECT COUNT(*) FROM work_orders wo WHERE wo.unit_id = u.id AND wo.status IN ('wo_open', 'wo_assigned', 'wo_in_progress')) AS open_work_orders
FROM units u
LEFT JOIN sites s ON u.site_id = s.id
LEFT JOIN daily_summaries ds ON ds.unit_id = u.id AND ds.date = CURRENT_DATE - 1
WHERE u.status = 'unit_operational';

-- ═══════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE sensor_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view impact metrics"
  ON impact_metrics FOR SELECT
  USING (is_public = TRUE);

CREATE POLICY "Public can view active units"
  ON units FOR SELECT
  USING (status = 'unit_operational');

CREATE POLICY "Admins can do everything on leads"
  ON leads FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('super_admin', 'admin', 'manager')
    )
  );

CREATE POLICY "Investors see own investments"
  ON investments FOR SELECT
  USING (
    investor_id IN (
      SELECT id FROM investors WHERE user_id = auth.uid()
    )
  );

-- ═══════════════════════════════════════
-- FUNCTIONS & TRIGGERS
-- ═══════════════════════════════════════

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  t TEXT;
BEGIN
  FOR t IN
    SELECT table_name FROM information_schema.columns
    WHERE column_name = 'updated_at'
    AND table_schema = 'public'
  LOOP
    EXECUTE format(
      'CREATE TRIGGER trg_%s_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at()',
      t, t
    );
  END LOOP;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_unit_serial()
RETURNS TRIGGER AS $$
DECLARE
  prefix TEXT;
  year_str TEXT;
  seq INT;
BEGIN
  prefix := CASE NEW.model
    WHEN 'jalbox_10' THEN 'JB10'
    WHEN 'jalbox_25' THEN 'JB25'
    WHEN 'jalbox_50' THEN 'JB50'
    WHEN 'jalbox_flexi' THEN 'JBF'
    ELSE 'JBX'
  END;
  year_str := TO_CHAR(NOW(), 'YYYY');
  SELECT COALESCE(MAX(
    CAST(SPLIT_PART(serial_number, '-', 3) AS INT)
  ), 0) + 1 INTO seq
  FROM units
  WHERE serial_number LIKE prefix || '-' || year_str || '-%';
  NEW.serial_number := prefix || '-' || year_str || '-' || LPAD(seq::TEXT, 3, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_unit_serial
BEFORE INSERT ON units
FOR EACH ROW
WHEN (NEW.serial_number IS NULL)
EXECUTE FUNCTION generate_unit_serial();

-- ═══════════════════════════════════════
-- DONE — Schema complete
-- ═══════════════════════════════════════
