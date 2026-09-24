/**
 * TrustChain Verify - Master Site Configuration
 * All user-facing text, colors, labels, and settings reside here.
 * Dynamically loaded from Firestore siteConfig/main or falls back to this dictionary.
 */

const DEFAULT_SITE_CONFIG = {
  branding: {
    appName: "TrustChain Verify",
    tagline: "Intelligent Document Verification & Cryptographic Trust",
    logoEmoji: "🛡️",
    teamName: "Team TrustChain",
    teamMembers: "SISTec Hackathon Engineering Team",
    orgName: "Ministry of Electronics & Information Technology",
    contactEmail: "support@trustchain.gov.in",
    footerText: "© 2026 TrustChain Verify • Built for Government Document Verification & Digital Trust"
  },

  ownerProfile: {
    displayName: "Dr. Vikram Sethi",
    roleTitle: "Chief Verification Officer, MeitY",
    panelTitle: "Verifier Authority Console",
    welcomeMessage: "Welcome back, Officer. Review pending verification cases and monitor ledger consensus.",
    avatar: "VS",
    photoUrl: ""
  },

  landing: {
    heroKicker: "Ministry of Electronics & IT • Digital Trust Framework",
    heroTitle: "Check any government document in seconds",
    heroSubtitle: "Upload your PAN card, ID, or certificate. We read it, match it with official records, spot fake or edited documents, and give you a proof that nobody can change.",
    ctaSignIn: "Sign in with Google",
    ctaVerifyReceipt: "Verify a Receipt",
    ctaDemoTour: "Judge Demo Tour (3 Min)",
    
    trustStrip: [
      { icon: "fa-bolt", text: "Fast results in 3 seconds" },
      { icon: "fa-shield-halved", text: "Spots fake & edited documents" },
      { icon: "fa-lock", text: "100% private and secure" }
    ],

    howItWorks: {
      kicker: "Simple 3-Step Process",
      heading: "How it works in 3 simple steps",
      subtitle: "No complicated steps or long waiting lines.",
      steps: [
        {
          icon: "fa-cloud-arrow-up",
          title: "1. Upload",
          desc: "Add a photo or PDF of your document from your phone or computer."
        },
        {
          icon: "fa-magnifying-glass-check",
          title: "2. We check",
          desc: "Our system reads the details and compares them with official records."
        },
        {
          icon: "fa-file-shield",
          title: "3. Get proof",
          desc: "You get a clear result and a digital receipt that anyone can verify."
        }
      ]
    },

    whyUseIt: {
      kicker: "Key Benefits",
      heading: "Why use TrustChain?",
      subtitle: "Built to make government document verification fast, safe, and transparent.",
      cards: [
        {
          icon: "fa-clock",
          color: "primary",
          title: "Saves hours of waiting",
          desc: "Get instant verification in 3 seconds without having to visit any government office."
        },
        {
          icon: "fa-triangle-exclamation",
          color: "amber",
          title: "Stops fake documents",
          desc: "Smart computer vision spots altered names, photo splices, and fake marks automatically."
        },
        {
          icon: "fa-user-lock",
          color: "teal",
          title: "Your data stays private",
          desc: "Your actual document stays on your device. Only a private digital fingerprint is recorded."
        },
        {
          icon: "fa-cube",
          color: "green",
          title: "Proof that can't be edited",
          desc: "Every verified document gets a permanent cryptographic receipt that anyone can check."
        }
      ]
    },

    blockchainExplanation: {
      heading: "What is blockchain?",
      sentence: "It's a permanent digital record book. Once a verification result is written, no one can secretly alter, delete, or fake it."
    },

    supportedDocs: [
      {
        icon: "fa-id-card",
        title: "PAN Cards",
        desc: "Checks format, 5th-character surname matching, and NSDL database records."
      },
      {
        icon: "fa-address-card",
        title: "Aadhaar / National IDs",
        desc: "Verifies 12-digit numbers with authentic Verhoeff mathematical checksums."
      },
      {
        icon: "fa-graduation-cap",
        title: "Academic Certificates",
        desc: "Cross-totals marks, recalculates percentages, and verifies university rolls."
      }
    ],

    faqs: [
      {
        q: "Do I need to pay to check my document?",
        a: "No, document verification is completely free for citizens."
      },
      {
        q: "Is my personal document shared publicly?",
        a: "Never. Your personal document photo is never uploaded to the public blockchain. Only a one-way mathematical fingerprint is recorded to prove authenticity."
      },
      {
        q: "What happens if my document is edited or fake?",
        a: "Our forensic analysis will highlight the exact altered regions and explain why the document failed verification."
      },
      {
        q: "How can an employer or official verify my receipt?",
        a: "They simply scan the QR code on your receipt or type your Receipt ID into the public verification box—no login required."
      },
      {
        q: "What file types can I upload?",
        a: "You can upload clear photos in JPG or PNG format, as well as digital PDF documents up to 15MB."
      }
    ]
  },

  theme: {
    primaryColor: "#5B6CFF",
    secondaryColor: "#2DD4BF",
    accentColor: "#FFB86B",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    borderRadius: "16px",
    defaultTheme: "light",
    preset: "Default"
  },

  navigation: {
    citizenTabs: {
      dashboard: "Dashboard",
      upload: "Upload & Verify",
      records: "My Records",
      privacy: "Privacy Center",
      publicVerify: "Public Verification"
    },
    adminTabs: {
      analytics: "Analytics Dashboard",
      queue: "Review Queue",
      accessControl: "Access Control",
      explorer: "Blockchain Explorer",
      tamper: "Tamper Demo Studio",
      registries: "Authoritative Registries",
      alerts: "Fraud & Duplicate Alerts",
      audit: "Activity & Audit Logs",
      settings: "Site Settings & Content Editor"
    }
  },

  systemSettings: {
    acceptThreshold: 25,
    rejectThreshold: 60,
    difficulty: 2,
    sessionTimeoutMinutes: 15,
    maxFileSizeMB: 15,
    registrationMode: "open", // "open", "approval", "invite"
    allowedDomains: [],
    blockedDomains: [
      "mailinator.com",
      "tempmail.com",
      "guerrillamail.com",
      "yopmail.com",
      "trashmail.com",
      "10minutemail.com",
      "sharklasers.com",
      "dispostable.com"
    ],
    blockedEmails: [],
    consentText: "I consent to client-side verification against simulated databases. Only cryptographic hashes will be written to the blockchain.",
    privacyPolicyText: "TrustChain Verify adheres to strict zero-knowledge and data minimization principles. Personal documents are encrypted with AES-GCM (256-bit) and never stored on the public blockchain."
  },

  messages: {
    verdictVerified: "DOCUMENT VERIFIED & AUTHENTIC",
    verdictSuspicious: "DOCUMENT FLAGGED AS SUSPICIOUS",
    verdictRejected: "DOCUMENT REJECTED",
    lowRiskLabel: "Minimal Fraud Risk (Sealed On-Chain)",
    mediumRiskLabel: "Elevated Risk: Splicing / Verification Inconsistency",
    highRiskLabel: "Severe Fraud Risk: Mathematical Checksum / Unregistered"
  }
};

window.DEFAULT_SITE_CONFIG = DEFAULT_SITE_CONFIG;
window.currentSiteConfig = JSON.parse(JSON.stringify(DEFAULT_SITE_CONFIG));
