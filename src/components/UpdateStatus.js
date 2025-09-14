import { useState } from "react";
import { updateStatus } from "../services/api";
import "../styles/UpdateStatus.css";

export default function UpdateStatus() {
  const [form, setForm] = useState({ batchId: "", status: "" });
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await updateStatus(form);
    setTxHash(res.txHash);
    setLoading(false);
  };

  return (
    <div className="card">
      <h3>Update Batch Status</h3>
      <form onSubmit={handleSubmit}>
        <input name="batchId" placeholder="Batch ID" onChange={handleChange} required />
        <select name="status" onChange={handleChange} required>
          <option value="">Select Status</option>
          <option value="Delivered">Delivered</option>
          <option value="Dispensed">Dispensed</option>
          <option value="Expired">Expired</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Status"}
        </button>
      </form>
      {txHash && <p>✅ Status Updated! Tx Hash: {txHash}</p>}
    </div>
  );
}
