# M Akshay Sharma — Portfolio (Cricket Telemetry Edition)

<div align="center">

[![Live Portfolio](https://img.shields.io/badge/Live%20Portfolio-portfolio--inky--beta--bf6gy02tzy.vercel.app-00E575?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-inky-beta-bf6gy02tzy.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Vite%20%7C%20Three.js%20%7C%20Lenis-06090E?style=for-the-badge&logo=three.dot.js&logoColor=00E575)](https://portfolio-inky-beta-bf6gy02tzy.vercel.app)

</div>

Personal portfolio for **M Akshay Sharma**, Computer Science (Data Analytics) undergraduate at VIT-AP University. Built on a floodlit stadium aesthetic: six over delivery balls ignite, the bowler delivers down the 22-yard turf pitch, the cricket ball spins on its seam, lights up the Zing wickets, and launches into the site.

---

## Portfolio

🌐 **Live URL**: [https://portfolio-inky-beta-bf6gy02tzy.vercel.app](https://portfolio-inky-beta-bf6gy02tzy.vercel.app)

### ✨ Key Features

* **🏟️ 3D Floodlit Match Opening Sequence (`src/intro.js`)**:
  - Procedural **3D Leather Cricket Ball** with glossy lacquer finish and raised white stitch seam modeled in Three.js.
  - Realistic 22-yard turf pitch under 4 directional stadium floodlight towers with specular reflections.
  - Over delivery HUD (`0.1` to `0.6`), *"Umpire calls: PLAY"*, and radiant **LED Zing bails** flash sequence.
  - Includes a "Skip Delivery" button and `sessionStorage` caching for instant repeat browsing.

* **🧭 Career Wagon Wheel & Ground Map (`src/main.js`)**:
  - An interactive SVG of a floodlit cricket stadium featuring the 30-yard circle, pitch, and boundary rope.
  - Scrolling through milestones animates an **active shot tracer line and glowing cricket ball** mapping academic achievements (Ridge Public School 97% ➔ Sri Chaitanya 94.6% ➔ VIT-AP CGPA 8.32 ➔ Python & SQL ➔ AWS Academy Certifications) to iconic cricket shots (Cover Drive, Straight Drive, Pull, Square Cut, Maximum) with speed telemetry.

* **🏏 Technical Disciplines — 3D Pitch Stage (`src/xray.js`)**:
  - Camera orbits dynamically to focus on the rotating ball seam, clay pitch turf, and Zing wickets as you scroll through four technical disciplines:
    1. **The Strike Force**: Data Analytics & Machine Learning (Python, R, Pandas, Seaborn, EDA)
    2. **The Pitch Craft**: Databases & SQL Architecture (Window Functions, Aggregations, MongoDB)
    3. **The All-Rounder**: Full-Stack Web Systems (React.js, Node.js, Express.js, JWT)
    4. **Ground Deployment**: Cloud & DevOps (AWS EC2, S3, IAM, Git, Render)
  - Features dynamic SVG leader lines and pulsing anchor points.

* **📊 Selected Innings & Telemetry**:
  - **SoundPulse**: Music streaming analytics analyzing 8,000+ events with live SQL query execution console.
  - **Healthcare Data Analysis**: End-to-end data transformation and visual epidemiology on the HMIS dataset.
  - **CricPulse Telemetry**: Real-time ball-by-ball momentum and wagon wheel platform.

* **🏛️ The Pavilion**:
  - One-click email copy with instant feedback.
  - Live IST local clock for Amaravati, Andhra Pradesh.
  - Direct download link to [Resume (`/M_Akshay_Sharma_Resume.pdf`)](https://portfolio-inky-beta-bf6gy02tzy.vercel.app/M_Akshay_Sharma_Resume.pdf).

---

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

The intro plays once per browser session. To see it again, click **"Replay delivery"** in the footer or visit `?intro` (e.g. [https://portfolio-inky-beta-bf6gy02tzy.vercel.app/?intro](https://portfolio-inky-beta-bf6gy02tzy.vercel.app/?intro)).
For tuning the animation, `?slowmo` plays it at quarter speed and `?at=3` freezes it at second 3.

---

## Deploy to Vercel

1. Push this repository to GitHub (`akshaysharma2005/portfolio`).
2. On [vercel.com/new](https://vercel.com/new), import the repository:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Deploy!

---

## Project layout

```
index.html                         Page markup, semantic HTML, wagon wheel SVG & HUD
src/main.js                        Sections, wagon wheel trigonometry, scroll effects, GitHub telemetry, clock
src/intro.js                       3D cricket match delivery opening sequence with Three.js
src/xray.js                        3D pitch & capabilities discipline stage with SVG leader line
src/data.js                        Projects, wagon wheel milestones, skills
src/style.css                      All styling (floodlit night stadium, turf emerald, leather crimson, scoreboard gold)
public/work/                       Screenshots for SoundPulse, Healthcare Analytics
public/M_Akshay_Sharma_Resume.pdf  Downloadable resume
```
