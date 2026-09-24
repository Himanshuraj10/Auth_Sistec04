/**
 * TrustChain Verify - Photorealistic Canvas Document Generator
 * Generates high-fidelity mock Indian government documents for demonstration.
 */

const SampleDocGenerator = {
  currentSampleCanvas: null,

  generateGenuinePAN() {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 380;
    const ctx = canvas.getContext('2d');

    // Card background with subtle guilloche gradient
    const grad = ctx.createLinearGradient(0, 0, 600, 380);
    grad.addColorStop(0, "#EEF2FF");
    grad.addColorStop(0.5, "#E0E7FF");
    grad.addColorStop(1, "#EEF2FF");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 600, 380);

    // Border
    ctx.strokeStyle = "#4351DB";
    ctx.lineWidth = 4;
    ctx.strokeRect(6, 6, 588, 368);

    // Header strip
    ctx.fillStyle = "#3730A3";
    ctx.fillRect(10, 10, 580, 56);

    ctx.fillStyle = "#FFF";
    ctx.font = "bold 14px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("आयकर विभाग / INCOME TAX DEPARTMENT", 130, 34);
    ctx.font = "11px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("भारत सरकार / GOVT. OF INDIA", 220, 52);

    // Lion Capital emblem silhouette
    ctx.fillStyle = "#F59E0B";
    ctx.beginPath();
    ctx.arc(60, 38, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#3730A3";
    ctx.font = "bold 10px sans-serif";
    ctx.fillText("सत्यमेव", 44, 42);

    // Photo Box
    ctx.fillStyle = "#CBD5E1";
    ctx.fillRect(36, 90, 105, 130);
    ctx.strokeStyle = "#64748B";
    ctx.lineWidth = 1;
    ctx.strokeRect(36, 90, 105, 130);
    ctx.fillStyle = "#475569";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText("PHOTO", 70, 160);

    // Details (Rajesh Kumar Sharma)
    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 12px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("नाम / Name:", 165, 105);
    ctx.font = "bold 15px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("RAJESH KUMAR SHARMA", 165, 126);

    ctx.font = "bold 12px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("पिता का नाम / Father's Name:", 165, 155);
    ctx.font = "bold 14px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("SURESH SHARMA", 165, 174);

    ctx.font = "bold 12px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("जन्म की तारीख / Date of Birth:", 165, 204);
    ctx.font = "bold 14px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("15/08/1988", 165, 224);

    // Permanent Account Number Box
    ctx.fillStyle = "#F8FAFC";
    ctx.fillRect(165, 250, 260, 46);
    ctx.strokeStyle = "#4351DB";
    ctx.lineWidth = 2;
    ctx.strokeRect(165, 250, 260, 46);

    ctx.fillStyle = "#3730A3";
    ctx.font = "bold 11px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("स्थायी खाता संख्या / Permanent Account Number", 175, 266);
    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 20px monospace";
    ctx.fillText("ABCPS1234F", 230, 288);

    // Signature box
    ctx.fillStyle = "#FFF";
    ctx.fillRect(36, 240, 105, 50);
    ctx.strokeRect(36, 240, 105, 50);
    ctx.fillStyle = "#1E40AF";
    ctx.font = "italic 16px cursive";
    ctx.fillText("R.K. Sharma", 48, 272);

    // Micro hologram & QR mock
    ctx.fillStyle = "#E2E8F0";
    ctx.fillRect(450, 90, 110, 110);
    ctx.strokeRect(450, 90, 110, 110);
    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 11px sans-serif";
    ctx.fillText("SECURE QR", 470, 150);

    return canvas;
  },

  generateGenuineMarksheet() {
    const canvas = document.createElement('canvas');
    canvas.width = 650;
    canvas.height = 420;
    const ctx = canvas.getContext('2d');

    // Parchment style background
    ctx.fillStyle = "#FEFDF8";
    ctx.fillRect(0, 0, 650, 420);
    ctx.strokeStyle = "#B45309";
    ctx.lineWidth = 3;
    ctx.strokeRect(8, 8, 634, 404);

    // University Header
    ctx.fillStyle = "#78350F";
    ctx.font = "bold 18px serif";
    ctx.textAlign = "center";
    ctx.fillText("RAJIV GANDHI TECHNICAL UNIVERSITY, BHOPAL", 325, 40);
    ctx.font = "12px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("STATEMENT OF MARKS - B.TECH CSE (SEMESTER VI)", 325, 62);
    ctx.textAlign = "left";

    // Student Info
    ctx.fillStyle = "#1E293B";
    ctx.font = "12px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Candidate: PRIYA VERMA", 40, 95);
    ctx.fillText("Roll No: 2021CS8901", 380, 95);
    ctx.fillText("Course: B.Tech (Computer Science & Engg)", 40, 115);
    ctx.fillText("Year: 2024", 380, 115);

    // Table Header
    ctx.fillStyle = "#F1F5F9";
    ctx.fillRect(40, 135, 570, 26);
    ctx.strokeStyle = "#CBD5E1";
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 135, 570, 26);

    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 11px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Code", 50, 152);
    ctx.fillText("Subject Title", 130, 152);
    ctx.fillText("Max", 440, 152);
    ctx.fillText("Marks Obtained", 510, 152);

    // 5 Subjects
    const subjects = [
      { code: "CS601", name: "Data Structures & Algorithms", max: 100, marks: 84 },
      { code: "CS602", name: "Operating Systems", max: 100, marks: 79 },
      { code: "CS603", name: "Blockchain Technologies", max: 100, marks: 92 },
      { code: "CS604", name: "Computer Networks", max: 100, marks: 86 },
      { code: "CS605", name: "Software Engineering", max: 100, marks: 89 }
    ];

    let y = 180;
    subjects.forEach(s => {
      ctx.font = "11px 'Plus Jakarta Sans', sans-serif";
      ctx.fillText(s.code, 50, y);
      ctx.fillText(s.name, 130, y);
      ctx.fillText(String(s.max), 445, y);
      ctx.fillText(String(s.marks), 530, y);
      y += 24;
    });

    // Total & Percentage Bar
    ctx.fillStyle = "#E2E8F0";
    ctx.fillRect(40, y + 10, 570, 32);
    ctx.strokeRect(40, y + 10, 570, 32);

    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 12px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("TOTAL MARKS: 430 / 500", 60, y + 31);
    ctx.fillText("PERCENTAGE: 86.0%", 280, y + 31);
    ctx.fillText("RESULT: PASS FIRST CLASS", 440, y + 31);

    // Cert No & Seal
    ctx.font = "10px monospace";
    ctx.fillStyle = "#64748B";
    ctx.fillText("Certificate No: RGTU-2024-CS-8901", 40, 395);
    ctx.fillText("Controller of Examinations [SEALED]", 430, 395);

    return canvas;
  },

  generateTamperedPAN() {
    const canvas = this.generateGenuinePAN();
    const ctx = canvas.getContext('2d');

    // Digitally splice Name with telltale edge noise and mismatched font
    ctx.fillStyle = "#EEF2FF";
    ctx.fillRect(160, 110, 240, 24);

    // Noise artifacts in spliced bounding box
    const noiseData = ctx.getImageData(160, 110, 240, 24);
    for (let i = 0; i < noiseData.data.length; i += 4) {
      if (Math.random() < 0.25) {
        noiseData.data[i] = Math.min(255, noiseData.data[i] + 35);
        noiseData.data[i + 1] = Math.max(0, noiseData.data[i + 1] - 30);
      }
    }
    ctx.putImageData(noiseData, 160, 110);

    // Spliced Name: VIKRAM SINGH RATHORE (surname initial R != 5th char S)
    ctx.fillStyle = "#000";
    ctx.font = "bold 15px Arial"; // font mismatch!
    ctx.fillText("VIKRAM SINGH RATHORE", 165, 128);

    return canvas;
  },

  generateForgedMarksheet() {
    const canvas = this.generateGenuineMarksheet();
    const ctx = canvas.getContext('2d');

    // Forge one subject mark to 98 instead of 86 without updating the total
    ctx.fillStyle = "#FEFDF8";
    ctx.fillRect(520, 240, 50, 20);
    ctx.fillStyle = "#000";
    ctx.font = "bold 12px Arial";
    ctx.fillText("98", 530, 252);
    // Sum is now 84+79+92+98+89 = 442, but Total is still stated as 430 -> ARITHMETIC ERROR!

    return canvas;
  },

  generateGhostPAN() {
    const canvas = this.generateGenuinePAN();
    const ctx = canvas.getContext('2d');

    // Clean looking PAN card, but for KAPIL ANAND with PAN XYZPK9999M (Absent from NSDL)
    ctx.fillStyle = "#E0E7FF";
    ctx.fillRect(160, 110, 240, 24);
    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 15px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("KAPIL ANAND", 165, 126);

    ctx.fillStyle = "#F8FAFC";
    ctx.fillRect(165, 250, 260, 46);
    ctx.strokeStyle = "#4351DB";
    ctx.lineWidth = 2;
    ctx.strokeRect(165, 250, 260, 46);

    ctx.fillStyle = "#3730A3";
    ctx.font = "bold 11px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("स्थायी खाता संख्या / Permanent Account Number", 175, 266);
    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 20px monospace";
    ctx.fillText("XYZPK9999M", 230, 288);

    return canvas;
  },

  loadSample(sampleKey) {
    let canvas;
    let docType = 'PAN';
    if (sampleKey === 'genuine_pan') {
      canvas = this.generateGenuinePAN();
      docType = 'PAN';
    } else if (sampleKey === 'genuine_marksheet') {
      canvas = this.generateGenuineMarksheet();
      docType = 'MARKSHEET';
    } else if (sampleKey === 'tampered_pan') {
      canvas = this.generateTamperedPAN();
      docType = 'PAN';
    } else if (sampleKey === 'forged_marksheet') {
      canvas = this.generateForgedMarksheet();
      docType = 'MARKSHEET';
    } else if (sampleKey === 'ghost_pan') {
      canvas = this.generateGhostPAN();
      docType = 'PAN';
    }

    this.currentSampleCanvas = canvas;
    window.AppState.currentDoc.canvas = canvas;
    window.AppState.currentDoc.dataUrl = canvas.toDataURL('image/png');
    window.AppState.currentDoc.isSample = true;
    window.AppState.currentDoc.sampleType = sampleKey;
    window.AppState.currentDoc.docType = docType;

    const select = document.getElementById('doc-type-select');
    if (select) select.value = docType;
    const badge = document.getElementById('doc-type-detected-badge');
    if (badge) badge.innerText = docType;

    // Render Preview
    const previewCanvas = document.getElementById('source-preview-canvas');
    if (previewCanvas) {
      previewCanvas.width = canvas.width;
      previewCanvas.height = canvas.height;
      previewCanvas.getContext('2d').drawImage(canvas, 0, 0);
      previewCanvas.style.display = 'block';
    }
    const ph = document.getElementById('preview-placeholder');
    if (ph) ph.style.display = 'none';

    UI.showToast(`Loaded sample template: ${sampleKey.replace('_', ' ').toUpperCase()}`, "info");
  },

  downloadCurrentCanvas() {
    if (!this.currentSampleCanvas) {
      this.loadSample('genuine_pan');
    }
    const a = document.createElement('a');
    a.href = this.currentSampleCanvas.toDataURL('image/png');
    a.download = `trustchain_${window.AppState?.currentDoc?.sampleType || 'doc'}.png`;
    a.click();
  }
};

window.SampleDocGenerator = SampleDocGenerator;
