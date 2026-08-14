import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProductsService } from "./products.service";

const productCreate = catchAsync(async (req, res) => {
  const productData = req.body;
  const product = await ProductsService.createProductIntoDB(productData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const products = await ProductsService.getAllProductsFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products retrieved successfully",
    // @ts-ignore
    pagination: products.meta,
    data: products.products,
  });
});


export const ProductsController = {
  productCreate,
  getAllProducts,
};
