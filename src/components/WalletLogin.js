import { useState } from "react";
import { ethers } from "ethers";

export default function WalletLogin({ onLogin }) {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const message = `Login request for ${address}`;
    const signature = await signer.signMessage(message);

    const res = await fetch("http://localhost:3001/api/auth/wallet-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, signature })
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);
    console.log("Logged in as:", data.role);
    onLogin(data.role);
    setLoading(false);
  };

  return (
  <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
    <button onClick={handleLogin} disabled={loading}>
      {loading ? "Connecting..." : "Login with Wallet"}
    </button>
  </div>
);

}
