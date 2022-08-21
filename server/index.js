import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { DbConnection } from "./db.js";
dotenv.config()

import UserRoute from "./routes/UserRoute.js";
import FeedRoute from "./routes/FeedRoute.js";


//mongoDB connection
DbConnection();

const app = express();
const PORT = process.env.PORT || 5001;

//middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/user", UserRoute);
app.use("/feed/", FeedRoute)


app.get("/", (req, res) => {
    res.send("DejaVu API Home")
})

app.listen(PORT, (err) => {
    if (err) console.log("Couldn't connect to server")
    console.log(`server listening at port: ${PORT}`);
})