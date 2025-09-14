import { useState } from "react";
import { getBatch } from "../services/api";
import "../styles/ViewBatch.css";

export default function ViewBatch() {
  const [batchId, setBatchId] = useState("");
  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await getBatch(batchId);
    console.log("Batch response:", data);

    setBatch(data.batch); 
    setLoading(false);
  };

  return (
    <div className="card">
      <h3>View Batch Details</h3>
      <form onSubmit={handleSearch}>
        <input
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          placeholder="Enter Batch ID"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
{batch && (
  <div className="details">
    <p><strong>Drug Name:</strong> {batch.drugName}</p>
    <p><strong>Manufacturer:</strong> {batch.manufacturer}</p>
    <p><strong>Manufacture Date:</strong> {new Date(batch.manufactureDate * 1000).toLocaleDateString()}</p>
    <p><strong>IPFS CID:</strong> {batch.cid}</p> {/* ✅ changed from ipfsCid */}
    <p><strong>Current Holder:</strong> {batch.holder}</p> {/* ✅ changed from currentHolder */}
    <p><strong>Status:</strong> {batch.status}</p>
  </div>
)}


    </div>
  );
}
