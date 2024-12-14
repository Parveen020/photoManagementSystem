import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import {toast} from 'react-toastify'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const List = ({url}) => {
  const [list,setList] = useState([]);

  const fetchList = async() =>{
    const response = await axios.get(`${url}/api/image/list`);
    console.log(response.data);
    if(response.data.success) {
      setList(response.data.data)
    }else{
      toast.error("Error")
    }
  }

  const removeImage = async (imageId)=>{
      const response = await axios.post(`${url}/api/image/remove`,{id:imageId});
      await fetchList();
      if(response.data.success){
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
  }

  useEffect(()=>{
    fetchList();
  },[]);
  return (
    <div className='list add flex-col'>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Title</b>
          <b>Description</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            
              <div key={index} className="list-table-format">
                <NavLink to='/image' className="Image-Page" state={{ imageData: item }}>
                  <img src={`${url}/image/`+item.image} alt=""/>
                </NavLink>
                <p>{item.name}</p>
                <p>{item.description}</p>
                <p onClick={()=>removeImage(item._id)} style={{ fontWeight: "bold", color:"red" }} className="cursor">X</p>
              </div>
          )
        })}
      </div>
      
        
      
    </div>
  )
}

export default List
