import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()


app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [process.env.CORS_ORIGIN_ADMIN, process.env.CORS_ORIGIN_USER];
        console.log("Incoming Origin:", origin);
        console.log("Allowed Origins:", allowedOrigins);

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, origin);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));



app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())



//routes
import adminRouter from "./routes/admin.route.js"
import userRouter from "./routes/user.route.js"

//routes declaration
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/user", userRouter)

export { app }