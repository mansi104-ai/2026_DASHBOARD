# Engineer OS — Progress Tracker

## 🎯 Overview

Engineer OS is a comprehensive progress tracking application built with Next.js and Supabase. It recreates your original HTML tracker as a modern, responsive web app with full backend data persistence.

The app is specifically designed for tracking progress across 4 main areas:
- **College**: Major projects, exams, presentations
- **AI Growth**: Learning, projects, blog writing
- **Additional Skills**: Languages, open-source, systems
- **Placements**: LeetCode, fundamentals, resume, competitive programming

## ✨ Key Features

### 1. **Dashboard Overview**
- Real-time stat cards showing completion percentage for each area
- Progress bars with color-coded areas (orange, cyan, purple, yellow)
- Live clock and date display

### 2. **Task Management**
- **4-area organization**: College, AI Growth, Additional, Placements
- **Task filtering**: View all tasks or filter by specific area
- **Task completion**: Click to mark tasks done with automatic timestamp tracking
- **Real-time sync**: All changes instantly sync to Supabase

### 3. **Semester Milestones**
- 8-milestone progress tracker with visual states (done, active, upcoming)
- Click to toggle milestone completion
- Motivational timeline for the semester

### 4. **Pomodoro Timer**
- 25-minute work sessions with 5-minute breaks
- Session counter and total focus time tracking
- Task selector to focus on specific work items
- Visual timer with start/pause/reset controls

### 5. **Quick Trackers**
- **Pomodoro Sessions**: Track focused work sessions
- **Water Intake**: Monitor daily hydration (8 cups goal)
- **Exercise Minutes**: Track daily physical activity (120 mins goal)
- Each tracker has increment/decrement buttons and progress bars

### 6. **Data Persistence**
- All changes automatically saved to Supabase
- Data persists across browser sessions
- Single-user design (no authentication needed)

## 🏗️ Project Structure

```
engineer-os/
├── app/
│   ├── page.tsx                      # Main app page with initialization
│   ├── layout.tsx                    # Root layout with metadata
│   ├── globals.css                   # Tailwind styling
│   └── api/
│       ├── init/route.ts             # Database initialization
│       ├── tasks/
│       │   ├── route.ts              # GET/POST tasks
│       │   └── [id]/route.ts         # PUT/DELETE specific task
│       └── trackers/
│           ├── route.ts              # GET/POST trackers
│           └── [id]/route.ts         # GET/PUT specific tracker
│
├── components/engineer-os/
│   ├── header.tsx                    # Top bar with logo and clock
│   ├── stat-cards.tsx                # 4 area completion cards
│   ├── task-areas.tsx                # Task sections by area with filtering
│   ├── task-item.tsx                 # Individual task component
│   ├── milestones.tsx                # Semester milestone tracker
│   ├── pomodoro-timer.tsx            # Pomodoro timer with task selector
│   └── quick-trackers.tsx            # Habit trackers (pomodoro, water, exercise)
│
├── scripts/
│   ├── create-schema.sql             # Database schema SQL
│   └── seed-tasks.mjs                # Script to populate default tasks
│
├── SETUP.md                          # Complete setup instructions
└── PROJECT_SUMMARY.md                # This file
```

## 🚀 Getting Started

### 1. Prerequisites
- Supabase account with a project created
- Environment variables configured:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`

### 2. Database Setup
The app will attempt automatic initialization, but you can also:

**Option A: Automatic (on first load)**
- Visit the app in your browser
- The `/api/init` endpoint runs automatically
- Default tasks are seeded

**Option B: Manual SQL**
- Run the SQL from `scripts/create-schema.sql` in your Supabase SQL Editor
- Or copy the schema from SETUP.md

**Option C: Seed Default Tasks**
```bash
npm run seed
```

### 3. Environment Configuration
Add these to your Vercel project settings or `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Development
```bash
npm run dev
# App runs on http://localhost:3000
```

### 5. Production Deployment
Deploy to Vercel with a single click - just connect your GitHub repository.

## 🗄️ Database Schema

### `tasks` Table
```sql
- id: BIGSERIAL PRIMARY KEY
- name: TEXT (task name)
- category: TEXT (college | ai | extra | place)
- completed: BOOLEAN
- completed_at: TIMESTAMP (when task was marked done)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### `trackers` Table
```sql
- id: BIGSERIAL PRIMARY KEY
- name: TEXT UNIQUE (pomodoro | water | exercise)
- count: INTEGER
- updated_at: TIMESTAMP
```

### `progress_history` Table
```sql
- id: BIGSERIAL PRIMARY KEY
- task_name: TEXT
- completed: BOOLEAN
- recorded_at: TIMESTAMP
```

## 🎨 Design System

### Colors
- **College**: Orange (`#fb923c`)
- **AI Growth**: Cyan (`#22d3ee`)
- **Additional**: Purple (`#c084fc`)
- **Placements**: Yellow (`#facc15`)
- **Background**: Slate 900-950 (dark theme)
- **Text**: Slate 100-300

### Typography
- **Headings**: Inter/Geist Mono for monospace elements
- **Body**: DM Sans equivalent (via Geist font)

### Responsive Design
- Mobile-first design
- Grid adapts to different screen sizes
- Optimized for desktop and mobile viewing

## 🔧 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/[id]` - Update specific task
- `DELETE /api/tasks/[id]` - Delete task

### Trackers
- `GET /api/trackers` - Get all trackers
- `POST /api/trackers` - Create new tracker
- `GET /api/trackers/[id]` - Get specific tracker
- `PUT /api/trackers/[id]` - Update tracker

### Initialization
- `POST /api/init` - Initialize database and seed defaults

## 📝 Customization Guide

### Adding New Task Categories
1. Update `areas` array in `components/engineer-os/stat-cards.tsx`
2. Update `areas` array in `components/engineer-os/task-areas.tsx`
3. Update `categoryColors` in `components/engineer-os/task-item.tsx`

### Changing Pomodoro Timing
Edit in `components/engineer-os/pomodoro-timer.tsx`:
```javascript
const [timeLeft, setTimeLeft] = useState(25 * 60); // Change 25 to desired minutes
```

### Adding New Trackers
1. Add to `trackerConfigs` in `components/engineer-os/quick-trackers.tsx`
2. Add to default trackers in `app/api/init/route.ts`

### Customizing Colors
Update `colorMap` in `components/engineer-os/task-areas.tsx` or hex values in components.

## 🐛 Troubleshooting

### Tables Not Found
- Run SQL schema manually in Supabase SQL Editor
- Check environment variables are correct
- Verify Supabase project is active

### No Tasks Showing
- Check `tasks` table exists
- Run seed script: `npm run seed`
- Check browser console for API errors

### Data Not Saving
- Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
- Check Supabase project security rules
- Look for errors in Next.js console

### Styling Issues
- Clear browser cache
- Ensure Tailwind build is complete
- Check for CSS conflicts

## 📱 Features Breakdown

### Smart UI Components
- **Header**: Live clock, date, branding
- **Stat Cards**: Animated progress bars per area
- **Milestones**: Visual progress with glow effects for active milestone
- **Task Lists**: Collapsible sections with completion states
- **Trackers**: Real-time counter updates with visual feedback
- **Timer**: Countdown with phase indicators

### User Experience
- Dark theme reduces eye strain
- Color coding for quick visual scanning
- Responsive design works on all devices
- Smooth animations and transitions
- Accessible keyboard navigation

## 🚢 Performance

- Server-Side Rendering for better SEO
- Optimized component rendering with React state management
- Efficient Supabase queries with indexing
- Real-time data sync without polling

## 📞 Support

For issues or questions:
1. Check SETUP.md for detailed instructions
2. Review Supabase documentation
3. Check browser console for error messages
4. Verify environment variables are set

## 🎓 Learning Resources

- Next.js 16: https://nextjs.org
- Supabase: https://supabase.com
- Tailwind CSS: https://tailwindcss.com
- React 19: https://react.dev

---

Built with ❤️ using Next.js, React, Supabase, and Tailwind CSS.
