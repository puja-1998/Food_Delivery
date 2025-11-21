import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App";
import { setMyShopData } from "../redux/ownerSlice.js";

function AddItem() {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("veg");

  const categories = [
        "Snacks",
        "Main Course",
        "Desserts",
        "Pizza",
        "Burgers",
        "Sandwiches",
        "South Indian",
        "North Indian",
        "Chinese",
        "Fast Food",
        "others",
      ]
  const dispatch = useDispatch()

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file)); // it willcretae image url
  };

  const  handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("category", category)
        formData.append("foodType", foodType)
        formData.append("price", price)
           if(backendImage){
             formData.append("image", backendImage)  
           }
            const result = await axios.post(`${serverUrl}/api/item/add-item`, formData, {withCredentials:true})
            dispatch(setMyShopData(result.data))
            console.log(result.data)
        } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen">
      <div
        className="absolute top-[20px] left-[20px] z-[10] mb-[10px]"
        onClick={() => navigate("/")}
      >
        <IoIosArrowRoundBack size={35} className="text-[#ff4d2d]" />
      </div>

      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full mb-4">
            <FaUtensils className="text-[#ff4d2d] w-16 h-16" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">
           Add Food
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Shop Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Food Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={handleImage}
            />
            {frontendImage && (
              <div className="mt-4">
                <img
                  src={frontendImage}
                  alt="image"
                  className="w-full h-48 object-cover rounded-lg border "
                />
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="0"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setPrice(Number(e.target.value))}
              value={price}
            />
          </div>
          <div>
            <label
              htmlFor="categ"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Category
            </label>
            <select
              id="categ"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="">Select Category</option>
              {categories.map((categ, index)=>(
                <option value={categ} key={index}>{categ}</option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="food"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Food
            </label>
            <select
              id="food"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setFoodType(e.target.value)}
              value={foodType}
            >
              <option value="veg">Veg</option>
              <option value="non veg">Non-Veg</option>
            </select>
          </div>
         
          <button  className="w-full bg-[#ff4d2d] text-white px-6  py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg  transition-all duration-200 cursor-pointer">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
