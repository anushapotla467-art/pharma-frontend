import { useState } from "react";
import { transferBatch } from "../services/api";
import "../styles/TransferBatch.css";

export default function TransferBatch() {
  const [form, setForm] = useState({ batchId: "", to: "" });
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await transferBatch(form);
    setTxHash(res.txHash);
    setLoading(false);
  };

  return (
    <div className="card">
      <h3>Transfer Batch</h3>
      <form onSubmit={handleSubmit}>
        <input name="batchId" placeholder="Batch ID" onChange={handleChange} required />
        <input name="to" placeholder="Recipient Address" onChange={handleChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Transferring..." : "Transfer"}
        </button>
      </form>
      {txHash && <p>✅ Transferred! Tx Hash: {txHash}</p>}
    </div>
  );
}
