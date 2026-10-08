// The MyCoinMap board signs everyone in with one shared team account whose
// credentials ship in a public HTML file, so that account must never count as
// a site admin.
const SHARED_TEAM_EMAIL = 'team@mycoinmap.co'

// Set ADMIN_EMAILS (comma-separated) in the hosting environment to allow only
// those accounts into /admin. Until it is set, any signed-in account except the
// shared team account is accepted.
export function isAdminEmail(email: string | null | undefined): boolean {
  const normalized = (email ?? '').trim().toLowerCase()
  if (!normalized) return false

  const allowed = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map(entry => entry.trim().toLowerCase())
    .filter(Boolean)

  if (allowed.length > 0) return allowed.includes(normalized)
  return normalized !== SHARED_TEAM_EMAIL
}
