import axios from "axios";
import { Banner } from "./types";

const API_URL = "http://localhost:8000";

// Add request/response logging for debugging
axios.interceptors.request.use((request) => {
  console.log("Starting Request", request);
  return request;
});

axios.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export const api = {
  // Banner services
  getBanners: async (): Promise<Banner[]> => {
    try {
      const response = await axios.get(`${API_URL}/api/banner/getbanner`);
      return response.data;
    } catch (error) {
      console.error("Error fetching banners:", error);
      return [];
    }
  },
  
  uploadBanner: async (formData: FormData): Promise<Banner> => {
    try {
      console.log(`${API_URL}/api/banner/uploadbanner`+formData);
      
      const response = await axios.post(
        `${API_URL}/api/banner/uploadbanner`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.banner;
    } catch (error) {
      console.error("Error uploading banner:", error);
      throw error;
    }
  },

  deleteBanner: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/api/banner/deletebanner/${id}`);
    } catch (error) {
      console.error("Error deleting banner:", error);
      throw error;
    }
  },

  updateBanner: async (id: string, data: Partial<Banner>): Promise<Banner> => {
    try {
      const response = await axios.put(
        `${API_URL}/api/banner/updatebanner/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating banner:", error);
      throw error;
    }
  },

  // Blog services
  getBlog: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/blog/getblogs`);
      return response.data;
    } catch (error) {
      console.error("Error fetching blog:", error);
      return null;
    }
  },

  createBlog: async (formData: FormData) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/blog/createblog`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  },

  updateBlog: async (formData: FormData) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/blog`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating blog:", error);
      throw error;
    }
  },

  deleteBlog: async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/api/blog/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting blog:", error);
      throw error;
    }
  },
};

