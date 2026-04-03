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
