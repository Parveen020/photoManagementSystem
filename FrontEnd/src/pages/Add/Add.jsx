import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({url}) => {
    const [image, setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
    });

    const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}));
    }

    const onSubmitHandler = async(event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("image",image);
        const response=await axios.post(`${url}/api/image/add`,formData);
        if(response.data.success){
            setData({
                name:"",
                description:"",
            });
            setImage(false);
            toast.success(response.data.message);
        }else{
            toast.error(response.data.message);
        }
    }

    return (
        <div className="Add">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="Add-image-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>
                <div className="Add-product-name flex-col">
                    <p>Image Title</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" />
                </div>
                <div className="Add-product-description flex-col">
                    <p>Image Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write content here" required />
                </div>

                
                <button type="submit" className="Add-button">ADD</button>
            </form>
        </div>
    );
};

export default Add;
