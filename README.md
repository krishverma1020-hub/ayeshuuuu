# 💖 Romantic "Will You Be My Girlfriend?" Website

A complete, beautiful, and playful interactive web experience designed to propose to your crush or special someone to officially become your girlfriend!

---

## ✨ Features

- **💌 Interactive Wax-Seal Envelope Opener**: Starts with an authentic 3D letter opening animation, seal popping sound chime, and sweet reveal.
- **🎵 Romantic Lullaby Music Box**: Ambient romantic melody synthesized purely in the browser using the Web Audio API (zero audio files needed, works offline and 100% reliably).
- **🌸 Floating Hearts & Confetti Physics**: Smooth 60fps canvas particles of floating hearts and celebratory confetti bursts.
- **📸 Polaroid Memory Lane**: Display your favorite photos or memories with tilted polaroid styling, cute pins, and captions.
- **🧁 Sweet Reasons Flip Cards**: Showcase the heartwarming little reasons you fell for her.
- **🏃‍♂️ The Playful Runaway "NO" Button**: Whenever she tries to hover or tap "No", the button playfully teleports away, shrinks, and teases her with cute quotes, while the "YES" button pulses and grows bigger!
- **🎉 Grand "She Said YES!" Celebration**:
  - Multi-cannon confetti explosion.
  - Heartfelt romantic message.
  - **Official Girlfriend Certificate** (can be printed or saved).
  - One-click WhatsApp / SMS instant confirmation message button.
- **⚙️ Live In-Page Customizer & Sharable Link**:
  - Click the ⚙️ gear icon to type her name and your name.
  - Click "Copy Shareable Link" to get a direct URL with names pre-populated (`?her=Emma&him=Alex`)!

---

## 🚀 Quick Start / How to Preview

### Option 1: Just Double-Click!
Simply double-click [`index.html`](index.html) in your file explorer to open it in your favorite browser (Chrome, Edge, Safari, Firefox).

### Option 2: Run a Local Server
Run this in PowerShell inside this directory:
```powershell
python -m http.server 3000
```
Then open `http://localhost:3000` in your browser.

---

## 🎨 How to Personalize

### Quick Way: Directly on the Website
1. Open the website.
2. Click the **⚙️** icon in the top right corner.
3. Type her name and your name, then click **Apply to Page**.
4. Click **Copy Shareable Link** to copy the customized link!

### Permanent Way: Edit `config.js`
Open [`config.js`](config.js) in any text editor. You can customize:
- `herName`: Her name or nickname (e.g., `"Sophia"`, `"Princess"`)
- `yourName`: Your name (e.g., `"Alex"`)
- `reasons`: The list of sweet things you love about her
- `memories`: Captions, dates, and your own photos (replace the image URLs with links to your photos or place your photos in this folder and use `"my-photo.jpg"`)
- `noButtonPhrases`: Playful quotes when she tries to click "No"
- `celebration`: Custom celebration promise and messages

---

## 🌐 How to Host Online for FREE (in 60 seconds)

To send her a real link she can open on her phone:

### 1. Netlify Drop (Easiest - Drag & Drop!)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop this whole `girlfriend-proposal` folder onto the page.
3. Netlify will give you a free live website link (e.g., `https://cute-proposal-12345.netlify.app`)!

### 2. GitHub Pages
1. Create a new GitHub repository named `girlfriend-proposal`.
2. Push or upload these files.
3. Go to **Settings** > **Pages** > Select `main` branch > **Save**.
4. Your website will be live at `https://<your-username>.github.io/girlfriend-proposal/`!

### 3. Vercel
1. Go to [vercel.com](https://vercel.com).
2. Import repository or run `npx vercel` in this folder.

---

Made with ❤️. Good luck, she is going to say YES! 💍✨
