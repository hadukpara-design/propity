import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Lets the MyCoinMap owner create a partner's account outright, with a
// password chosen right now, instead of waiting on Supabase's invite email
// (which is unreliable on the free tier). Only a signed-in owner may call this.
export async function POST(req: NextRequest) {
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: 'Server not configured' }, { status: 503 })
  }

  const authHeader = req.headers.get('authorization') || ''
  const token = authHeader.replace(/^Bearer\s+/i, '').trim()
  if (!token) return NextResponse.json({ error: 'Not signed in' }, { status: 401 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
  const b = body as Record<string, unknown>
  const name = String(b.name || '').trim()
  const email = String(b.email || '').trim().toLowerCase()
  const password = String(b.password || '')
  const role = b.role === 'owner' ? 'owner' : 'partner'
  if (!name || !email) return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  if (password.length < 6) return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })

  const { createClient } = await import('@supabase/supabase-js')
  const admin = createClient(supabaseUrl, serviceKey)

  const { data: callerData, error: callerErr } = await admin.auth.getUser(token)
  if (callerErr || !callerData?.user) return NextResponse.json({ error: 'Not signed in' }, { status: 401 })

  const { data: caller } = await admin
    .from('crm_partners')
    .select('role')
    .eq('user_id', callerData.user.id)
    .maybeSingle()
  if (!caller || caller.role !== 'owner') {
    return NextResponse.json({ error: 'Only the owner can create partner accounts' }, { status: 403 })
  }

  // Registering the invite first lets the existing sign-up trigger promote a
  // brand-new account to partner automatically the moment it is created.
  const { error: inviteErr } = await admin
    .from('crm_invites')
    .upsert({ email, name, role, invited_by: callerData.user.email })
  if (inviteErr) return NextResponse.json({ error: inviteErr.message }, { status: 500 })

  let userId: string | null = null
  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name },
  })

  if (createErr) {
    if (/already been registered|already exists|already registered/i.test(createErr.message)) {
      // The email already has an account (e.g. it was the original site admin).
      // Reset its password and promote it directly, since the sign-up trigger
      // only fires for brand-new accounts.
      const { data: list, error: listErr } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 })
      const existing = !listErr ? list?.users.find(u => (u.email || '').toLowerCase() === email) : undefined
      if (!existing) {
        await admin.from('crm_invites').delete().eq('email', email)
        return NextResponse.json({ error: createErr.message }, { status: 400 })
      }
      await admin.auth.admin.updateUserById(existing.id, { password, email_confirm: true })
      const { error: upsertErr } = await admin
        .from('crm_partners')
        .upsert({ user_id: existing.id, email, name, role })
      await admin.from('crm_invites').delete().eq('email', email)
      if (upsertErr) return NextResponse.json({ error: upsertErr.message }, { status: 500 })
      userId = existing.id
    } else {
      await admin.from('crm_invites').delete().eq('email', email)
      return NextResponse.json({ error: createErr.message }, { status: 400 })
    }
  } else {
    userId = created.user?.id || null
  }

  return NextResponse.json({ success: true, id: userId })
}
