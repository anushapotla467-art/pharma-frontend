// src/components/WalletConnect.jsx
import React, { useState } from "react";
import { ethers } from "ethers";

const WalletConnect = () => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } catch (err) {
        console.error("Wallet connection failed:", err);
      }
    } else {
      alert("MetaMask not found. Please install it.");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      {account ? (
        <div>
          <p>Connected: {account}</p>
          <button onClick={disconnectWallet}>Logout</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Login with Wallet</button>
      )}
    </div>
  );
};

export default WalletConnect;
