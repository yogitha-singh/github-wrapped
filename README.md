<div align="center">

# 🌌 GitHub Wrapped

**Your year in code, made adorable.**

A Spotify Wrapped-inspired experience that turns any public GitHub profile into an animated, shareable story.

<br>

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit-8b5cf6?style=for-the-badge)](https://github-wrapped-xi.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-22d3ee?style=for-the-badge)](#license)
[![Status](https://img.shields.io/badge/Status-Active-34d399?style=for-the-badge)](#project-status)

![HTML5](https://img.shields.io/badge/HTML5-e34f26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572b6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-ff6384?style=flat-square&logo=chartdotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

<br>

<img src="landing_png.png" alt="GitHub Wrapped landing page" width="100%">

</div>

---

## ✨ Overview

Enter any public GitHub username and get a cinematic dashboard of coding activity, top repositories, language preferences, streaks, and a personalized developer vibe.

Built entirely on the frontend using the GitHub REST API. No backend, no database, no setup.

**Try it:** [github-wrapped-xi.vercel.app](https://github-wrapped-xi.vercel.app/)
**Share a profile:** `https://github-wrapped-xi.vercel.app/?u=username`

---

## 📸 Preview

<div align="center">

| Profile intro | Top languages |
| :---: | :---: |
| <img src="profile_png.png" alt="Profile intro"> | <img src="languages_png.png" alt="Top languages"> |

| Weekly activity | Recent work |
| :---: | :---: |
| <img src="activity_png.png" alt="Weekly activity"> | <img src="recent-work_png.png" alt="Recent work"> |

<br>

**Developer vibe card**

<img src="dev-vibe_png.png" alt="Developer vibe card" width="70%">

</div>

---

## 🎁 Features

| Category | Highlights |
| --- | --- |
| **Profile Analytics** | Profile overview, repository count, stars, forks, watchers |
| **Coding Activity** | Current and longest streaks, active days, commits by weekday |
| **Repository Highlights** | Most-starred repo, recently updated repos, language breakdown |
| **Developer Personality** | A generated archetype based on habits, languages, and activity |
| **Visual Experience** | Galaxy background, glassmorphism UI, scroll animations, 3D-style SVG pie chart, confetti |
| **Sharing** | Username-based URLs (`?u=username`) and PNG export of your Wrapped card |

---

## ⚙️ How It Works

```text
Username  ->  GitHub REST API (parallel requests)
                  |-- /users/{username}
                  |-- /users/{username}/repos
                  |-- /users/{username}/events/public
              ->  Aggregation  ->  Stats + Visualizations  ->  Wrapped Story
                                                                  |-- Shareable URL
                                                                  |-- PNG Export
```

Raw API responses are aggregated into repository counts, language distribution, stars, forks, watchers, streaks, and activity patterns, then rendered as an animated story.

---

## 🧰 Tech Stack

| Technology | Purpose |
| --- | --- |
| HTML5, CSS3, JavaScript (ES6+) | Structure, styling, and application logic |
| GitHub REST API v3 | Profile, repository, and event data |
| Chart.js | Activity charts |
| SVG | Custom 3D-style pie chart |
| html2canvas | PNG export |
| canvas-confetti | Milestone celebrations |
| Lucide | Icons |
| Google Fonts | Quicksand, Space Grotesk |
| Vercel | Hosting and deployment |

---

## 🚀 Getting Started

**Prerequisites:** a modern browser and Git.

```bash
git clone https://github.com/yogitha-singh/github-wrapped.git
cd github-wrapped
```

Open `index.html` directly in your browser, or use a local server:

```bash
npx serve .
```

---

## Project Structure

```text
github-wrapped/
├── index.html            # Application structure
├── style.css             # UI, animations, responsive styling
├── script.js             # API integration and application logic
├── *_png.png             # README preview screenshots
└── README.md
```

---

## API Rate Limits

The app uses unauthenticated requests to the public GitHub API, so rate limits apply. Private repository data is never required.

---

## 🗺️ Roadmap

- [ ] Friend comparison mode
- [ ] Personal Access Token support
- [ ] Contribution heatmap
- [ ] Dark / light theme toggle
- [ ] Open Graph metadata and shareable social cards
- [ ] Improved rate-limit handling
- [ ] More developer personality types
- [ ] Year-over-year comparisons

---

## 🤝 Contributing

Contributions and ideas are welcome.

```bash
git checkout -b feature/your-feature
git commit -m "feat: add your feature"
git push origin feature/your-feature
```

Then open a pull request.

---

## Project Status

**Active development.** Functional and deployed, with new analytics and visual features added over time.

---

## License

Released under the [MIT License](LICENSE).

---

<div align="center">

💜 **Created by [Yogitha Singh](https://github.com/yogitha-singh)**

Built with curiosity, code, and a lot of late-night debugging.

</div><div align="center">

# 🌌 GitHub Wrapped

**Your year in code, made adorable.**

A Spotify Wrapped-inspired experience that turns any public GitHub profile into an animated, shareable story.

<br>

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit-8b5cf6?style=for-the-badge)](https://github-wrapped-xi.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-22d3ee?style=for-the-badge)](#license)
[![Status](https://img.shields.io/badge/Status-Active-34d399?style=for-the-badge)](#project-status)

![HTML5](https://img.shields.io/badge/HTML5-e34f26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572b6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-ff6384?style=flat-square&logo=chartdotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

<br>

<img src="landing_png.png" alt="GitHub Wrapped landing page" width="100%">

</div>

---

## ✨ Overview

Enter any public GitHub username and get a cinematic dashboard of coding activity, top repositories, language preferences, streaks, and a personalized developer vibe.

Built entirely on the frontend using the GitHub REST API. No backend, no database, no setup.

**Try it:** [github-wrapped-xi.vercel.app](https://github-wrapped-xi.vercel.app/)
**Share a profile:** `https://github-wrapped-xi.vercel.app/?u=username`

---

## 📸 Preview

<div align="center">

| Profile intro | Top languages |
| :---: | :---: |
| <img src="profile_png.png" alt="Profile intro"> | <img src="languages_png.png" alt="Top languages"> |

| Weekly activity | Recent work |
| :---: | :---: |
| <img src="activity_png.png" alt="Weekly activity"> | <img src="recent-work_png.png" alt="Recent work"> |

<br>

**Developer vibe card**

<img src="dev-vibe_png.png" alt="Developer vibe card" width="70%">

</div>

---

## 🎁 Features

| Category | Highlights |
| --- | --- |
| **Profile Analytics** | Profile overview, repository count, stars, forks, watchers |
| **Coding Activity** | Current and longest streaks, active days, commits by weekday |
| **Repository Highlights** | Most-starred repo, recently updated repos, language breakdown |
| **Developer Personality** | A generated archetype based on habits, languages, and activity |
| **Visual Experience** | Galaxy background, glassmorphism UI, scroll animations, 3D-style SVG pie chart, confetti |
| **Sharing** | Username-based URLs (`?u=username`) and PNG export of your Wrapped card |

---

## ⚙️ How It Works

```text
Username  ->  GitHub REST API (parallel requests)
                  |-- /users/{username}
                  |-- /users/{username}/repos
                  |-- /users/{username}/events/public
              ->  Aggregation  ->  Stats + Visualizations  ->  Wrapped Story
                                                                  |-- Shareable URL
                                                                  |-- PNG Export
```

Raw API responses are aggregated into repository counts, language distribution, stars, forks, watchers, streaks, and activity patterns, then rendered as an animated story.

---

## 🧰 Tech Stack

| Technology | Purpose |
| --- | --- |
| HTML5, CSS3, JavaScript (ES6+) | Structure, styling, and application logic |
| GitHub REST API v3 | Profile, repository, and event data |
| Chart.js | Activity charts |
| SVG | Custom 3D-style pie chart |
| html2canvas | PNG export |
| canvas-confetti | Milestone celebrations |
| Lucide | Icons |
| Google Fonts | Quicksand, Space Grotesk |
| Vercel | Hosting and deployment |

---

## 🚀 Getting Started

**Prerequisites:** a modern browser and Git.

```bash
git clone https://github.com/yogitha-singh/github-wrapped.git
cd github-wrapped
```

Open `index.html` directly in your browser, or use a local server:

```bash
npx serve .
```

---

## Project Structure

```text
github-wrapped/
├── index.html            # Application structure
├── style.css             # UI, animations, responsive styling
├── script.js             # API integration and application logic
├── *_png.png             # README preview screenshots
└── README.md
```

---

## API Rate Limits

The app uses unauthenticated requests to the public GitHub API, so rate limits apply. Private repository data is never required.

---

## 🗺️ Roadmap

- [ ] Friend comparison mode
- [ ] Personal Access Token support
- [ ] Contribution heatmap
- [ ] Dark / light theme toggle
- [ ] Open Graph metadata and shareable social cards
- [ ] Improved rate-limit handling
- [ ] More developer personality types
- [ ] Year-over-year comparisons

---

## 🤝 Contributing

Contributions and ideas are welcome.

```bash
git checkout -b feature/your-feature
git commit -m "feat: add your feature"
git push origin feature/your-feature
```

Then open a pull request.

---

## Project Status

**Active development.** Functional and deployed, with new analytics and visual features added over time.

---

## License

Released under the [MIT License](LICENSE).

---

<div align="center">

💜 **Created by [Yogitha Singh](https://github.com/yogitha-singh)**

Built with curiosity, code, and a lot of late-night debugging.

</div>
