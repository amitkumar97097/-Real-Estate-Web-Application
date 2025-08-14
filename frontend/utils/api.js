import axios from "axios";

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const Auth = {
  login: (data) => API.post("/auth/login", data),
  register: (data) => API.post("/auth/register", data),
};

export const Properties = {
  list: (params) => API.get("/properties", { params }),
  get: (id) => API.get(`/properties/${id}`),
  createFormData: (payload, files) => {
    const fd = new FormData();
    fd.append("payload", JSON.stringify(payload));
    for (const f of files) fd.append("images", f);
    return API.post("/properties", fd, { headers: { "Content-Type": "multipart/form-data" } });
  }
};

export const Admin = {
  pending: () => API.get("/admin/pending"),
  approve: (id) => API.post(`/admin/approve/${id}`),
  premiumCheckout: (email) => API.post("/admin/premium/checkout", { email }),
};

