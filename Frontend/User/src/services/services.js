import conf from '../conf/conf.js';
import axios from 'axios';

export class Service {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: conf.apiurl || "https://blog-app-qazu.onrender.com/api/v1/user",
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
  }

  async addEmail({ email }) {
    try {
      console.log("conf.apiurl:", conf.apiurl);

      const response = await this.axiosInstance.post("/add-email", { email });

      // If request is successful
      if (response?.data?.success) {
        return { success: true, message: response.data.message };
      }

      // If success flag is false
      return { success: false, message: response.data.message || "Unknown error" };

    } catch (error) {
      // Axios error handling
      if (error.response) {
        // Server responded with a status other than 2xx
        return {
          success: false,
          message: error.response.data.message || "Server Error",
          status: error.response.status
        };
      } else if (error.request) {
        // Request made but no response
        return {
          success: false,
          message: "No response from server"
        };
      } else {
        // Something else happened
        return {
          success: false,
          message: error.message
        };
      }
    }
  }
}

const Services = new Service();

export default Services;
