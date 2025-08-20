import axios from "axios";

//  Setup Axios instance
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

//  Add token to requests automatically
API.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

//  Central error handler
API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err?.response?.data || err.message);
    return Promise.reject(err?.response?.data || err);
  }
);

// ===================== AUTH =====================
export const Auth = {
  login: async (data) => API.post("/auth/login", data),
  register: async (data) => API.post("/auth/register", data),
};

// ===================== PROPERTIES =====================
export const Properties = {
  list: async (params) => API.get("/properties", { params }),
  get: async (id) => API.get(`/properties/${id}`),
  createFormData: async (payload, files = []) => {
    const fd = new FormData();
    fd.append("payload", JSON.stringify(payload));

    // Support multiple files
    files.forEach((file) => fd.append("images", file));

    return API.post("/properties", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

// ===================== ADMIN =====================
export const Admin = {
  pending: async () => API.get("/admin/pending"),
  approve: async (id) => API.post(`/admin/approve/${id}`),
  premiumCheckout: async (email) =>
    API.post("/admin/premium/checkout", { email }),
};
