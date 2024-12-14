import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://p21566581:parveenPhotoManagement@cluster0.wvsfe.mongodb.net/PhotoManageMent').then(()=>console.log("DB Connected"));
}

