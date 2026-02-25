# Zeus — IT Professional Portfolio

Personal portfolio website for Zeus, built with React + Vite.

## Tech Stack

- **React 18** — UI library
- **Vite 5** — build tool & dev server
- **Plain CSS** — scoped per component (no CSS-in-JS, no Tailwind)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

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
