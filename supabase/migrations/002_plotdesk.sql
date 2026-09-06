-- PlotDesk CRM inside the Propity project.
-- Safe to run more than once.

-- 1. Plots: add "sold", site name, dimensions, link to lead -------------------
ALTER TABLE plots DROP CONSTRAINT IF EXISTS plots_status_check;
ALTER TABLE plots ADD CONSTRAINT plots_status_check CHECK (status IN ('available','booked','reserved','sold'));
ALTER TABLE plots ADD COLUMN IF NOT EXISTS site TEXT DEFAULT '17 Kani';
ALTER TABLE plots ADD COLUMN IF NOT EXISTS width_ft NUMERIC;
ALTER TABLE plots ADD COLUMN IF NOT EXISTS depth_ft NUMERIC;
ALTER TABLE plots ADD COLUMN IF NOT EXISTS lead_id TEXT;
ALTER TABLE plots ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 2. Partners and invites -----------------------------------------------------
CREATE TABLE IF NOT EXISTS crm_partners (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'partner' CHECK (role IN ('owner','partner')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS crm_invites (
  email TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'partner' CHECK (role IN ('owner','partner')),
  invited_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CRM tables ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS crm_leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  source TEXT,
  stage TEXT NOT NULL DEFAULT 'new' CHECK (stage IN ('new','contacted','visit_scheduled','visited','follow_up','booked','deal_done','lost')),
  interest TEXT,
  budget NUMERIC DEFAULT 0,
  assigned_to TEXT,
  notes TEXT,
  next_follow_up TIMESTAMPTZ,
  visit_at TIMESTAMPTZ,
  plot_id INTEGER REFERENCES plots(id) ON DELETE SET NULL,
  token_amount NUMERIC DEFAULT 0,
  deal_amount NUMERIC DEFAULT 0,
  activities JSONB NOT NULL DEFAULT '[]'::jsonb,
  sample BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS crm_leads_stage_idx ON crm_leads(stage);
CREATE INDEX IF NOT EXISTS crm_leads_phone_idx ON crm_leads(phone);

CREATE TABLE IF NOT EXISTS crm_money (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL CHECK (kind IN ('expense','investment')),
  amount NUMERIC NOT NULL,
  paid_by TEXT NOT NULL,
  category TEXT,
  on_date DATE NOT NULL DEFAULT CURRENT_DATE,
  note TEXT,
  lead_id TEXT,
  plot_id INTEGER REFERENCES plots(id) ON DELETE SET NULL,
  logged_by TEXT,
  sample BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS crm_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb
);
INSERT INTO crm_settings (key, value) VALUES ('prefs', '{"areaUnit":"ganda"}') ON CONFLICT (key) DO NOTHING;

-- 4. Who counts as a partner --------------------------------------------------
CREATE OR REPLACE FUNCTION crm_is_partner() RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS
$$ SELECT EXISTS (SELECT 1 FROM crm_partners WHERE user_id = auth.uid()) $$;
CREATE OR REPLACE FUNCTION crm_is_owner() RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS
$$ SELECT EXISTS (SELECT 1 FROM crm_partners WHERE user_id = auth.uid() AND role = 'owner') $$;

-- Every account that already exists becomes an owner (that is you).
INSERT INTO crm_partners (user_id, email, name, role)
SELECT id, email, COALESCE(raw_user_meta_data->>'name', INITCAP(SPLIT_PART(email,'@',1))), 'owner' FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

-- A new sign-up becomes a partner only if their email was invited.
CREATE OR REPLACE FUNCTION crm_partner_from_user() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE inv RECORD;
BEGIN
  SELECT * INTO inv FROM crm_invites WHERE LOWER(email) = LOWER(NEW.email);
  IF FOUND THEN
    INSERT INTO crm_partners (user_id, email, name, role) VALUES (NEW.id, NEW.email, inv.name, inv.role) ON CONFLICT (user_id) DO NOTHING;
    DELETE FROM crm_invites WHERE LOWER(email) = LOWER(NEW.email);
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS trg_crm_partner_from_user ON auth.users;
CREATE TRIGGER trg_crm_partner_from_user AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION crm_partner_from_user();

-- If the invited person already has an account, promote them at once.
CREATE OR REPLACE FUNCTION crm_partner_from_invite() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE u RECORD;
BEGIN
  SELECT id, email INTO u FROM auth.users WHERE LOWER(email) = LOWER(NEW.email) LIMIT 1;
  IF FOUND THEN
    INSERT INTO crm_partners (user_id, email, name, role) VALUES (u.id, u.email, NEW.name, NEW.role) ON CONFLICT (user_id) DO NOTHING;
    DELETE FROM crm_invites WHERE LOWER(email) = LOWER(NEW.email);
    RETURN NULL;
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS trg_crm_partner_from_invite ON crm_invites;
CREATE TRIGGER trg_crm_partner_from_invite AFTER INSERT ON crm_invites FOR EACH ROW EXECUTE FUNCTION crm_partner_from_invite();

-- 5. Website enquiries and bookings become leads automatically ---------------
CREATE OR REPLACE FUNCTION crm_iso(ts TIMESTAMPTZ) RETURNS TEXT LANGUAGE sql IMMUTABLE AS
$$ SELECT to_char(ts AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') $$;

CREATE OR REPLACE FUNCTION crm_lead_from_enquiry() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO crm_leads (id, name, phone, source, stage, notes, activities, created_at, updated_at)
  VALUES ('enq-' || NEW.id, NEW.name, NEW.phone, 'Website', 'new', NEW.message,
    jsonb_build_array(jsonb_build_object('id','enq-'||NEW.id,'type','created','at',crm_iso(NOW()),'by','Website','note',COALESCE(NEW.message,''))),
    NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS trg_crm_lead_from_enquiry ON enquiries;
CREATE TRIGGER trg_crm_lead_from_enquiry AFTER INSERT ON enquiries FOR EACH ROW EXECUTE FUNCTION crm_lead_from_enquiry();

CREATE OR REPLACE FUNCTION crm_lead_from_booking() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO crm_leads (id, name, phone, source, stage, plot_id, token_amount, notes, activities, created_at, updated_at)
  VALUES ('bk-' || NEW.id, NEW.customer_name, NEW.customer_phone, 'Website', 'booked', NEW.plot_id, COALESCE(NEW.booking_amount,0), NEW.message,
    jsonb_build_array(
      jsonb_build_object('id','bk-'||NEW.id||'-c','type','created','at',crm_iso(NOW()),'by','Website','note',''),
      jsonb_build_object('id','bk-'||NEW.id||'-b','type','booked','at',crm_iso(NOW()),'by','Website','note',COALESCE(NEW.message,''),'plotId',NEW.plot_id::text,'amount',COALESCE(NEW.booking_amount,0))),
    NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
  UPDATE plots SET lead_id = 'bk-' || NEW.id, updated_at = NOW() WHERE id = NEW.plot_id AND lead_id IS NULL;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS trg_crm_lead_from_booking ON bookings;
CREATE TRIGGER trg_crm_lead_from_booking AFTER INSERT ON bookings FOR EACH ROW EXECUTE FUNCTION crm_lead_from_booking();

-- 6. Security: only partners see CRM data -------------------------------------
ALTER TABLE crm_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_money ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "partners read partners" ON crm_partners;
CREATE POLICY "partners read partners" ON crm_partners FOR SELECT TO authenticated USING (crm_is_partner());
DROP POLICY IF EXISTS "owners manage partners" ON crm_partners;
CREATE POLICY "owners manage partners" ON crm_partners FOR ALL TO authenticated USING (crm_is_owner()) WITH CHECK (crm_is_owner());
DROP POLICY IF EXISTS "partners manage invites" ON crm_invites;
CREATE POLICY "partners manage invites" ON crm_invites FOR ALL TO authenticated USING (crm_is_partner()) WITH CHECK (crm_is_partner());
DROP POLICY IF EXISTS "partners manage leads" ON crm_leads;
CREATE POLICY "partners manage leads" ON crm_leads FOR ALL TO authenticated USING (crm_is_partner()) WITH CHECK (crm_is_partner());
DROP POLICY IF EXISTS "partners manage money" ON crm_money;
CREATE POLICY "partners manage money" ON crm_money FOR ALL TO authenticated USING (crm_is_partner()) WITH CHECK (crm_is_partner());
DROP POLICY IF EXISTS "partners manage settings" ON crm_settings;
CREATE POLICY "partners manage settings" ON crm_settings FOR ALL TO authenticated USING (crm_is_partner()) WITH CHECK (crm_is_partner());
DROP POLICY IF EXISTS "partners insert plots" ON plots;
CREATE POLICY "partners insert plots" ON plots FOR INSERT TO authenticated WITH CHECK (crm_is_partner());
DROP POLICY IF EXISTS "partners delete plots" ON plots;
CREATE POLICY "partners delete plots" ON plots FOR DELETE TO authenticated USING (crm_is_partner());

-- 7. Live updates for the app -------------------------------------------------
DO $$ BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE plots; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE crm_leads; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE crm_money; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE crm_settings; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE crm_partners; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE crm_invites; EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 8. Data carried over from the PlotDesk board --------------------------------
INSERT INTO crm_money (id, kind, amount, paid_by, category, on_date, note, logged_by, created_at)
VALUES ('o7iie4u4qti', 'expense', 100000, 'Amit', 'Site development', '2026-09-04', 'lank developments', 'Amit', '2026-09-03T20:24:55Z')
ON CONFLICT (id) DO NOTHING;
