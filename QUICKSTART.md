# Engineer OS — Quick Start Guide

Get up and running in 5 minutes.

## Step 1: Environment Setup (1 min)

Add these to your Vercel project settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Where to find these:**
- Go to your Supabase project
- Settings → API
- Copy your Project URL and Service Role Secret

## Step 2: Database Setup (2 min)

**Choose ONE option:**

### Option A: Automatic (Easiest)
1. Start the app: `npm run dev`
2. Visit `http://localhost:3000`
3. The database initializes automatically on load
4. Default tasks are seeded

### Option B: Manual SQL
1. Open Supabase → SQL Editor
2. Create a new query
3. Copy and run the SQL from `scripts/create-schema.sql`

### Option C: Using Seed Script
```bash
npm run seed
```

## Step 3: Run Locally (1 min)

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` - your app is ready!

## Step 4: Test It Out (1 min)

- ✅ Click a task to mark it complete
- ✅ Click milestone dots to track progress
- ✅ Start the Pomodoro timer
- ✅ Use the quick trackers
- ✅ Filter by area using tabs
- ✅ Refresh the page - all changes are saved!

## Step 5: Deploy (Optional)

Push to GitHub, then deploy to Vercel with one click:
```bash
git push origin main
```

Then import your repo in [Vercel Dashboard](https://vercel.com/dashboard)

---

## Troubleshooting

### Getting errors about missing tables?
→ Run the SQL schema manually in Supabase SQL Editor

### No tasks showing up?
→ Run: `npm run seed`

### Data not saving?
→ Check your environment variables are correct in `.env.local`

### Need to add more tasks?
→ Edit `scripts/seed-tasks.mjs` and run `npm run seed` again

---

## Next Steps

- Read `SETUP.md` for detailed documentation
- Check `PROJECT_SUMMARY.md` for feature overview
- Customize tasks in Supabase dashboard
- Adjust Pomodoro timer settings as needed
- Deploy to production

## Key Files to Customize

- `components/engineer-os/` - UI components
- `scripts/seed-tasks.mjs` - Default tasks
- `app/page.tsx` - Main layout
- `.env.local` - Environment variables

**Happy tracking!** 🚀
