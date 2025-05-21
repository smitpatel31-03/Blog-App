import { Router } from "express";
import {registerAdmin,loginAdmin,logoutAdmin,getCurruntAdmin,AdminsRefreshAccessToken,changeAdminCurruntPassword,addBlog,updateBlogDetails,getAllBlogs,getBlogDetails,deleteBlog,getAllAubscriberMail} from "../controllers/admin.controller.js"
import { verifyJWTAdmin } from "../middlewares/auth.admin.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post(registerAdmin)
router.route("/login").post(loginAdmin)
router.route("/logout").post(verifyJWTAdmin, logoutAdmin)
router.route("/refresh-token").post(AdminsRefreshAccessToken)
router.route("/add-blog").post(
    (req, res, next) => {next();},
    verifyJWTAdmin,
    upload.single("image"),
    (req, res, next) => {next();},
    addBlog);
router.route("/delete-blog/:BlogId").delete(verifyJWTAdmin, deleteBlog)
router.route("/changeAdminCurruntPassword").patch(verifyJWTAdmin, changeAdminCurruntPassword)
router.route("/update-blog-details/:BlogId").patch(
    (req, res, next) => {next();},
    verifyJWTAdmin,
    upload.single("image"),
    (req, res, next) => {next();},
    updateBlogDetails)
router.route("/getCurruntAdmin").get(verifyJWTAdmin, getCurruntAdmin)
router.route("/get-all-blog").get(verifyJWTAdmin, getAllBlogs)
router.route("/blog-details/:BlogId").get(verifyJWTAdmin, getBlogDetails)
router.route("/all-subscriber-mail").get(verifyJWTAdmin, getAllAubscriberMail)

export default router