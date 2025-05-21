import conf from '../../conf/conf.js'
import authServices from "./auth.js";
import axios from "axios";

export class Services{
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: conf.apiurl || "http://localhost:10000/api/v1/admin",
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
    }

    async addBlog({name, description,image}){
        try {            
            const headers = {
                ...authServices.getAuthHeadersImage(),
                "Content-Type": "multipart/form-data",
            };
            image = image[0]            

            
            const response = await this.axiosInstance.post(`/add-blog`,{name, description,image}, {headers})

            
            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Something Went Wrong While Adding Catagory"
        }
    }

    async updateBlog(formData, id) {
  try {
    const headers = {
      ...authServices.getAuthHeadersImage(),
      "Content-Type": "multipart/form-data",
    };

    console.log("id:", id); // This will now work ✅

    const response = await this.axiosInstance.patch(`/update-blog-details/${id}`, formData, { headers });

    console.log("response:", response);
    return response.data.data;
  } catch (error) {
    throw error.response?.data?.message || "Something Went Wrong While Updating Blog";
  }
}

    async getAllBlogs(){
        try {
            const headers = authServices.getAuthHeaders()
            console.log("response");
            const response = await this.axiosInstance.get(`/get-all-blog`,{headers})
            
            return response.data
        } catch (error) {
            throw error.response?.data?.message || "Something Went Wrong While Get Blog Details"
        }
    }

    async getBlogsDetails(BlogId){
        try {
             const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`/blog-details/${BlogId}`,{headers})
            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Something Went Wrong While Adding Catagory"
        }
    }

    async DeleteBlog(BlogId){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.delete(`/delete-blog/${BlogId}`,{headers})
            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Something Went Wrong While Adding Catagory"
        }
    }

    async getAllSubmail(){
        try {
            const headers = authServices.getAuthHeaders()
            const response = await this.axiosInstance.get(`/all-subscriber-mail`,{headers})
            

            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Something Went Wrong While Get Blog Details"
        }
    }
}

const Service = new Services()

export default Service