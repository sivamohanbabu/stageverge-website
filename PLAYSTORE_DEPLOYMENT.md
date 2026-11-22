# Stage Verge - Play Store Deployment Guide (TWA / Capacitor)

This app is built with **Trusted Web Activity (TWA)** / **PWA** & **Capacitor**, which is the official Google Play Store standard for high-performance single-codebase mobile applications.

---

## 🌟 Quick Run Locally Right Now
You can test the app immediately on your desktop/mobile browser:
1. Double click `launch_stage_verge.bat` (or run `python run_app.py`)
2. It will open `http://localhost:5055`
3. Click the **Install** or **Add to Home screen** button in Chrome/Edge/Android browser to install it as a standalone native app!

---

## 📦 How to Generate an Android `.aab` / `.apk` for Google Play Store

### Method 1: Using Google's Official `Bubblewrap CLI` (Recommended by Google)
Google provides **Bubblewrap**, an open-source CLI that takes this exact web app and packages it into a signed `.aab` (Android App Bundle) with zero boilerplate:

1. Install Node.js (or run on any machine with Node.js):
   ```bash
   npm i -g @bubblewrap/cli
   ```
2. In this folder:
   ```bash
   bubblewrap init --manifest="https://your-domain.com/manifest.json"
   bubblewrap build
   ```
3. This outputs an **`app-release-signed.aab`** ready to upload to **Google Play Console**!

---

### Method 2: Using Capacitor (Alternative 1-Click Native Android Studio Project)
1. Initialize Capacitor:
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/android
   npx cap init "Stage Verge" "com.stageverge.app"
   npx cap add android
   npx cap open android
   ```
2. Android Studio opens, where you click:
   `Build -> Generate Signed Bundle / APK -> Android App Bundle`
3. Upload to Google Play Store.

---

## 📱 Features Included in Stage Verge
1. **Daily Focus & Anti-Procrastination Live Clock**:
   - Shows active seconds, date, anti-time-wasting warnings.
2. **Deep Work Pomodoro Engine**:
   - 25m Focus, 50m Ultra Deep Work, 5m Quick Refresh, 15m Recharge.
   - Built-in audio tone alert when timer completes.
3. **Daily Alarms & Wakeups**:
   - Add custom daily alarms with labels.
   - Triggers audio chime and native notifications.
4. **Daily Todo List & Priority Matrix**:
   - Categorized by Work, Learning, Health, and Life.
   - High, Medium, Low priority tags with completion strike-through.
5. **Daily Smart Recommendations**:
   - Curated anti-time-wasting rules (3-High-Impact rule, 5-Second rule, Timebox batching, Evening shutdown).
   - Time audit calculator.
6. **UNESCO World Heritage Sites**:
   - Comprehensive explorer with India 42 sites & Global wonders.
   - Instant live search & category filters.
7. **India & Latest Countries**:
   - India Deep-Dive (UPI, space missions, economy, culture).
   - Latest recognized & newly formed sovereign nations (South Sudan, Kosovo, Montenegro, Timor-Leste, Palau, Eritrea) with capitals, currencies, and geopolitical data.
