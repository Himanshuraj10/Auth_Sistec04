/**
 * TrustChain Verify - In-Browser Machine Learning Risk Engine
 * Logistic Regression Classifier with Explainable AI (XAI) Feature Attribution.
 */

const MLEngine = {
  weights: [2.5, 1.8, 2.2, 1.5, 1.6, 3.8, 4.2, 2.8],
  bias: -3.2,

  init() {
    console.log("MLEngine: Calibrated weights loaded for 8 forensic features.");
  },

  predict(features) {
    // features: [elaAnomaly, noiseVariance, metadataFlag, ocrConfidenceVar, layoutDiscrepancy, ruleViolations, dbMismatchScore, duplicateFlag]
    const config = window.currentSiteConfig || window.DEFAULT_SITE_CONFIG;
    let z = this.bias;
    const contributions = [];
    const featureNames = [
      "Error Level Splicing Anomaly",
      "Noise Variance Disparity",
      "Metadata Editing Signature",
      "OCR Font Confidence Variance",
      "Document Layout Geometry Discrepancy",
      "Algorithmic Checksum / Rule Failure",
      "Authoritative Database Discrepancy",
      "Perceptual Template Duplicate (dHash)"
    ];

    for (let i = 0; i < features.length; i++) {
      const term = features[i] * this.weights[i];
      z += term;
      contributions.push({
        name: featureNames[i],
        value: features[i],
        weight: this.weights[i],
        impact: Math.round(term * 15)
      });
    }

    const probability = 1 / (1 + Math.exp(-z));
    const riskScore = Math.min(100, Math.max(0, Math.round(probability * 100)));

    const acceptThreshold = config.systemSettings?.acceptThreshold || 25;
    const rejectThreshold = config.systemSettings?.rejectThreshold || 60;

    let verdict = 'VERIFIED';
    if (riskScore > rejectThreshold) {
      verdict = 'REJECTED';
    } else if (riskScore > acceptThreshold) {
      verdict = 'SUSPICIOUS';
    }

    // Filter top contributing risk factors
    const topReasons = contributions
      .filter(c => c.impact > 3)
      .sort((a, b) => b.impact - a.impact);

    return {
      riskScore,
      probability: probability.toFixed(3),
      verdict,
      contributions,
      topReasons
    };
  }
};

window.MLEngine = MLEngine;
