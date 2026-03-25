import foodModel from "../models/foodModel.js";
import fs from "fs";



//add food item

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const { name, description, price, category } = req.body;
    const food = new foodModel({
        name,
        description,
        price,
        image: image_filename,
        category
    });

    try {
        await food.save();
        res.status(200).json({ message: "Food item added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding food item" });
      
    }




}

// all food list
const listFood = async (req, res) => {


    try {
        const foods = await foodModel.find({});
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ message: "Error fetching food items" });
    }

}
//remove food item
const removeFood = async (req, res) => {
    const foodId = req.body.id;

    try {
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }

        // Delete the image file from the folder
        fs.unlinkSync(`uploads/${food.image}`);

        // Delete the food item from the database
        await foodModel.findByIdAndDelete(foodId);
        res.status(200).json({ message: "Food item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting food item" });
    }
};


export {addFood ,listFood,removeFood};