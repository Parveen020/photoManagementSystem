import React from 'react';
import './Image.css';
import { useLocation, useNavigate } from "react-router-dom";
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Image = ({ url }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { imageData } = location.state || {};
    console.log(imageData);

    if (!imageData) {
        return <p>No data available</p>;
    }

    const removeImage = async (imageID) => {
        const response = await axios.post(`${url}/api/image/remove`, { id: imageID });
        if (response.data.success) {
            toast.success(response.data.message);
            navigate('/list');
        } else {
            toast.error(response.data.message);
        }
    };

    const handleMouseMove = (e) => {
        const zoomContainer = e.currentTarget;
        const rect = zoomContainer.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        zoomContainer.style.setProperty('--x', `${x}%`);
        zoomContainer.style.setProperty('--y', `${y}%`);
    };

    return (
        <div className="Image-Panel">
            <div className="Image-detail">
                <div className="button">
                    <NavLink to='/list'>
                        <button className='back-button'>
                            <img src={assets.back} alt="Back" />
                        </button>
                    </NavLink>
                </div>
                <div className="page-title">
                    <p>Image Details</p>
                </div>
                <div className="button del-btn">
                    <button onClick={() => removeImage(imageData._id)} className="delete-button">
                        DELETE
                    </button>
                </div>
            </div>
            <div className="Image-table">
                <div className="Image-block">
                    <div className="zoom-container" onMouseMove={handleMouseMove}>
                        <img src={`${url}/image/` + imageData.image} alt="Image Detail" className="zoom-image" />
                    </div>
                </div>
                <div className="Image-info">
                    <div className="Image-title-info">
                        <p style={{ fontWeight: "bold" }}>Title</p>
                        <p style={{ fontSize: "22px" }}>{imageData.name}</p>
                    </div>
                    <div className="Image-description-info">
                        <p style={{ fontWeight: "bold" }}>Description</p>
                        <p style={{ fontSize: "22px" }}>{imageData.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Image;
