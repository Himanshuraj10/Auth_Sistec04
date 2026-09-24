# TrustChain Verify 🛡️
### Intelligent Blockchain-Based Government Document Verification System
**Built for the SISTec Hackathon 2026** • Designed for the Ministry of Electronics & IT (MeitY)

---

## 🌟 Overview
**TrustChain Verify** transforms slow, manual government document verification into an instantaneous, tamper-evident 8-stage automated pipeline. It combines **in-browser computer vision & OCR**, **mathematical rule validation (Verhoeff & PAN)**, **synthetic authoritative registries**, **Error Level Analysis (ELA) forgery heatmaps**, **calibrated Machine Learning**, and a **Web Crypto Proof-of-Work multi-node blockchain ledger**.

All user-facing copy, branding, owner profiles, themes, and thresholds are fully customizable in real-time via the built-in **Site Settings & Content Editor** backed by **Cloud Firestore**.

---

## 🚀 Quick Start (Local Run)

### Option 1: Double-Click / Direct Browser Launch (Demo Mode)
No build tools, compilation, or web servers are required! Simply double-click `index.html` or open it in any modern browser (Chrome, Edge, Firefox, Brave):
```powershell
# Open directly in Microsoft Edge
Start-Process "msedge.exe" "file:///a:/sistec hackaton/index.html"
```

### Option 2: Local Static Server
If you prefer running via HTTP:
```powershell
npx serve "a:\sistec hackaton"
# or with Python
python -m http.server 8000 --directory "a:\sistec hackaton"
```

---

## 🔥 Connecting Real Firebase (Cloud Firestore & Google Auth)

The system is configured to work in **Offline Demo Mode** out of the box. To connect to a live Firebase backend:

1. Visit [Firebase Console](https://console.firebase.google.com/) and create a project.
2. Navigate to **Authentication** > **Sign-in method** > Enable **Google**.
3. Navigate to **Cloud Firestore** > **Create database** (start in production or test mode).
4. Copy the security rules from `firestore.rules` into your Firestore Rules tab and publish.
5. In Project Settings > Web App, copy your config credentials into `firebase-config.js`:
   ```javascript
   const FIREBASE_CONFIG = {
     apiKey: "AIzaSy...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:..."
   };

   // Set your Google email address as the permanent Super Admin / Owner:
   const OWNER_EMAIL = "yourname@gmail.com";
   ```
6. Reload `index.html`. Your platform is now connected to Cloud Firestore with live multi-user synchronization!

---

## ⏱️ 3-Minute Hackathon Demo Script

Follow this script to demonstrate the key innovations to evaluators:

1. **Simple, Plain-English Homepage (30s):**
   - Show the clean 2025 SaaS UI (`#5B6CFF` Indigo, `#2DD4BF` Teal).
   - Point out the plain-English hero: *"Check any government document in seconds"*.
   - Point out the 1-sentence blockchain definition: *"It's a permanent digital record book. Once a verification result is written, no one can secretly alter, delete, or fake it."*
   - Expand the collapsible *"For Judges & Technical Evaluators"* drawer to reveal the architecture.

2. **Run Spliced Document Verification (60s):**
   - Click **"Sign in with Google"** > choose **"Citizen Applicant"** (or use real Google Sign-In).
   - Go to **"Upload & Verify"** and click **"Tampered PAN (Splice)"** from the sample bar.
   - Click **"Run 8-Stage Verification Pipeline"**.
   - Watch the animated stepper progress through all 8 stages in ~3 seconds.
   - Observe the **ELA 20x Turbo Heatmap** highlight the altered name in bright red!
   - View the **Explainable AI (XAI)** attribution bar chart showing why the document was rejected.

3. **Tamper Demo Studio (45s):**
   - Sign in as **"Super Admin / Owner"** (`owner@demo.in`).
   - Click **"Tamper Demo Studio"** in the sidebar.
   - Click **"Maliciously Corrupt Block #1"**.
   - Watch the entire blockchain turn **RED** with diagnostic hash discrepancies.
   - Click **"Restore Genuine Consensus"** to re-synchronize with consensus nodes.

4. **Live Site Settings CMS (45s):**
   - Click **"Site Settings & Content"** in the Admin sidebar.
   - Select a Theme Preset (e.g., **"Ocean Blue"** or **"Forest Emerald"**).
   - Modify the Hero Title or Tagline in the form.
   - Click **"Save & Apply Live"** — watch all text and colors update immediately across the app!

---

## 🏗️ Architecture & File Structure

```
a:\sistec hackaton\
├── index.html              # Modern 2025 SaaS single-entry web application
├── firebase-config.js      # Firebase keys & OWNER_EMAIL configuration
├── firestore.rules         # Production Cloud Firestore RBAC security rules
├── README.md               # Documentation & Evaluation Guide
├── css/
│   ├── theme.css           # CSS variables, color tokens, dark mode, presets
│   ├── main.css            # Bento grid layouts, glassmorphic top navbar, sidebars
│   └── components.css      # Stepper, risk dial, buttons, ELA viewer, receipts, toasts
└── js/
    ├── config.js           # Default siteConfig master dictionary (all copy & colors)
    ├── firebase-service.js # Firebase Auth & Firestore CRUD with Demo Mode fallback
    ├── auth.js             # Google Sign-In, disposable email blocker, RBAC, timeout
    ├── crypto.js           # Web Crypto SHA-256, ECDSA P-256, AES-GCM 256-bit
    ├── storage.js          # Encrypted IndexedDB (off-chain) + data portability
    ├── blockchain.js       # Shared ledger, Merkle proofs, PoW mining, 3-node BFT
    ├── ocr.js              # Canvas preprocessing, Tesseract.js, fallback parser
    ├── validation.js       # Mathematical Verhoeff Aadhaar, PAN 5th char, Marksheet math
    ├── registry.js         # 42 NSDL + 42 UIDAI + 42 University rolls, Levenshtein fuzzy match
    ├── forensics.js        # ELA 20x heatmap, block noise variance, metadata scanner, dHash
    ├── ml.js               # Calibrated Logistic Regression + XAI impact scoring
    ├── samples.js          # Photorealistic canvas document generator
    ├── admin.js            # Access control, user table, pre-authorizations, review queue
    ├── settings.js         # Live CMS settings editor, JSON export/import, presets
    ├── ui.js               # DOM hydration from siteConfig, Chart.js, QR codes, navigation
    └── app.js              # 8-stage pipeline orchestrator and application bootstrapper
```

---

## 🔒 Privacy & Compliance
- **Zero-Knowledge Architecture:** Physical identity documents are never written to the blockchain. Only salted SHA-256 digests and ECDSA signatures are recorded on-chain.
- **Client-Side Encryption:** Local images in IndexedDB are protected using AES-GCM with 256-bit keys.
- **DPDP Act 2023:** Built-in Right to Portability (JSON export) and Right to Erasure (instant purge of off-chain images).
