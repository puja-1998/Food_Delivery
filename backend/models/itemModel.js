import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
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
      ],
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    foodType:{
        type:String,
        required:true,
        enum:["veg",
            "non veg"]
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema)
export default Item
