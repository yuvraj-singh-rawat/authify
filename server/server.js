import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

import passport from "passport";
import session from "express-session";
import "./config/passport.js"

dotenv.config();

const app = express();
// const port = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(session({ secret: "authify", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: ["http://localhost:5173","https://authify-pink.vercel.app"],
    credentials: true
}));

// API Endpoints
app.get('/', (req, res) => {
    res.send("Api is Working");
})
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// app.listen(port, () => {
//     console.log(`Server started on ${port}`)
// })

export default app;
