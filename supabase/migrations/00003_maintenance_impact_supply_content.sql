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
-- VIEWS
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
GROUP BY i.id, t.name;

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
-- ROW LEVEL SECURITY
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
  ON impact_metrics FOR SELECT USING (is_public = TRUE);

CREATE POLICY "Public can view active units"
  ON units FOR SELECT USING (status = 'unit_operational');

CREATE POLICY "Admins can do everything on leads"
  ON leads FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('super_admin', 'admin', 'manager')
    )
  );

CREATE POLICY "Investors see own investments"
  ON investments FOR SELECT USING (
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
