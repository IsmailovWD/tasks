import { defineStore } from "pinia";
import axios from "axios";

const API_URL = "https://tasks-xl0l.onrender.com/api"; // NestJS backend manzili

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | any,
    token: localStorage.getItem("token") || "",
  }),

  actions: {
    async login(phone: string, password: string) {
      const res = await axios.post(`${API_URL}/auth/login`, { phone, password });
      this.token = res.data.access_token;
      localStorage.setItem("token", this.token);
      await this.getProfile();
    },

    async getProfile() {
      const res = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      this.user = res.data;
    },

    async register(dto: any) {
      const res = await axios.post(`${API_URL}/auth/register`, dto);
      this.token = res.data.access_token;
      localStorage.setItem("token", this.token);
      // await this.getProfile();
    },
    async updateProfile(dto: any) {
      const res = await axios.put(`${API_URL}/profile`, dto, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      this.user = res.data;
    },

    logout() {
      this.user = null;
      this.token = "";
      localStorage.removeItem("token");
    },
  },
});
