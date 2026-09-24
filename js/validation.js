/**
 * TrustChain Verify - Algorithmic Rule Engine
 * Mathematical Verhoeff Aadhaar Checksum, PAN Syntax & Surname Rules, Marksheet Math Sums.
 */

const RuleValidator = {
  verhoeff_d: [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
  ],
  verhoeff_p: [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
  ],

  validateAadhaar(numStr) {
    if (!numStr) return { valid: false, reason: "Aadhaar number missing" };
    const clean = numStr.replace(/\s+/g, '');
    if (!/^\d{12}$/.test(clean)) {
      return { valid: false, reason: "Aadhaar must be exactly 12 digits" };
    }
    let c = 0;
    const rev = clean.split('').reverse().map(Number);
    for (let i = 0; i < rev.length; i++) {
      c = this.verhoeff_d[c][this.verhoeff_p[i % 8][rev[i]]];
    }
    return {
      valid: c === 0,
      reason: c === 0 ? "Verhoeff checksum passed" : "Verhoeff mathematical checksum failed"
    };
  },

  validatePAN(panStr, fullName) {
    if (!panStr) return { valid: false, reason: "PAN number missing" };
    const pan = panStr.toUpperCase().trim();
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)) {
      return { valid: false, reason: "PAN must follow format AAAAA9999A" };
    }
    const validEntities = ['P', 'C', 'H', 'F', 'A', 'T', 'B', 'L', 'J', 'G'];
    const entityChar = pan[3];
    if (!validEntities.includes(entityChar)) {
      return { valid: false, reason: `4th character '${entityChar}' is not a valid Indian PAN entity type` };
    }
    // 5th character rule: matches surname first letter for Individuals (P)
    if (entityChar === 'P' && fullName) {
      const parts = fullName.trim().split(/\s+/);
      const surname = parts[parts.length - 1].toUpperCase();
      const expectedLetter = surname[0];
      if (pan[4] !== expectedLetter) {
        return {
          valid: false,
          reason: `5th character '${pan[4]}' does not match holder's surname initial '${expectedLetter}' (${surname})`
        };
      }
    }
    return { valid: true, reason: "PAN format, entity code, and surname checksum valid" };
  },

  validateDOB(dobStr) {
    if (!dobStr) return { valid: true, reason: "DOB not provided" };
    const clean = dobStr.replace(/[\/\.]/g, '-');
    let dateObj;
    if (/^\d{2}-\d{2}-\d{4}$/.test(clean)) {
      const [d, m, y] = clean.split('-');
      dateObj = new Date(`${y}-${m}-${d}`);
    } else {
      dateObj = new Date(clean);
    }
    if (isNaN(dateObj.getTime())) return { valid: false, reason: "Invalid calendar date format" };
    const ageYears = (Date.now() - dateObj.getTime()) / (365.25 * 24 * 3600 * 1000);
    if (ageYears < 16 || ageYears > 120) {
      return { valid: false, reason: `Implausible citizen age (${Math.round(ageYears)} years old)` };
    }
    return { valid: true, reason: "DOB and age plausible" };
  },

  validateMarksheetMath(subjects, totalMarks, maxMarks, percentage) {
    if (!subjects || !subjects.length) {
      return { valid: false, reason: "No subject marks provided" };
    }
    const computedSum = subjects.reduce((sum, s) => sum + Number(s.marks || 0), 0);
    const statedTotal = Number(totalMarks || 0);
    if (computedSum !== statedTotal) {
      return {
        valid: false,
        reason: `Arithmetic mismatch: Sum of subjects (${computedSum}) does not equal stated Total Marks (${statedTotal})`
      };
    }
    const expectedPct = (statedTotal / Number(maxMarks || 500)) * 100;
    if (Math.abs(expectedPct - Number(percentage)) > 0.5) {
      return {
        valid: false,
        reason: `Percentage mismatch: (${statedTotal}/${maxMarks})*100 = ${expectedPct.toFixed(1)}%, but marksheet shows ${percentage}%`
      };
    }
    return { valid: true, reason: "Marksheet arithmetic, subject sums, and percentage verified" };
  }
};

window.RuleValidator = RuleValidator;
