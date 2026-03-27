# Zeus — IT Professional Portfolio

Personal portfolio website for Zeus, built with React + Vite and deployed to Firebase Hosting.


## Project Structure

```
zeus-portfolio/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Root component — assembles all sections
    │
    ├── data/
    │   └── index.js          # All static data (expertise, stack, projects…)
    │
    ├── hooks/
    │   └── index.js          # useCursor, useReveal
    │
    ├── styles/
    │   ├── globals.css       # CSS custom properties, resets, keyframes
    │   └── common.css        # Shared layout, section headers, buttons, reveal
    │
    └── components/
        ├── Cursor/           # Custom neon cursor + ring
        ├── Nav/              # Fixed navbar with scroll detection
        ├── Hero/             # Hero section + HeroPanel (terminal)
        ├── About/            # About section with stats sidebar
        ├── Expertise/        # 5-card expertise grid
        ├── Projects/         # Featured projects grid
        ├── Stack/            # Technical stack with animated bars
        ├── Philosophy/       # Principles list + pull quote
        ├── Contact/          # Contact links + form with success state
        ├── Terminal/         # Full-screen ZEUS AI terminal interaction page
        └── Footer/           # Footer with live status indicator
```

Each component folder contains:
- `ComponentName.jsx` — React component
- `ComponentName.css` — scoped styles
- `index.js`          — barrel export

## Customization

- **Content** → edit `src/data/index.js`
- **Colors / fonts** → edit `src/styles/globals.css` (CSS variables)
- **Layout** → edit per-component CSS files
- **Sections** → add/remove in `src/App.jsx`
- **Google Analytics** → set `VITE_GA_MEASUREMENT_ID` in `.env` or `.env.local`; tracking is initialized by `src/components/GoogleAnalytics.jsx`
- **API base URL** → defaults to `https://kucdkggpxscjxksnhrma.supabase.co/functions/v1`
- **AI Chat** → defaults to `https://kucdkggpxscjxksnhrma.supabase.co/functions/v1/api`

## Firebase Deploy

For the standard production setup, the frontend does not need manual API URL env vars.

Only override these if you want to point to a different backend:

- `VITE_API_URL`
- `VITE_AI_CHAT_URL`
