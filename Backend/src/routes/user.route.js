import { Router } from "express";
import {addEmailSubscribe} from "../controllers/user.controller.js"

const router = Router()

router.route("/add-email").post(addEmailSubscribe)

export default router