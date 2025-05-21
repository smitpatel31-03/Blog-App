import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { Admin } from "../model/admin.model.js"
import { Blog } from "../model/blog.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import { uploadOnCloudnary } from "../utils/cloudinary.js"
import mongoose from "mongoose"
import { Email } from "../model/email.model.js"

const generateAccessAndRefreshToken = async (AdmnId) => {

    
    try {
        //find admin
        //genrate accesstoken and refreshtoken
        //update database
        //retuen accesstoken and refreshtoken 

        //find admin
        const admin = await Admin.findById(AdmnId)

        
        //genrate accesstoken and refreshtoken
        const accessToken = admin.generateAccessToken()
        const refreshToken = admin.generateRefreshToken()

        admin.refreshToken = refreshToken
        await admin.save({ validateBeforeSave: false })

        
        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something Went Wrong While Genrating Refresh And Access Token")
    }
}

const registerAdmin = asyncHandler(async (req, res) => {
    //import data 
    //validate admin
    //check admin email is available or not
    //check admin enter a proper role or not
    //check if admin role is Owner then he k=have valid key or not
    //add admin to database
    // remove password , refreshtoken and key field from response
    //check Admin is crated or not
    //response Admin

    //import data 
    const { email, password, name } = req.body

    //validate admin
    if ([email, password, name].some((field) => field?.trim === "")) {
        throw new ApiError(400, "All Fields Are Coumplsory Or Required")
    }

    //check admin email is available or not
    const existedUser = await Admin.findOne({ email })

    if (existedUser) {
        throw new ApiError(409, "User")
    }

    

    //add admin to database
    const admin = await Admin.create({
        email,
        password,
        name,
    })

    // remove password , refreshtoken and key field from response
    const createdAdmin = await Admin.findById(admin._id).select(
        "-password -key -refreshToken"
    )

    //check Admin is crated or not
    if (!createdAdmin) {
        throw new ApiError(500, "Something Went Wrong While Registering Admin")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(admin._id)

    const options = {
        httpOnly: true,
        secured: false,
        sameSite: "Lax"
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Lax",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { Admin: createdAdmin, accessToken, refreshToken },
                "Admin Created Successfully"
            )
        );

})

const loginAdmin = asyncHandler(async (req, res) => {
    //get Admin Details
    //validate Admin Details
    //find Admin
    //verify Password
    //genrate refreshtoken and accesstoken
    //send cookies

    //get Admin Details
    const { email, password } = req.body


    //validate Admin Details
    if (!email) {
        throw new ApiError(401, "Please Enter The Details")
    }


    //find Admin
    const admin = await Admin.findOne({ email })

    if (!admin) {
        throw new ApiError(404, "Admin Not Found")
    }

    //verify Password
    const isPasswordValidate = await admin.isPasswordCorrect(password)

    if (!isPasswordValidate) {
        throw new ApiError(401, "Invalid Credentails");
    }

    //genrate refreshtoken and accesstoken
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(admin._id)

    

    const loggedInAdmin = await Admin.findById(admin._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Lax",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { Admin: loggedInAdmin, accessToken, refreshToken },
                "Admin Logged In Successfully"
            )
        );

})

const logoutAdmin = asyncHandler(async (req, res) => {
    //find admin
    //remove refresh token from database
    //remove cookie

    //find admin
    //remove refresh token from database

    await Admin.findByIdAndUpdate(
        req.admin._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secured: true
    }

    //remove cookie
    return res.status(201)
        .cookie("accessToken", options)
        .cookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "Admin Loggedout Successfully"))
})

const getCurruntAdmin = asyncHandler(async (req, res) => {

    console.log("req.admin :",req.admin);
    
    res
        .status(200)
        .json(
            new ApiResponse(
                201,
                req.admin,
                "Currunt Admin"
            )
        )
})

const AdminsRefreshAccessToken = asyncHandler(async (req, res) => {
    //get cookies and check cookie
    //decode the token
    //find user
    //vaidate refresh token
    //set refresh and access token
    //response cookies


    //get cookies and check cookie
    const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized Admin")
    }

    try {
        //decode the token
        const decodeToken = jwt.verify(incomingRefreshToken, process.env.ACCESS_TOKEN_SECRET_ADMIN)

        //find user
        const admin = await Admin.findById(decodeToken)

        if (!admin) {
            throw new ApiError(401, "Invalid Admin's Refresh Token");
        }

        //vaidate refresh token
        if (incomingRefreshToken !== admin?.refreshToken) {
            throw new ApiError(401, "Admin's Refresh Token Is Expired Or Used")
        }

        const options = {
            httpOnly: true,
            secured: true
        }

        //set refresh and access token
        const { accessToken, refreshToken } = generateAccessAndRefreshToken(admin._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    201,
                    { accessToken, refreshToken },
                    "Admin's Access Token Refreshed Ruccessfully"
                )
            )

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Admin's Refresh Token")
    }

})

const changeAdminCurruntPassword = asyncHandler(async (req, res) => {
    //get oldpassword and new password
    //check new password and conform password
    //find user
    //check old password
    //save new password
    //return response


    //get oldpassword and new password
    const { oldPassword, newPassword, conformNewPassword } = req.body

    //check new password and conform password
    if (newPassword !== conformNewPassword) {
        throw new ApiError(401, "Conform Pawword Is Wrong")
    }

    //find admin
    const admin = await Admin.findById(req.admin?._id)

    if (!admin) {
        throw new ApiError(401, "Something Went Wrong While Finding the admin")
    }

    //check old password
    const isPasswordValidate = await admin.isPasswordCorrect(oldPassword)

    if (!isPasswordValidate) {
        throw new ApiError(400, "Invalid Old Password")
    }

    //save new password
    admin.password = newPassword
    await admin.save({ validateBeforeSave: false })

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(admin?._id)
    //return response
    res
        .status(200)
        .json(
            new ApiResponse(
                201, { Admin: accessToken, refreshToken }, "Password Changed Successfully")
        )
})

const addBlog = asyncHandler(async (req, res) => {
    const { name, description } = req.body


    if (!name || !description) {
        throw new ApiError(401, "All Fileds Are Required");
    }

    const imageLocalPath = req.file

    const image = await uploadOnCloudnary(imageLocalPath)

    if (!image) {
        throw new ApiError(401, "Image is requird")
    }

    const blog = await Blog.create({
        name,
        description,
        image
    })

    res
        .status(200)
        .json(
            new ApiResponse(
                201,
                blog,
                "Blog Added Successfully"
            )
        )
})

const updateBlogDetails = asyncHandler(async (req, res) => {
    const { BlogId } = req.params;
    const { name, description, image } = req.body;

    if (!name || !description) {
        throw new ApiError(401, "All fields are required");
    }

    let imageurl = image
    
    if (req.file) {

        imageurl = await uploadOnCloudnary(req.file);

        if (!imageurl) {
            throw new ApiError(401, "Image upload failed");
        }

        
    }

    

    const blog = await Blog.findById(BlogId);

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
        BlogId,
        { name, description, image:imageurl },
        { new: true }
    );

    if (!updatedBlog) {
        throw new ApiError(500, "Something went wrong while updating");
    }

    res.status(200).json(
        new ApiResponse(200, updatedBlog, "Blog updated successfully")
    );
});


const getAllBlogs = asyncHandler(async (_, res) => {
    
    console.log("working");
    

    const AllBlog = await Blog.aggregate([
        {
            $project: {
                name: 1,
                description: 1,
                image: 1
            }
        }
    ])

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                AllBlog,
                "All Blog"
            )
        )

})

const getBlogDetails = asyncHandler(async (req, res) => {
    const { BlogId } = req.params

    
    const BlogDetails = await Blog.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(BlogId)
            }
        },
        {
            $project: {
                name: 1,
                description: 1,
                image: 1
            }
        }
    ])

    res
        .status(200)
        .json(
            new ApiResponse(
                201,
                BlogDetails[0],
                "Blog Details"
            )
        )
})

const getAllAubscriberMail = asyncHandler(async (req, res) => {

    const AllAubscriberMail = await Email.aggregate([
        {
            $project: {
                email: 1,
            }
        }
    ])

    res
        .status(200)
        .json(
            new ApiResponse(
                201,
                AllAubscriberMail[0],
                "Blog Details"
            )
        )
})

const deleteBlog = asyncHandler(async (req,res)=>{
    const {BlogId} = req.params

    const deleteBlog = await Blog.findByIdAndDelete(BlogId)

    res
        .status(200)
        .json(
            new ApiResponse(
                201,
                deleteBlog,
                "Blog Deleted Sucessfully"
            )
        )
})

export{
    generateAccessAndRefreshToken,
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    getCurruntAdmin,
    AdminsRefreshAccessToken,
    changeAdminCurruntPassword,
    addBlog,
    updateBlogDetails,
    getAllBlogs,
    getBlogDetails,
    deleteBlog,
    getAllAubscriberMail
}