import type { Request, Response } from "express";
import * as queries from "../db/queries.js";
import { getAuth } from "@clerk/express";

// Define the shape of product input for createProduct
interface ProductInput {
  title: string;
  description: string;
  imageUrl: string;
}

// Get all products (public)
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await queries.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to get products" });
  }
};

// Get products by current user (protected)
export const getMyProducts = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId)
      return res.status(401).json({ error: "Unauthorized" });

    const products = await queries.getProductsByUserId(userId);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching user's products:", error);
    res.status(500).json({ error: "Failed to fetch user products" });
  }
};

// Get a single product by ID (public)
export const getProductById = async (
  req: Request<{ id: string }>, // 
  res: Response
) => {
  try {
    const { id } = req.params;
    const product = await queries.getProductById(id);
    if (!product)
      return res.status(404).json({ error: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new product (protected)
export const createProduct = async (
  req: Request<{}, {}, ProductInput>, // typed body
  res: Response
) => {
  try {
    const { userId } = getAuth(req);
    if (!userId)
      return res.status(401).json({ error: "Unauthorized" });

    const { title, description, imageUrl } = req.body;

    if (!title || !description || !imageUrl) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProduct = await queries.createProduct({
      title,
      description,
      image_url: imageUrl, // consistent with DB schema
      userId,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

// Update product (protected - owner only)
export const updateProduct = async (
  req: Request<{ id: string }, {}, ProductInput>, //  & body
  res: Response
) => {
  try {
    const { userId } = getAuth(req);
    if (!userId)
      return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (existingProduct.userId !== userId) {
      return res.status(403).json({ error: "You can only update your own product" });
    }

    const updatedProduct = await queries.updateProduct(id, {
      title,
      description,
      image_url: imageUrl,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

// Delete product (protected - owner only)
export const deleteProduct = async (
  req: Request<{ id: string }>, // 
  res: Response
) => {
  try {
    const { userId } = getAuth(req);
    if (!userId)
      return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;

    const existingProduct = await queries.getProductById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (existingProduct.userId !== userId) {
      return res.status(403).json({ error: "You can only delete your own product" });
    }

    await queries.deleteProduct(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};