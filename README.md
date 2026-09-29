<div align="center">

# ✦ GitHub Wrapped

### Your year in code, made adorable 💖

[![Live Demo](https://img.shields.io/badge/✦_Live_Demo-Visit_Now-fbcfe8?style=for-the-badge&labelColor=181038)](https://YOUR-PROJECT.vercel.app)
[![Made with](https://img.shields.io/badge/Made_with-HTML_•_CSS_•_JS-c4b5fd?style=for-the-badge&labelColor=181038)](https://github.com/YOUR-USERNAME/github-wrapped)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-a5f3fc?style=for-the-badge&labelColor=181038)](https://vercel.com)

<br/>

<img src="https://img.shields.io/badge/status-live-86efac?style=flat-square&labelColor=181038" />
<img src="https://img.shields.io/badge/license-MIT-fbcfe8?style=flat-square&labelColor=181038" />
<img src="https://img.shields.io/badge/PRs-welcome-c4b5fd?style=flat-square&labelColor=181038" />

</div>

---

## 🌌 What is this?

**GitHub Wrapped** is a Spotify-Wrapped-style story for developers. Enter any GitHub username and get a cinematic, scrollable journey through their code life — beautifully visualized with a velvety pastel galaxy aesthetic.

No login. No signup. Just magic. ✨

---

## ✨ Features

- 🎬 **Cinematic scroll story** — full-screen animated sections
- 📊 **3D velvety pie chart** for top languages
- 🔥 **Coding streaks** — current, longest, and total active days
- ⭐ **Achievements** — stars, forks, watchers, updated repos
- 🏆 **Most starred repo** showcase with animated gradient border
- 📅 **Commit activity chart** — busiest day of the week
- 💫 **Dev Vibe title** — personalized based on your stats
- 📥 **Download as image** — shareable vibe card
- 🎨 **Galaxy background** — animated nebulas, twinkling stars, floating clouds
- 🎉 **Confetti celebration** on the final vibe section
- 📱 **Fully responsive** — works beautifully on mobile

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| **Structure** | HTML5 (semantic) |
| **Styling** | CSS3 — custom properties, animations, glassmorphism |
| **Logic** | Vanilla JavaScript (ES6+) |
| **Data** | GitHub REST API v3 |
| **Charts** | Chart.js |
| **Icons** | Lucide |
| **Effects** | canvas-confetti |
| **Image Export** | html2canvas |
| **Fonts** | Quicksand + Space Grotesk (Google Fonts) |
| **Deploy** | Vercel |

**Zero frameworks. Zero build step. Just pure web.**

---

## 🚀 Live Demo

👉 **[Try it live](https://YOUR-PROJECT.vercel.app)**

Try with any username, e.g.:
- `torvalds`
- `gaearon`
- `sindresorhus`
- Or your own!

---

## 📸 Screenshots

### Landing
> ![Landing](screenshots/landing.png)

### Story Sections
> ![Numbers](screenshots/numbers.png)
> ![Languages](screenshots/languages.png)
> ![Streaks](screenshots/streaks.png)
> ![Vibe](screenshots/vibe.png)

*(Add your own screenshots after deploying)*

---

## 🏃 Run Locally

```bash
# Clone the repo
git clone https://github.com/YOUR-USERNAME/github-wrapped.git
cd github-wrapped

# Open it — no build step needed!
open index.html         # macOS
start index.html        # Windows
xdg-open index.html     # Linux
```

Or use a simple local server:

```bash
# Python 3
python -m http.server 8000

# Node
npx serve
```

Then open `http://localhost:8000`.

---

## 📁 Project Structure

```
github-wrapped/
├── index.html      # Structure & content
├── style.css       # All styling, animations, galaxy background
├── script.js       # API calls, calculations, rendering
└── README.md       # You are here
```

---

## 🧠 How It Works

1. **User enters a GitHub username** → form submits
2. **Three parallel API calls** fetch user profile, repos, and public events
3. **Stats are computed locally**:
   - Language distribution across repos
   - Current / longest / total streaks from event heatmap
   - Total stars, forks, watchers
   - Busiest day of the week
4. **Dev Vibe title** is generated via a rules-based system
5. **Story renders** — user scrolls through animated full-screen sections
6. **Intersection Observer** triggers count-up animations + confetti
7. **Optional**: download vibe card as PNG via html2canvas

---

## 🎨 Design Notes

The UI uses a **velvety pastel galaxy** theme:
- Deep space background (`#0a0620`)
- Animated nebulas in pink, lavender, cyan
- Twinkling star layers with parallax drift
- Glassmorphic cards with soft gradients
- No harsh yellows — every accent is soft and dreamy
- Custom 3D donut chart built with pure SVG (not Chart.js)

---

## 🔒 Privacy

- **No data is stored** — everything happens in your browser
- **No authentication required** — only public GitHub data
- **No tracking, no analytics, no cookies**

---

## 🐛 Known Limitations

- GitHub API rate limit: **60 requests/hour per IP** (unauthenticated)
- Streak calculation uses the last 90 days of public events
- Private contributions are not counted

---

## 🗺️ Roadmap

- [ ] Compare two users side-by-side
- [ ] Year selector (2023, 2024, 2025...)
- [ ] GitHub OAuth for higher rate limits
- [ ] Dark/light theme toggle
- [ ] Sound effects

---

## 🤝 Contributing

PRs are welcome! For major changes, open an issue first.

1. Fork it
2. Create your branch (`git checkout -b feature/amazing`)
3. Commit (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📜 License

MIT © [YOUR NAME](https://github.com/YOUR-USERNAME)

---

<div align="center">

**Made with 💖 and lots of coffee**

⭐ Star this repo if you loved it!

</div>