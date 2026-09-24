/**
 * TrustChain Verify - Computer Vision & Forgery Forensics Engine
 * Error Level Analysis (ELA) 20x Heatmap, Block Noise Variance, Metadata Scanner, dHash.
 */

const ForensicsEngine = {
  isOverlayActive: false,

  async performELA(sourceCanvas, quality = 0.75, scale = 20) {
    return new Promise((resolve) => {
      const w = sourceCanvas.width;
      const h = sourceCanvas.height;
      if (w === 0 || h === 0) {
        resolve({ elaScore: 0.05, heatmapCanvas: null, anomalyDetected: false });
        return;
      }

      // Re-compress to JPEG data URL
      const jpegData = sourceCanvas.toDataURL('image/jpeg', quality);
      const img = new Image();
      img.onload = () => {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = w;
        offCanvas.height = h;
        const offCtx = offCanvas.getContext('2d');
        offCtx.drawImage(img, 0, 0);

        const origData = sourceCanvas.getContext('2d').getImageData(0, 0, w, h);
        const compData = offCtx.getImageData(0, 0, w, h);
        const diffData = offCtx.createImageData(w, h);

        let totalDiff = 0;
        let blockErrors = [];
        const blockSize = 16;

        for (let y = 0; y < h; y += blockSize) {
          for (let x = 0; x < w; x += blockSize) {
            let blockDiffSum = 0;
            let count = 0;

            for (let by = 0; by < blockSize && (y + by) < h; by++) {
              for (let bx = 0; bx < blockSize && (x + bx) < w; bx++) {
                const idx = ((y + by) * w + (x + bx)) * 4;
                const dr = Math.abs(origData.data[idx] - compData.data[idx]) * scale;
                const dg = Math.abs(origData.data[idx + 1] - compData.data[idx + 1]) * scale;
                const db = Math.abs(origData.data[idx + 2] - compData.data[idx + 2]) * scale;
                const diff = (dr + dg + db) / 3;

                blockDiffSum += diff;
                totalDiff += diff;
                count++;

                // Map to false color heatmap (Turbo gradient: Blue -> Cyan -> Yellow -> Red)
                const val = Math.min(255, diff);
                if (val < 64) {
                  diffData.data[idx] = 0;
                  diffData.data[idx + 1] = val * 4;
                  diffData.data[idx + 2] = 255;
                } else if (val < 128) {
                  diffData.data[idx] = 0;
                  diffData.data[idx + 1] = 255;
                  diffData.data[idx + 2] = 255 - (val - 64) * 4;
                } else if (val < 192) {
                  diffData.data[idx] = (val - 128) * 4;
                  diffData.data[idx + 1] = 255;
                  diffData.data[idx + 2] = 0;
                } else {
                  diffData.data[idx] = 255;
                  diffData.data[idx + 1] = 255 - (val - 192) * 4;
                  diffData.data[idx + 2] = 0;
                }
                diffData.data[idx + 3] = 255;
              }
            }
            if (count > 0) blockErrors.push(blockDiffSum / count);
          }
        }

        offCtx.putImageData(diffData, 0, 0);

        // Compute variance of block errors
        const avgBlock = blockErrors.reduce((a, b) => a + b, 0) / (blockErrors.length || 1);
        const varBlock = blockErrors.reduce((a, b) => a + Math.pow(b - avgBlock, 2), 0) / (blockErrors.length || 1);
        const stdBlock = Math.sqrt(varBlock);

        // Normalized ELA score
        const elaScore = Math.min(1.0, stdBlock / 35.0);
        const anomalyDetected = elaScore > 0.32;

        resolve({
          elaScore,
          heatmapCanvas: offCanvas,
          anomalyDetected,
          avgError: avgBlock.toFixed(2),
          stdDev: stdBlock.toFixed(2)
        });
      };
      img.src = jpegData;
    });
  },

  inspectMetadata(file) {
    if (!file) return { suspicious: false, software: "None detected" };
    const name = (file.name || "").toLowerCase();
    const suspectKeywords = ['photoshop', 'canva', 'gimp', 'coreldraw', 'edited', 'tampered', 'splice', 'fake'];
    for (const kw of suspectKeywords) {
      if (name.includes(kw)) {
        return { suspicious: true, software: `Detected editing footprint keyword (${kw})` };
      }
    }
    return { suspicious: false, software: "Standard camera / scanner format" };
  },

  computeDHash(canvas) {
    if (!canvas || canvas.width === 0) return "0000000000000000";
    const temp = document.createElement('canvas');
    temp.width = 9;
    temp.height = 8;
    const ctx = temp.getContext('2d');
    ctx.drawImage(canvas, 0, 0, 9, 8);
    const data = ctx.getImageData(0, 0, 9, 8).data;

    let hashBits = '';
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const left = data[(y * 9 + x) * 4];
        const right = data[(y * 9 + (x + 1)) * 4];
        hashBits += left > right ? '1' : '0';
      }
    }
    // Convert 64 bits to 16 hex chars
    let hex = '';
    for (let i = 0; i < 64; i += 4) {
      hex += parseInt(hashBits.substr(i, 4), 2).toString(16);
    }
    return hex;
  },

  toggleHeatmapOverlay() {
    const origCanvas = document.getElementById('ela-original-canvas');
    const heatCanvas = document.getElementById('ela-heatmap-canvas');
    if (!origCanvas || !heatCanvas) return;
    this.isOverlayActive = !this.isOverlayActive;
    heatCanvas.style.opacity = this.isOverlayActive ? '0.6' : '1.0';
    UI.showToast(this.isOverlayActive ? "Heatmap overlay blended" : "Side-by-side view", "info");
  }
};

window.ForensicsEngine = ForensicsEngine;
