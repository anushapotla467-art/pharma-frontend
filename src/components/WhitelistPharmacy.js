import { useState } from "react";
import { ethers } from "ethers";
import contractABI from "../contracts/abi.json";

// import contractABI from "../abi.json"; // adjust path
const contractAddress = "0x73511669fd4de447fed18bb79bafeac93ab7f31f"; // replace with your deployed address

export default function WhitelistPharmacy() {
  const [address, setAddress] = useState("");
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWhitelist = async () => {
    setLoading(true);
    setError("");
    setTxHash("");

    try {
      // Connect to MetaMask
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Connect to contract
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Call addPharmacy
      const tx = await contract.addPharmacy(address);
      await tx.wait();

      setTxHash(tx.hash);
    } catch (err) {
      setError(err.reason || err.message);
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <h3>Whitelist Pharmacy</h3>
      <input
        type="text"
        placeholder="Pharmacy Wallet Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <button onClick={handleWhitelist} disabled={loading}>
        {loading ? "Whitelisting..." : "Whitelist"}
      </button>
      {txHash && <p>✅ Whitelisted! Tx Hash: {txHash}</p>}
      {error && <p style={{ color: "red" }}>❌ {error}</p>}
    </div>
  );
}
