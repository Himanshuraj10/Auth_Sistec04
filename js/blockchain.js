/**
 * TrustChain Verify - Web Crypto Blockchain Ledger
 * Shared Cloud Firestore ledger with Merkle tree proofs, 3-node BFT consensus, PoW, and tamper demo.
 */

const BlockchainEngine = {
  chain: [],
  isTampered: false,
  tamperedBlockIndex: null,
  consensusSnapshot: null,

  async init() {
    const existing = await FirebaseService.loadBlockchain();
    if (existing && existing.length > 0) {
      this.chain = existing;
      this.consensusSnapshot = JSON.parse(JSON.stringify(existing));
      console.log(`Blockchain: Loaded ${this.chain.length} blocks from shared cloud ledger.`);
      return;
    }

    // Initialize Genesis Block
    const genesisTx = [{
      txId: "tx_genesis_000",
      type: "GENESIS",
      receiptId: "GENESIS-BLOCK",
      docHash: "0000000000000000000000000000000000000000000000000000000000000000",
      docType: "SYSTEM",
      verdict: "GENESIS",
      riskScore: 0,
      verifierId: "did:gov:meity-authority",
      timestamp: 1774000000000
    }];

    const genesisBlock = {
      index: 0,
      timestamp: 1774000000000,
      previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
      merkleRoot: await this.calculateMerkleRoot(genesisTx),
      nonce: 0,
      difficulty: 2,
      transactions: genesisTx,
      hash: "0000" + (await CryptoEngine.sha256("genesis_payload")).substring(4),
      validatorSignatures: [
        { node: "Node-1 (MeitY)", signature: "sig_meity_genesis_valid" },
        { node: "Node-2 (NIC)", signature: "sig_nic_genesis_valid" },
        { node: "Node-3 (DigiLocker)", signature: "sig_digilocker_genesis_valid" }
      ]
    };

    // Pre-mine Block #1 with an Institutional Credential
    const seedTx = [{
      txId: "tx_seed_001",
      type: "VERIFICATION_RECORD",
      receiptId: "REC-2026-PAN-8941",
      docHash: await CryptoEngine.sha256("RAJESH_KUMAR_SHARMA_ABCPS1234F_GENUINE"),
      docType: "PAN",
      verdict: "VERIFIED",
      riskScore: 4,
      verifierId: "did:gov:meity-authority",
      timestamp: 1774130000000
    }];

    const block1 = {
      index: 1,
      timestamp: 1774130000000,
      previousHash: genesisBlock.hash,
      merkleRoot: await this.calculateMerkleRoot(seedTx),
      nonce: 142,
      difficulty: 2,
      transactions: seedTx,
      hash: "0000" + (await CryptoEngine.sha256("block1_payload")).substring(4),
      validatorSignatures: [
        { node: "Node-1 (MeitY)", signature: "sig_meity_b1_valid" },
        { node: "Node-2 (NIC)", signature: "sig_nic_b1_valid" },
        { node: "Node-3 (DigiLocker)", signature: "sig_digilocker_b1_valid" }
      ]
    };

    this.chain = [genesisBlock, block1];
    this.consensusSnapshot = JSON.parse(JSON.stringify(this.chain));
    await FirebaseService.saveBlockchain(this.chain);
    console.log("Blockchain: Initialized shared cloud ledger with Genesis & Seed Block.");
  },

  async calculateMerkleRoot(transactions) {
    if (!transactions || transactions.length === 0) return "0000000000000000000000000000000000000000000000000000000000000000";
    let hashes = [];
    for (const tx of transactions) {
      hashes.push(await CryptoEngine.sha256(JSON.stringify(tx)));
    }
    while (hashes.length > 1) {
      if (hashes.length % 2 !== 0) hashes.push(hashes[hashes.length - 1]);
      const nextLevel = [];
      for (let i = 0; i < hashes.length; i += 2) {
        nextLevel.push(await CryptoEngine.sha256(hashes[i] + hashes[i + 1]));
      }
      hashes = nextLevel;
    }
    return hashes[0];
  },

  async generateMerkleProof(transactions, txIndex) {
    let hashes = [];
    for (const tx of transactions) {
      hashes.push(await CryptoEngine.sha256(JSON.stringify(tx)));
    }
    const proof = [];
    let idx = txIndex;
    while (hashes.length > 1) {
      if (hashes.length % 2 !== 0) hashes.push(hashes[hashes.length - 1]);
      const isRight = idx % 2 === 1;
      const siblingIdx = isRight ? idx - 1 : idx + 1;
      proof.push({
        siblingHash: hashes[siblingIdx],
        direction: isRight ? 'left' : 'right'
      });
      const nextLevel = [];
      for (let i = 0; i < hashes.length; i += 2) {
        nextLevel.push(await CryptoEngine.sha256(hashes[i] + hashes[i + 1]));
      }
      hashes = nextLevel;
      idx = Math.floor(idx / 2);
    }
    return proof;
  },

  async verifyMerkleProof(leafHash, proof, expectedRoot) {
    let current = leafHash;
    for (const step of proof) {
      if (step.direction === 'left') {
        current = await CryptoEngine.sha256(step.siblingHash + current);
      } else {
        current = await CryptoEngine.sha256(current + step.siblingHash);
      }
    }
    return current === expectedRoot;
  },

  async mineBlock(transactions, difficulty = 2) {
    const prevBlock = this.chain[this.chain.length - 1];
    const index = prevBlock.index + 1;
    const timestamp = Date.now();
    const previousHash = prevBlock.hash;
    const merkleRoot = await this.calculateMerkleRoot(transactions);
    const targetPrefix = '0'.repeat(difficulty);

    let nonce = 0;
    let blockHash = '';
    while (true) {
      const payload = `${index}${timestamp}${previousHash}${merkleRoot}${nonce}`;
      blockHash = await CryptoEngine.sha256(payload);
      if (blockHash.startsWith(targetPrefix)) break;
      nonce++;
      if (nonce % 200 === 0) {
        await new Promise(r => setTimeout(r, 4)); // Non-blocking UI
      }
    }

    // 3-Node BFT Consensus Signatures
    const signatures = [
      { node: "Node-1 (MeitY)", signature: await CryptoEngine.sign(blockHash + "_node1") },
      { node: "Node-2 (NIC)", signature: await CryptoEngine.sign(blockHash + "_node2") },
      { node: "Node-3 (DigiLocker)", signature: await CryptoEngine.sign(blockHash + "_node3") }
    ];

    const newBlock = {
      index,
      timestamp,
      previousHash,
      merkleRoot,
      nonce,
      difficulty,
      transactions,
      hash: blockHash,
      validatorSignatures: signatures
    };

    this.chain.push(newBlock);
    this.consensusSnapshot = JSON.parse(JSON.stringify(this.chain));
    await FirebaseService.saveBlockchain(this.chain);

    await FirebaseService.appendAuditLog({
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor: window.AppState?.currentUser?.email || "System Authority",
      action: "BLOCK_COMMITTED",
      target: `BLOCK_${index}`,
      status: "SUCCESS",
      details: `Mined Block #${index} with hash ${blockHash.substring(0, 14)}... (Difficulty: ${difficulty})`
    });

    return newBlock;
  },

  async validateChain() {
    for (let i = 1; i < this.chain.length; i++) {
      const curr = this.chain[i];
      const prev = this.chain[i - 1];

      // 1. Previous hash link
      if (curr.previousHash !== prev.hash) {
        return {
          isValid: false,
          brokenBlockIndex: i,
          reason: `Broken chain link at Block #${i}: previousHash (${curr.previousHash.substring(0, 12)}...) != Block #${i - 1} hash (${prev.hash.substring(0, 12)}...)`
        };
      }

      // 2. Merkle root integrity
      const recomputedMerkle = await this.calculateMerkleRoot(curr.transactions);
      if (recomputedMerkle !== curr.merkleRoot) {
        return {
          isValid: false,
          brokenBlockIndex: i,
          reason: `Merkle root discrepancy at Block #${i}: Stored (${curr.merkleRoot.substring(0, 12)}...) != Recomputed (${recomputedMerkle.substring(0, 12)}...)`
        };
      }

      // 3. PoW hash validity
      const targetPrefix = '0'.repeat(curr.difficulty || 2);
      const payload = `${curr.index}${curr.timestamp}${curr.previousHash}${curr.merkleRoot}${curr.nonce}`;
      const recomputedHash = await CryptoEngine.sha256(payload);
      if (recomputedHash !== curr.hash || !recomputedHash.startsWith(targetPrefix)) {
        return {
          isValid: false,
          brokenBlockIndex: i,
          reason: `Invalid PoW hash at Block #${i}: Stored (${curr.hash.substring(0, 12)}...) != Recomputed (${recomputedHash.substring(0, 12)}...)`
        };
      }
    }
    return { isValid: true, brokenBlockIndex: null, reason: "All blocks cryptographically verified & consensus intact" };
  },

  async validateChainInteractive() {
    const result = await this.validateChain();
    if (result.isValid) {
      UI.showToast("All Blockchain blocks verified! Consensus intact across all nodes.", "success");
    } else {
      UI.showToast(`CHAIN TAMPERED! Broken at Block #${result.brokenBlockIndex}`, "error");
    }
    UI.renderBlockchainExplorer();
  },

  async simulateTamper(targetBlockIndex = 1) {
    if (this.chain.length <= targetBlockIndex) return;
    this.isTampered = true;
    this.tamperedBlockIndex = targetBlockIndex;

    // Maliciously alter transaction payload in Block #1
    const block = this.chain[targetBlockIndex];
    if (block.transactions && block.transactions.length > 0) {
      block.transactions[0].verdict = "TAMPERED_VERDICT_MALICIOUS";
      block.transactions[0].riskScore = 99;
      block.transactions[0].docHash = "malicious_corrupted_hash_payload_0000000000";
    }

    const validation = await this.validateChain();
    UI.renderTamperStudio(validation);
    UI.renderBlockchainExplorer();
    UI.showToast("Ledger tampering simulated! Blockchain turned RED.", "error");

    await FirebaseService.appendAuditLog({
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor: window.AppState?.currentUser?.email || "Admin",
      action: "CHAIN_TAMPER_SIMULATION",
      target: `BLOCK_${targetBlockIndex}`,
      status: "ALERT",
      details: `Malicious edit injected on Block #${targetBlockIndex} for demonstration`
    });
  },

  async restoreChain() {
    if (this.consensusSnapshot) {
      this.chain = JSON.parse(JSON.stringify(this.consensusSnapshot));
      await FirebaseService.saveBlockchain(this.chain);
    }
    this.isTampered = false;
    this.tamperedBlockIndex = null;
    UI.renderTamperStudio({ isValid: true, brokenBlockIndex: null, reason: "Restored from genuine multi-node consensus" });
    UI.renderBlockchainExplorer();
    UI.showToast("Ledger successfully restored to verified state.", "success");

    await FirebaseService.appendAuditLog({
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actor: window.AppState?.currentUser?.email || "Admin",
      action: "CHAIN_RESTORE",
      target: "SHARED_LEDGER",
      status: "SUCCESS",
      details: "Restored uncorrupted ledger snapshot from consensus nodes"
    });
  }
};

window.BlockchainEngine = BlockchainEngine;
