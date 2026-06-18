# Propity Realty — 17 Kani Residential Township

Full-stack real estate website for a 63-plot residential township in Laxmilunga, Agartala, Tripura.

## Tech Stack
- **Next.js 14** (App Router, TypeScript)
- **Supabase** (PostgreSQL + Auth + Storage)
- **Tailwind CSS** + custom color system
- **Framer Motion** for animations
- **React Hook Form + Zod** for validation
- **Sonner** for toast notifications

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Create Supabase project
Go to [supabase.com](https://supabase.com), create a new project, and copy your credentials.

### 3. Configure environment variables
Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Run database migration
In Supabase Dashboard → SQL Editor, run the contents of:
```
supabase/migrations/001_initial.sql
```
This creates tables, RLS policies, and seeds all 63 plots.

### 5. Create admin user
In Supabase Dashboard → Authentication → Users → Invite User:
- Email: `admin@propity.in`
- Set password to `propity2024` (or your choice)

### 6. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Routes
| Path | Description |
|------|-------------|
| `/` | Home page |
| `/plots` | All 63 plots with filters |
| `/plots/[id]` | Individual plot detail |
| `/book` | Booking form |
| `/book/success` | Booking confirmation |
| `/bookings` | Public bookings board |
| `/location` | Map & directions |
| `/gallery` | Photo gallery |
| `/about` | Project overview |
| `/admin` | Admin dashboard (protected) |
| `/admin/bookings` | Manage bookings + CSV export |
| `/admin/plots` | Change plot statuses |
| `/admin/enquiries` | View enquiries |
| `/login` | Admin login |

## Adding Real Photos
Replace placeholder gradients with actual images:
1. Add photos to `/public/images/`
2. Use Next.js `<Image>` component with `src="/images/hero.jpg"`
3. Or upload to Supabase Storage bucket `propity-media`

## Color System
| Token | Hex | Usage |
|-------|-----|-------|
| forest | `#1B4332` | Primary green |
| forest-light | `#2D6A4F` | Hover states |
| gold | `#C9A84C` | Accents & CTAs |
| cream | `#F8F5EF` | Page background |
| charcoal | `#1A1A2E` | Dark sections |

## Deployment
Push to GitHub → Import in Vercel → Add env vars → Deploy.
