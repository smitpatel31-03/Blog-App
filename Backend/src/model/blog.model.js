import {mongoose,Schema} from "mongoose";

const blogSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

export const Blog = new mongoose.model("Blog",blogSchema)