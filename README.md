# M Akshay Sharma — Portfolio (Cricket Telemetry Edition)

Personal portfolio for **M Akshay Sharma**, Computer Science (Data Analytics) undergraduate at VIT-AP University. It opens on a floodlit cricket pitch: six over delivery balls ignite, the bowler delivers down the 22-yard turf pitch, the cricket ball spins on its seam, lights up the Zing wickets, and launches into the site.

Built with [Vite](https://vite.dev), [three.js](https://threejs.org), and [Lenis](https://lenis.darkroom.engineering). Vanilla CSS design system.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

Build and preview the production version:

```bash
npm run build
npm run preview    # http://localhost:4173
```

The intro plays once per browser session. To see it again, click **"Replay delivery"** in the footer or add `?intro` to the URL.
For tuning the animation, `?slowmo` plays it at quarter speed and `?at=3` freezes it at second 3.

## Deploy to Vercel or Render

1. Push this directory to your GitHub repository (`github.com/akshaysharma2005/portfolio`).
2. On [vercel.com/new](https://vercel.com/new), import the repository.
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy.

## Project layout

```
index.html                     Page markup, semantic HTML, wagon wheel SVG & HUD
src/main.js                    Sections, wagon wheel trigonometry, scroll effects, GitHub telemetry, clock
src/intro.js                   3D cricket match delivery opening sequence with Three.js
src/xray.js                    3D pitch & capabilities discipline stage with SVG leader line
src/data.js                    Projects, wagon wheel milestones, skills (edit content here)
src/style.css                  All styling (floodlit night stadium, turf emerald, leather crimson, scoreboard gold)
public/work/                   Screenshots for SoundPulse, Healthcare Analytics, etc.
public/M_Akshay_Sharma_Resume.pdf Downloadable resume
```
