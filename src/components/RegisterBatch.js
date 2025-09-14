import { useState } from "react";
import { registerBatch } from "../services/api";
import "../styles/RegisterBatch.css";


export default function RegisterBatch() {
  const [form, setForm] = useState({
    batchId: "",
    drugName: "",
    manufactureDate: "",
    cid: ""
  });
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      manufactureDate: Math.floor(new Date(form.manufactureDate).getTime() / 1000)
    };
    const res = await registerBatch(payload);
    setTxHash(res.txHash);
    setLoading(false);
  };

  return (
    <div className="card">
  <h3>Register New Batch</h3>
  <form onSubmit={handleSubmit}>
    <input name="batchId" placeholder="Batch ID" onChange={handleChange} required />
    <input name="drugName" placeholder="Drug Name" onChange={handleChange} required />
    <input name="manufactureDate" type="date" onChange={handleChange} required />
    <input name="cid" placeholder="IPFS CID" onChange={handleChange} required />
    <button type="submit" disabled={loading}>
      {loading ? "Registering..." : "Register Batch"}
    </button>
  </form>
  {txHash && <p>✅ Registered! Tx Hash: {txHash}</p>}
</div>

  );
}
