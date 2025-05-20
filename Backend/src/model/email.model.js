import mongoose,{ Schema }  from "mongoose";

const emailSchema = new Schema({
    email:{
        type:String
    }
})

export const Email = new mongoose.model("Email",emailSchema)