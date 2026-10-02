import Product from '../models/product.model.js'
import mongoose from 'mongoose';




export const getProducts = async(req,res)=>{

    try {
       const products = await Product.find();
        res.status(200).json({success:true,data:products})
    } catch (error) {
        console.log("error in fetching data", error.message)
        res.status(500).json({success:false, message:"server error"})
    }
}


export const createProduct = async(req,res)=>{
    const product = req.body;// user will send this data

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success:false, message:"please Provide all fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success:true, data:newProduct})
    } catch (error) {
        console.error("error in creating product:", error.message);
        res.status(500).json({success:false, message:"Server error"});
    }
}


export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid product Id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid product Id" });
  }

  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("error in deleting data", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};