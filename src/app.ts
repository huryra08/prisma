import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { userRouters } from "./modules/User/user.route";
import { authRoutes } from "./modules/auth/auth.routes";
import { postRoutes } from "./modules/post/post.route";
import { commentRoutes } from "./modules/comment/comment.route";



const app: Application = express();

app.use(cors({
    origin: config.app_url,
    credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {

    res.send("Hello, World!");
});

app.use("/api/users", userRouters);
app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
//app.use("/api/subscription", subscriptionRoutes)
//app.use("/api/premium", premiumRoutes)


export default app;