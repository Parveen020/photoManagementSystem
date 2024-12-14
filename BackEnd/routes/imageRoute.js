import express from 'express';
import { addImage, listImage, removeImage } from '../controllers/imageController.js';
import multer from 'multer';

const imageRouter = express.Router();

//Image storage engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage});


imageRouter.post("/add",upload.single("image"),addImage);
imageRouter.get("/list",listImage)
imageRouter.post("/remove",removeImage);



export default imageRouter;