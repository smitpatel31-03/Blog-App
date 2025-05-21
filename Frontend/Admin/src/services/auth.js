import axios from 'axios'
import conf from '../../conf/conf.js'

export class AuthServices{
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: conf.apiurl || "https://blog-app-qazu.onrender.com",
            headers: {
                "Content-Type": "application/json"
            },

            withCredentials: true
        })
    }

    async registerAdmin({email, password, name}){
        try {
            
            const response = await this.axiosInstance.post(`/register`,{email, password, name},{withCredentials:true})
            const {accessToken, refreshToken} = response.data

    
            localStorage.setItem("accessToken",accessToken)
            localStorage.setItem("refreshToken",refreshToken)

            return response.data
            
        } catch (error) {
            throw error.response?.data?.message || "Registration Failed"
        }
    }

    async loginAdmin({email, password}){
        try {

            console.log("conf.apiurl :",conf.apiurl);
            
            const response = await this.axiosInstance.post(`/login`, { email, password },{ withCredentials: true });
              
            const {accessToken, refreshToken} = response.data.data

            localStorage.setItem("accessToken",accessToken)
            localStorage.setItem("refreshToken",refreshToken)

            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Login Failed"
        }
    }

    async getCurruntAdmin(){
        try {
            const headers = await this.getAuthHeaders()
            const response = await this.axiosInstance.get(`/getCurruntAdmin`,{headers})
           
            console.log("getResponse :",response);
            

            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Somethig Went Wrong"
        }
    }

      async logout(){
       try {

        const headers = this.getAuthHeaders()
                
         const response = await this.axiosInstance.post(`/logout`,{headers})
 
         localStorage.removeItem("accessToken",accessToken)
         localStorage.removeItem("refreshToken",refreshToken)
 
         return response.data.data
       } catch (error) {
         throw error.response?.data?.message || "Somethig Went Wrong"
       }
    }

    async changeAdminPassword({oldPassword, newPassword, conformNewPassword}){
        try {
            
            const headers = this.getAuthHeaders()
            const response = await this.axiosInstance.post(`/changeAdminCurruntPassword`,{oldPassword, newPassword, conformNewPassword},{headers})

            
            const {accessToken, refreshToken} = response.data

            localStorage.setItem("accessToken",accessToken)
            localStorage.setItem("refreshToken",refreshToken)

            return response.data.data
        } catch (error) {
            throw error.response?.data?.message || "Something Went Wrong While Changeing Password"
        }
    }

    getAuthHeaders() {
        const token = localStorage.getItem("accessToken");
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    getAuthHeadersImage() {
        const token = localStorage.getItem("accessToken");
        return token ? { Authorization: `Bearer ${token}` } : {};
    }
}

const authServices = new AuthServices()

export default authServices