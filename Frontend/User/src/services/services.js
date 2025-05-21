import conf from '../conf/conf.js'
import axios from "axios";

export class Service{
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: conf.apiurl || "https://blog-app-qazu.onrender.com/api/v1/user",
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
    }

    async addEmail({ email }){
        try {

            console.log("conf.apiurl:",conf.apiurl);
            
            const data = await this.axiosInstance.post("/add-email",{email})
            
            if(data){
                return true
            }
            else{
                return false
            }
        } catch (error) {
           console.log("Error :",error);
            
        }
    }
}

const Services = new Service()

export default Services