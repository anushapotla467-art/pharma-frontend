import React, { useState } from "react";

import WalletConnect from "./WalletConnect";// adjust path if needed


const UpdateBatchStatus = () => {
  const [batchId, setBatchId] = useState("");
  const [status, setStatus] = useState("");
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    try {
      const res = await fetch("http://localhost:3001/api/batches/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batchId, status })
      });

      const data = await res.json();

      // Log response for debugging
      console.log("Response from backend:", data);

      // Fallback handling
      const message = data.message || data.error || "Unexpected response";
      const type = data.type || (!res.ok ? "error" : "success");

      setFeedback({ message, type });
    } catch (err) {
      console.error("Network error:", err);
      setFeedback({
        message: "Network error. Please try again.",
        type: "error"
      });
    }
  };

  <h1 style={{ backgroundColor: "yellow", padding: "1rem" }}>
  ✅ UpdateBatchStatus component is mounted!
</h1>


  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h2>Update Batch Status</h2>
      <WalletConnect />
            <h2>Update Batch Status</h2>
            <form onSubmit={handleSubmit}>
            {/* ... */}
            </form>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Batch ID"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          <option value="">Select Status</option>
          <option value="Created">Created</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Expired">Expired</option>
        </select>
        <button type="submit">Update Status</button>
      </form>

      {feedback && (
  <div
    style={{
      marginTop: "1rem",
      padding: "1rem",
      borderRadius: "5px",
      backgroundColor: feedback.type === "error" ? "#ffe0e0" : "#e0ffe0",
      color: feedback.type === "error" ? "#b00020" : "#006400",
      fontWeight: "bold"
    }}
  >
    {feedback.message}
  </div>
)}

    </div>
  );
};

export default UpdateBatchStatus;
