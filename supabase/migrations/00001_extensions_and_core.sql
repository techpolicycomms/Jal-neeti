-- Jal Neeti Technologies — Complete Database Schema
-- Run in Supabase SQL Editor
-- ═══════════════════════════════════════
-- EXTENSIONS
-- ═══════════════════════════════════════
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
