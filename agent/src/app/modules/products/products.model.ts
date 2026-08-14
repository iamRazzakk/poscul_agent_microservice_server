import { model, Schema } from "mongoose";
import { IProduct } from "./products.interface";

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  subCategories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  tags: [{ type: String }],
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
  images: [{ type: String, required: true }],
  price: { type: Number, required: true },
  salePrice: { type: Number },
  compareAtPrice: { type: Number },
  sku: { type: String, required: true },
  barcode: { type: String },
  stock: { type: Number, required: true },
  lowStockThreshold: { type: Number },
  status: {
    type: String,
    enum: ["active", "inactive", "draft", "archived"],
    required: true,
  },
  condition: { type: String, enum: ["new", "refurbished", "used"] },
  isFeatured: { type: Boolean, default: false },
  isBestseller: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  weight: { type: Number },
  dimensions: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
  },
  metaTitle: { type: String },
  metaDescription: { type: String },
  metaKeywords: [{ type: String }],
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
});

export const ProductModel = model<IProduct>("Product", productSchema);
