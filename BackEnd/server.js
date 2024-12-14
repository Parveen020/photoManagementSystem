import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import imageRouter from "./routes/ImageRoute.js";

//app config
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

//api endPoints
app.use("/api/Image",imageRouter);
app.use("/image",express.static('uploads'))

app.get("/",(req,res)=>{
    res.send("API Working");
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`);
});


// mongodb+srv://p21566581:parveenPhotoManagement@cluster0.wvsfe.mongodb.net/?