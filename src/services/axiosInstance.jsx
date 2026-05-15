import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8800",
});

// Request မထွက်ခင် Token ကို စစ်ပြီး Header ထဲ ထည့်ပေးမယ့် logic
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // သင့် login မှာ သိမ်းထားတဲ့ key နာမည်
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
