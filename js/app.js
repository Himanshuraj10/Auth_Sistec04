/**
 * TrustChain Verify - Application Bootstrapper & Verification Pipeline
 * Orchestrates 8-stage automated verification pipeline with live animated UI feedback.
 */

window.AppState = {
  currentUser: null,
  currentDoc: {
    canvas: null,
    dataUrl: null,
    file: null,
    isSample: false,
    sampleType: null,
    docType: 'PAN'
  },
  pipelineResults: null,
  currentInspection: null
};

const VerificationPipeline = {
  isProcessing: false,

  updateStepUI(stepIndex, state, durationMs = 0) {
    // stepIndex: 1 to 8
    const node = document.getElementById(`pipeline-step-${stepIndex}`);
    if (!node) return;

    node.classList.remove('active', 'completed', 'failed');
    const durEl = node.querySelector('.step-duration-text');

    if (state === 'active') {
      node.classList.add('active');
      if (durEl) durEl.innerText = 'Processing...';
    } else if (state === 'completed') {
      node.classList.add('completed');
      if (durEl) durEl.innerText = `${durationMs}ms ✓`;
    } else if (state === 'failed') {
      node.classList.add('failed');
      if (durEl) durEl.innerText = `${durationMs}ms ✗`;
    }
  },

  resetStepper() {
    for (let i = 1; i <= 8; i++) {
      const node = document.getElementById(`pipeline-step-${i}`);
      if (node) {
        node.classList.remove('active', 'completed', 'failed');
        const durEl = node.querySelector('.step-duration-text');
        if (durEl) durEl.innerText = 'Pending';
      }
    }
  },

  async run() {
    if (this.isProcessing) return;
    const doc = window.AppState.currentDoc;
    if (!doc.canvas) {
      UI.showToast("Please upload a document or select a sample first.", "warning");
      return;
    }

    this.isProcessing = true;
    this.resetStepper();
    const btn = document.getElementById('btn-start-verification');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Verifying Pipeline...`;
    }

    const docType = document.getElementById('doc-type-select')?.value || doc.docType || 'PAN';
    const startTime = Date.now();
    let t0, t1;

    try {
      // -------------------------------------------------------------
      // STAGE 1: File Ingestion & Client Hash
      // -------------------------------------------------------------
      t0 = performance.now();
      this.updateStepUI(1, 'active');
      const docHash = await CryptoEngine.sha256(doc.dataUrl);
      await new Promise(r => setTimeout(r, 200));
      t1 = performance.now();
      this.updateStepUI(1, 'completed', Math.round(t1 - t0));

      // -------------------------------------------------------------
      // STAGE 2: OCR Preprocessing & Extraction
      // -------------------------------------------------------------
      t0 = performance.now();
      this.updateStepUI(2, 'active');
      const preCanvas = OCREngine.preprocessCanvas(doc.canvas);
      const ocrResult = await OCREngine.extractText(preCanvas);
      t1 = performance.now();
      this.updateStepUI(2, 'completed', Math.round(t1 - t0));

      // -------------------------------------------------------------
      // STAGE 3: Algorithmic Rule Engine
      // -------------------------------------------------------------
      t0 = performance.now();
      this.updateStepUI(3, 'active');
      let ruleResult = { valid: true, reason: "Format verified" };

      if (docType === 'PAN') {
        const pan = ocrResult.fields?.pan;
        const name = ocrResult.fields?.name;
        ruleResult = RuleValidator.validatePAN(pan, name);
      } else if (docType === 'AADHAAR') {
        const aadhaar = ocrResult.fields?.aadhaar;
        ruleResult = RuleValidator.validateAadhaar(aadhaar);
      } else if (docType === 'MARKSHEET') {
        ruleResult = RuleValidator.validateMarksheetMath(
          ocrResult.fields?.subjects,
          ocrResult.fields?.totalMarks,
          ocrResult.fields?.maxMarks,
          ocrResult.fields?.percentage
        );
      }
      await new Promise(r => setTimeout(r, 220));
      t1 = performance.now();
      this.updateStepUI(3, ruleResult.valid ? 'completed' : 'failed', Math.round(t1 - t0));

      // -------------------------------------------------------------
      // STAGE 4: Authoritative Registry Cross-Check
      // -------------------------------------------------------------
      t0 = performance.now();
      this.updateStepUI(4, 'active');
      let registryResult = { found: true, similarity: 1.0, reason: "Verified" };

      if (docType === 'PAN') {
        registryResult = await RegistryEngine.queryNSDL(ocrResult.fields?.pan || 'ABCPS1234F', ocrResult.fields?.name);
      } else if (docType === 'AADHAAR') {
        registryResult = await RegistryEngine.queryUIDAI(ocrResult.fields?.aadhaar || '234567890128', ocrResult.fields?.name);
      } else if (docType === 'MARKSHEET') {
        registryResult = await RegistryEngine.queryUniversity(ocrResult.fields?.rollNo || '2021CS8901', ocrResult.fields?.name);
      }
      t1 = performance.now();
      this.updateStepUI(4, registryResult.found && registryResult.similarity > 0.8 ? 'completed' : 'failed', Math.round(t1 - t0));

      // -------------------------------------------------------------
      // STAGE 5: Computer Vision Forgery Forensics
      // -------------------------------------------------------------
      t0 = performance.now();
      this.updateStepUI(5, 'active');
      const elaResult = await ForensicsEngine.performELA(doc.canvas, 0.75, 20);
      const metaResult = ForensicsEngine.inspectMetadata(doc.file);
      const dHash = ForensicsEngine.computeDHash(doc.canvas);
      t1 = performance.now();
      this.updateStepUI(5, elaResult.anomalyDetected ? 'failed' : 'completed', Math.round(t1 - t0));

      // Display Forensic ELA split viewer
      const origCanvas = document.getElementById('ela-original-canvas');
      const heatCanvas = document.getElementById('ela-heatmap-canvas');
      if (origCanvas && heatCanvas && elaResult.heatmapCanvas) {
        origCanvas.width = doc.canvas.width;
        origCanvas.height = doc.canvas.height;
        origCanvas.getContext('2d').drawImage(doc.canvas, 0, 0);

        heatCanvas.width = elaResult.heatmapCanvas.width;
        heatCanvas.height = elaResult.heatmapCanvas.height;
        heatCanvas.getContext('2d').drawImage(elaResult.heatmapCanvas, 0, 0);
      }

      // -------------------------------------------------------------
      // STAGE 6: ML Risk Scoring & XAI
      // -------------------------------------------------------------
      t0 = performance.now();
      this.updateStepUI(6, 'active');
      const features = [
        elaResult.anomalyDetected ? 1.0 : (elaResult.elaScore > 0.15 ? 0.4 : 0.05),
        elaResult.anomalyDetected ? 0.8 : 0.1,
        metaResult.suspicious ? 1.0 : 0.0,
        ocrResult.confidence < 80 ? 0.8 : 0.05,
        0.0, // layout discrepancy
        ruleResult.valid ? 0.0 : 1.0,
        !registryResult.found ? 1.0 : (registryResult.similarity < 0.8 ? 0.8 : 0.0),
        0.0 // duplicate template
      ];

      const mlResult = MLEngine.predict(features);
      await new Promise(r => setTimeout(r, 200));
      t1 = performance.now();
      this.updateStepUI(6, mlResult.verdict === 'VERIFIED' ? 'completed' : 'failed', Math.round(t1 - t0));

      // -------------------------------------------------------------
      // STAGE 7: Blockchain Anchoring & Consensus
      // -------------------------------------------------------------
      t0 = performance.now();
      this.updateStepUI(7, 'active');
      const receiptId = `REC-2026-${docType}-${Math.floor(1000 + Math.random() * 9000)}`;

      const txPayload = [{
        txId: 'tx_' + Date.now(),
        type: "VERIFICATION_RECORD",
        receiptId,
        docHash,
        docType,
        verdict: mlResult.verdict,
        riskScore: mlResult.riskScore,
        verifierId: window.AppState?.currentUser?.email || "officer@meity.gov.in",
        timestamp: Date.now()
      }];

      const minedBlock = await BlockchainEngine.mineBlock(txPayload);
      const signature = await CryptoEngine.sign(docHash);
      t1 = performance.now();
      this.updateStepUI(7, 'completed', Math.round(t1 - t0));

      // -------------------------------------------------------------
      // STAGE 8: Receipt & Privacy Dual Storage
      // -------------------------------------------------------------
      t0 = performance.now();
      this.updateStepUI(8, 'active');

      const submissionRecord = {
        receiptId,
        docType,
        docHash,
        verdict: mlResult.verdict,
        riskScore: mlResult.riskScore,
        confidence: ocrResult.confidence,
        citizenName: ocrResult.fields?.name || "Verified Citizen",
        identifier: ocrResult.fields?.pan || ocrResult.fields?.aadhaar || ocrResult.fields?.rollNo || "ID-ENCRYPTED",
        verifierId: window.AppState?.currentUser?.email || "citizen@trustchain.gov.in",
        timestamp: Date.now(),
        signature,
        blockIndex: minedBlock.index,
        topReasons: mlResult.topReasons
      };

      // Store in Firestore and IndexedDB
      await FirebaseService.saveSubmission(submissionRecord);
      await StorageEngine.storeEncryptedDocument(receiptId, doc.dataUrl, { docType, receiptId });

      await new Promise(r => setTimeout(r, 180));
      t1 = performance.now();
      this.updateStepUI(8, 'completed', Math.round(t1 - t0));

      // Render Results Panel
      this.renderVerificationResults(submissionRecord, mlResult, ocrResult, ruleResult, registryResult, elaResult);
      UI.showToast(`Verification complete: ${mlResult.verdict} (Risk: ${mlResult.riskScore}%)`, mlResult.verdict === 'VERIFIED' ? 'success' : 'error');

    } catch (err) {
      console.error("Pipeline failure:", err);
      UI.showToast("Pipeline error: " + err.message, "error");
    } finally {
      this.isProcessing = false;
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<i class="fa-solid fa-play"></i> Run 8-Stage Verification Pipeline`;
      }
    }
  },

  renderVerificationResults(record, ml, ocr, rule, reg, ela) {
    const resultsPanel = document.getElementById('verification-results-panel');
    if (!resultsPanel) return;
    resultsPanel.style.display = 'block';
    resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Verdict Badge
    const verdictEl = document.getElementById('result-verdict-title');
    const verdictBadge = document.getElementById('result-verdict-pill');
    if (verdictEl) verdictEl.innerText = record.verdict;
    if (verdictBadge) {
      verdictBadge.className = `pill-badge ${record.verdict === 'VERIFIED' ? 'success' : (record.verdict === 'SUSPICIOUS' ? 'warning' : 'danger')}`;
      verdictBadge.innerText = record.verdict;
    }

    // Risk Dial
    const riskDialVal = document.getElementById('result-risk-number');
    if (riskDialVal) riskDialVal.innerText = `${record.riskScore}%`;

    // OCR extracted text
    const ocrBox = document.getElementById('result-ocr-fields-box');
    if (ocrBox) {
      ocrBox.innerHTML = Object.entries(ocr.fields || {}).map(([k, v]) => `
        <div style="font-size: 13px; margin-bottom: 6px;">
          <span style="color: var(--text-muted); text-transform: capitalize;">${k}:</span>
          <strong>${typeof v === 'object' ? JSON.stringify(v) : v}</strong>
        </div>
      `).join('') || '<p style="color: var(--text-muted); font-size: 13px;">No explicit fields extracted</p>';
    }

    // XAI Risk Factors
    const xaiBox = document.getElementById('result-xai-factors-box');
    if (xaiBox) {
      if (ml.topReasons && ml.topReasons.length > 0) {
        xaiBox.innerHTML = ml.topReasons.map(r => `
          <div style="margin-bottom: 8px; font-size: 13px;">
            <div style="display: flex; justify-content: space-between;">
              <span>${r.name}</span>
              <strong style="color: var(--danger-color);">+${r.impact}%</strong>
            </div>
            <div style="background: var(--bg-subtle); height: 6px; border-radius: 3px; overflow: hidden; margin-top: 4px;">
              <div style="background: var(--danger-color); height: 100%; width: ${Math.min(100, r.impact * 2.5)}%;"></div>
            </div>
          </div>
        `).join('');
      } else {
        xaiBox.innerHTML = `<p style="color: var(--success-color); font-size: 13px;"><i class="fa-solid fa-check"></i> Zero anomalous risk factors detected. Document matches authoritative records perfectly.</p>`;
      }
    }

    // Receipt ID link
    const recLink = document.getElementById('result-receipt-id-link');
    if (recLink) {
      recLink.innerText = record.receiptId;
      recLink.onclick = () => UI.showReceiptCard(record.receiptId);
    }
  }
};

// Application Startup
document.addEventListener('DOMContentLoaded', async () => {
  console.log("TrustChain Verify: Booting modular 2025 SaaS platform...");

  // 1. Initialize Firebase and Storage
  await FirebaseService.init();
  await StorageEngine.init();

  // 2. Load Site Configuration
  window.currentSiteConfig = await FirebaseService.loadSiteConfig();

  // 3. Initialize Engines
  await CryptoEngine.init();
  await BlockchainEngine.init();
  MLEngine.init();
  UI.init();
  Auth.init();

  // 4. Setup File Upload Handlers
  const dropZone = document.getElementById('doc-upload-dropzone');
  const fileInput = document.getElementById('doc-file-input');

  if (dropZone && fileInput) {
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--primary-color)'; });
    dropZone.addEventListener('dragleave', () => { dropZone.style.borderColor = 'var(--border-color)'; });
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = 'var(--border-color)';
      if (e.dataTransfer.files.length) handleUploadedFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length) handleUploadedFile(e.target.files[0]);
    });
  }

  function handleUploadedFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);

        window.AppState.currentDoc.canvas = canvas;
        window.AppState.currentDoc.dataUrl = e.target.result;
        window.AppState.currentDoc.file = file;
        window.AppState.currentDoc.isSample = false;

        const previewCanvas = document.getElementById('source-preview-canvas');
        if (previewCanvas) {
          previewCanvas.width = canvas.width;
          previewCanvas.height = canvas.height;
          previewCanvas.getContext('2d').drawImage(canvas, 0, 0);
          previewCanvas.style.display = 'block';
        }
        const ph = document.getElementById('preview-placeholder');
        if (ph) ph.style.display = 'none';

        UI.showToast(`Uploaded ${file.name} (${Math.round(file.size / 1024)} KB)`, "info");
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  console.log("TrustChain Verify: Ready!");
});

window.VerificationPipeline = VerificationPipeline;
