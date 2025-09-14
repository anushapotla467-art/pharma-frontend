import { useState } from "react";
import WalletLogin from "./components/WalletLogin";
import RegisterBatch from "./components/RegisterBatch";
import TransferBatch from "./components/TransferBatch";
import UpdateStatus from "./components/UpdateStatus";
import ViewBatch from "./components/ViewBatch";
import WhitelistPharmacy from "./components/WhitelistPharmacy";

function App() {
  const [role, setRole] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setRole(null);
  };

  return (
    <div>
      {!role ? (
        <WalletLogin onLogin={setRole} />
      ) : (
        <div style={{
  maxWidth: "600px",
  margin: "40px auto",
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
}}>
  <h2>Welcome, {role}</h2>
  <button onClick={handleLogout}>Logout</button>
  {role === "Manufacturer" && <RegisterBatch />}
  {role === "Distributor" && <TransferBatch />}
  {role === "Pharmacy" && <UpdateStatus />}
  <ViewBatch />
  <WhitelistPharmacy />
</div>

      )}
    </div>
  );
}


export default App;
