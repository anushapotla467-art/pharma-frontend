// const API = "http://localhost:3001/api";
const API = process.env.REACT_APP_API_URL;

const getToken = () => localStorage.getItem("token");


export const registerBatch = async (payload) => {
  const res = await fetch(`${API}/batches/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(payload)
  });
  return res.json();
};

export const transferBatch = async (payload) => {
  const res = await fetch(`${API}/batches/transfer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(payload)
  });
  return res.json();
};

export const updateStatus = async (payload) => {
  const res = await fetch(`${API}/batches/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(payload)
  });
  return res.json();
};

export const getBatch = async (batchId) => {
  const res = await fetch(`${API}/batches/${batchId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.json();
};

export const listBatches = async () => {
  const res = await fetch(`${API}/batches`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.json();
};
