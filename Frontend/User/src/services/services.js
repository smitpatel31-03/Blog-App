import conf from '../conf/conf.js'
import axios from "axios";

export class Service{
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: conf.apiurl || "http://localhost:8000/api/v1/user",
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
    }

    async addEmail({ email }){
        try {
            const data = await this.axiosInstance.post("/add-email",{email})
            console.log("data:",data);
            
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