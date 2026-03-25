import React, { useEffect } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = () => {

    const [image, setImage] = useState(false);


    const [data, setData] = useState({
        name: "",
        description: "",
        category: "Salad",
        price: "",
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({
            ...data,[name]: value
        })
    }

   const onSubmitHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    formData.append("image", image);

    const response = await axios.post("http://localhost:4000/api/food/add", formData )
        if (response.status === 200) {
            console.log(response);
            setData({
                name: "",
                description: "",
                category: "Salad",
                price: "",
            })
            setImage(false);
            toast.success("Product added successfully");
            
        }
        else{
            toast.error("Failed to add product");
        }
   }

  return (
    <div className='add'>
        <form className='flex-col'onSubmit={onSubmitHandler}>
            <div className="add-image-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                {/* code to preview image */}
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>{setImage(e.target.files[0])}} type="file"  id="image" hidden required/>
            </div>
            <div className='add-product-name flex-col'>
                <p>Product name</p>
                <input  onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Product Name' />
            </div>
            <div className="add-product-description flex-col">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description}  name="description"rows="6" id=""></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select name="category" id=""onChange={onChangeHandler} value={data.category} >
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input onChange={onChangeHandler} value={data.price}  type="Number" name='price'placeholder="$" />
                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>
    </div>
  )
}

export default Add