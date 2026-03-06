
# 🖥️ Hrithik Jadhav — Interactive Windows‑Style Portfolio

<p align="center">
An interactive desktop‑inspired portfolio built with React.<br/>
Instead of a scrolling website, visitors explore a desktop environment with draggable windows, icons, and a taskbar.
</p>

<p align="center">
<a href="https://hrithikjadhav.com"><img src="https://img.shields.io/badge/Live-Portfolio-blue?style=for-the-badge"></a>
<img src="https://img.shields.io/badge/React-Frontend-61dafb?style=for-the-badge&logo=react">
<img src="https://img.shields.io/badge/Vite-Build-646cff?style=for-the-badge&logo=vite">
<img src="https://img.shields.io/badge/TailwindCSS-Styling-38bdf8?style=for-the-badge&logo=tailwindcss">
<img src="https://img.shields.io/badge/Cloudflare-Deployment-f38020?style=for-the-badge&logo=cloudflare">
</p>

---

# 🌐 Live Website

**Portfolio:**  
👉 https://hrithikjadhav.com

---

# 🎥 Portfolio Demo

<p align="center">
<img src="./screenshots/Demo.gif" width="900">
</p>

--- 

# 📸 Portfolio Preview

## Boot & Login Experience

<table>
<tr>
<td align="center">
<img src="./screenshots/BootingScreen.png" width="450"><br>
<b>Boot Screen</b>
</td>

<td align="center">
<img src="./screenshots/LoginScreen.png" width="450"><br>
<b>Login Screen</b>
</td>
</tr>
</table>

The portfolio begins with a **Windows-style boot and login experience**, creating a nostalgic and engaging first impression.

---

## Desktop Interface

<p align="center">
<img src="./screenshots/Desktop.png" width="900">
</p>

The main interface behaves like a **desktop operating system**, allowing users to open multiple windows simultaneously.

Features include:

• Desktop icons  
• Taskbar navigation  
• Window management  

---

## Portfolio Windows

<table>
<tr>
<td align="center">
<img src="./screenshots/AboutMe.png" width="420"><br>
<b>About Window</b>
</td>

<td align="center">
<img src="./screenshots/Projects.png" width="420"><br>
<b>Projects Window</b>
</td>
</tr>

<tr>
<td align="center">
<img src="./screenshots/Skills.png" width="420"><br>
<b>Skills Window</b>
</td>

<td align="center">
<img src="./screenshots/Research.png" width="420"><br>
<b>Research Window</b>
</td>
</tr>

<tr>
<td align="center">
<img src="./screenshots/Contact.png" width="420"><br>
<b>Contact Window</b>
</td>

<td align="center">
<img src="./screenshots/Dashboard.png" width="420"><br>
<b>Dashboard View</b>
</td>
</tr>
</table>

Each section of the portfolio opens as a desktop application window, allowing visitors to explore projects, experience, research, and skills interactively.

---

# 🚀 Key Features

## 🖥 Desktop‑Style Interface

Instead of a static portfolio page, the UI mimics a **desktop operating system**.

Features include:

• Clickable desktop icons  
• Draggable application windows  
• Window minimize / maximize / close  
• Taskbar showing active windows  
• Multi‑window management  

---

## 📂 Portfolio Applications

Each portfolio section opens as a **desktop application window**.

| Section | Description |
|------|------|
| 👤 About | Background and education |
| 💼 Experience | Professional and project experience |
| 📁 Projects | Software & AI/ML projects |
| 🧠 Research | Research work and investigations |
| 🛠 Skills | Technical skills |
| 📄 Resume | Downloadable CV |
| 📧 Contact | Ways to connect |

---

# 🧠 Engineering Concepts Demonstrated

This project highlights several frontend engineering ideas.

### Window Management System

A custom system controls:

• Window state  
• Z‑index ordering  
• Focused window tracking  
• Active taskbar applications  

---

### Component Architecture

```

Desktop
 ├── Icon Manager
 ├── Window Manager
 │     ├── AboutWindow
 │     ├── ProjectsWindow
 │     ├── SkillsWindow
 │     ├── ResearchWindow
 │     └── ExperienceWindow
 └── Taskbar

```

---

# 🏗 Tech Stack

| Technology | Purpose |
|---|---|
| React | Component based UI |
| Vite | Development & build tool |
| Tailwind CSS | Styling |
| Lucide React | Icon library |
| JavaScript (ES6+) | Application logic |
| Cloudflare Pages | Hosting & deployment |

---

# 📂 Project Structure

```

src
├── assets
│   ├── icons
│   ├── wallpaper
│
├── components
│   ├── Desktop.jsx
│   ├── Taskbar.jsx
│   ├── Window.jsx
│
│   ├── windows
│   │   ├── AboutWindow.jsx
│   │   ├── ProjectsWindow.jsx
│   │   ├── SkillsWindow.jsx
│   │   ├── ResearchWindow.jsx
│   │   ├── ExperienceWindow.jsx
│   │   ├── CertificationsWindow.jsx
│   │   ├── ResumeWindow.jsx
│   │   ├── ContactWindow.jsx
│
├── App.jsx
├── main.jsx

```

---

# ⚙️ Running the Project Locally

Clone the repository

```
git clone https://github.com/Hrithik028/Hrithik-interactive-portfolio.git
```

Navigate into the folder

```
cd Hrithik-interactive-portfolio
```

Install dependencies

```
npm install
```

Run development server

```
npm run dev
```

Open browser

```
http://localhost:5173
```

---

# 🌐 Deployment

This project is deployed using **Cloudflare Pages**.

Deployment pipeline:

```
GitHub → Cloudflare Pages → Custom Domain
```

Each push automatically triggers a new deployment.

---

# 📈 Future Improvements

Planned upgrades:

• Boot screen animation  
• Window snapping  
• Desktop file explorer simulation  
• Mobile responsive desktop UI  
• Dark mode  
• Window drag physics  

---

# 👨‍💻 Author

**Hrithik Jadhav**  

Master of Information Technology (Artificial Intelligence)  
UNSW Sydney

GitHub  
https://github.com/Hrithik028

LinkedIn  
www.linkedin.com/in/hrithik-jadhav-a08068199

Portfolio  
https://hrithikjadhav.com

---

⭐ If you like this project, consider starring the repository.
