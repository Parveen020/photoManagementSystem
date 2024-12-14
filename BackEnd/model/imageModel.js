import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true}
})

const ImageModel = mongoose.model.Image || mongoose.model("Image",ImageSchema);

export default ImageModel;
