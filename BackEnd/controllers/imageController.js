import ImageModel from "../model/imageModel.js";
import fs from "fs";

// add Image
const addImage = async(req,res)=>{
    let image_filename = `${req.file.filename}`;

    const image = new ImageModel({
        name :req.body.name,
        description: req.body.description,
        image:image_filename,
    })
    try {
        await image.save();
        res.json({success:true,message:"Image saved successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Image not saved    "})
    }
}

// all images list
const listImage = async (req,res)=>{
    try {
        const images = await ImageModel.find({});
        res.json({success:true,data:images})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Image not found"})
    }
}

//remove Image
const removeImage = async (req, res) => {
    try {
        const image = await ImageModel.findById(req.body.id);
        fs.unlink(`uploads/${image.image}`,()=>{})

        await ImageModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Image deleted"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Image not deleted"});
    }
}

export {addImage,listImage,removeImage};