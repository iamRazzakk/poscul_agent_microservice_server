import { Types } from "mongoose";

export interface IProduct {
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: Types.ObjectId;
  subCategories?: Types.ObjectId[];
  tags?: string[];
  brand?: Types.ObjectId;
  images: string[];
  price: number;
  salePrice?: number;
  compareAtPrice?: number;
  sku: string;
  barcode?: string;
  stock: number;
  lowStockThreshold?: number;
  status: "active" | "inactive" | "draft" | "archived";
  condition?: "new" | "refurbished" | "used";
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  rating?: number;
  reviewCount?: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
}
