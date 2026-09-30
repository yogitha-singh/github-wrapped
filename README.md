# ✨ GitHub Wrapped

> Your year in code, made adorable.

A Spotify Wrapped-style dashboard that transforms any GitHub profile into a stunning, animated story.

🌐 **Live Demo:** https://github-wrapped-xi.vercel.app/

---

## ✨ Features

- 🌌 Animated galaxy background with nebulae, stardust, and sparkles
- 🎨 Velvety 3D pie chart for language distribution
- 🔥 Coding streak tracker (current, longest, active days)
- 🏆 Achievement badges (stars, forks, watchers, updated repos)
- ⭐ Most starred repo showcase with gradient border
- 📊 Commit activity chart by day of week
- 💫 Dev Vibe generator — fun personality title from your data
- 📸 Download your wrapped card as PNG
- 🎉 Confetti animations on milestones
- 📱 Fully responsive
- 🔗 Shareable URLs (`?u=username`)

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** — glassmorphism, gradients, keyframe animations
- **Vanilla JavaScript (ES6+)**
- **GitHub REST API v3**
- **Chart.js** — bar charts
- **Custom SVG** — 3D pie chart
- **html2canvas** — image export
- **canvas-confetti** — celebrations
- **Lucide** — icons
- **Google Fonts** — Quicksand + Space Grotesk
- **Vercel** — hosting

---

## 🚀 Run Locally

```bash
git clone https://github.com/yogitha-singh/github-wrapped.git
cd github-wrapped
open index.html
```

Enter any GitHub username. Done.

---

## 📁 Structure

```
github-wrapped/
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🎯 How It Works

1. Enter a GitHub username
2. Three API calls fire in parallel:
   - `/users/{username}`
   - `/users/{username}/repos`
   - `/users/{username}/events/public`
3. Data aggregated — languages, streaks, stars, activity
4. Story renders with scroll animations
5. Download your wrapped card as PNG

---

## 🧠 What I Learned

- REST API consumption + rate limit handling
- Aggregating data from multiple endpoints
- Building custom SVG visualizations (3D pie from scratch)
- Scroll animations with Intersection Observer
- Premium dark UI with glassmorphism
- CI/CD deployment via Vercel + GitHub

---

## 🗺️ Roadmap

- [ ] Compare with friend mode
- [ ] Personal access token support
- [ ] Contribution heatmap
- [ ] Dark/light toggle
- [ ] Open Graph meta tags

---

## 👤 Author

**Yogitha Singh**
- GitHub: [@yogitha-singh](https://github.com/yogitha-singh)
- Live: [github-wrapped-xl.vercel.app](https://github-wrapped-xl.vercel.app)

---

## 📄 License

MIT

---

<p align="center">Made with 💖 and lots of coffee</p>
