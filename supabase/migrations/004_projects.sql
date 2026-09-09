-- MyCoinMap: multiple projects. Safe to run more than once.

CREATE TABLE IF NOT EXISTS crm_projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  notes TEXT,
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed the project you already have, so nothing existing loses its home.
INSERT INTO crm_projects (id, name, location, is_default)
VALUES ('kani17', '17 Kani', 'Tripura', TRUE)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE plots ADD COLUMN IF NOT EXISTS project_id TEXT REFERENCES crm_projects(id);
UPDATE plots SET project_id = 'kani17' WHERE project_id IS NULL;

ALTER TABLE crm_leads ADD COLUMN IF NOT EXISTS project_id TEXT REFERENCES crm_projects(id);
UPDATE crm_leads l SET project_id = COALESCE(
  (SELECT p.project_id FROM plots p WHERE p.id = l.plot_id),
  (SELECT id FROM crm_projects WHERE is_default LIMIT 1)
) WHERE project_id IS NULL;

ALTER TABLE crm_money ADD COLUMN IF NOT EXISTS project_id TEXT REFERENCES crm_projects(id);
UPDATE crm_money m SET project_id = COALESCE(
  (SELECT p.project_id FROM plots p WHERE p.id = m.plot_id),
  (SELECT id FROM crm_projects WHERE is_default LIMIT 1)
) WHERE project_id IS NULL;

ALTER TABLE crm_projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "partners manage projects" ON crm_projects;
CREATE POLICY "partners manage projects" ON crm_projects FOR ALL TO authenticated USING (crm_is_partner()) WITH CHECK (crm_is_partner());

DO $$ BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE crm_projects; EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- New website enquiries/bookings now stamp the right project automatically.
CREATE OR REPLACE FUNCTION crm_lead_from_enquiry() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE def_project TEXT;
BEGIN
  SELECT id INTO def_project FROM crm_projects WHERE is_default LIMIT 1;
  INSERT INTO crm_leads (id, name, phone, source, stage, notes, project_id, activities, created_at, updated_at)
  VALUES ('enq-' || NEW.id, NEW.name, NEW.phone, 'Website', 'new', NEW.message, def_project,
    jsonb_build_array(jsonb_build_object('id','enq-'||NEW.id,'type','created','at',crm_iso(NOW()),'by','Website','note',COALESCE(NEW.message,''))),
    NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END $$;

CREATE OR REPLACE FUNCTION crm_lead_from_booking() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE proj TEXT;
BEGIN
  SELECT project_id INTO proj FROM plots WHERE id = NEW.plot_id;
  IF proj IS NULL THEN SELECT id INTO proj FROM crm_projects WHERE is_default LIMIT 1; END IF;
  INSERT INTO crm_leads (id, name, phone, source, stage, plot_id, token_amount, notes, project_id, activities, created_at, updated_at)
  VALUES ('bk-' || NEW.id, NEW.customer_name, NEW.customer_phone, 'Website', 'booked', NEW.plot_id, COALESCE(NEW.booking_amount,0), NEW.message, proj,
    jsonb_build_array(
      jsonb_build_object('id','bk-'||NEW.id||'-c','type','created','at',crm_iso(NOW()),'by','Website','note',''),
      jsonb_build_object('id','bk-'||NEW.id||'-b','type','booked','at',crm_iso(NOW()),'by','Website','note',COALESCE(NEW.message,''),'plotId',NEW.plot_id::text,'amount',COALESCE(NEW.booking_amount,0))),
    NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
  UPDATE plots SET lead_id = 'bk-' || NEW.id, updated_at = NOW() WHERE id = NEW.plot_id AND lead_id IS NULL;
  RETURN NEW;
END $$;
