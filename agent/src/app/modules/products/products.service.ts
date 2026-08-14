import config from "../../../config";
import { EmailService } from "../../../services/sendEmailToAllUsers";
import QueryBuilder from "../../builder/queryBuilder";
import { productSearch } from "./product.search";
import { IProduct } from "./products.interface";
import { ProductModel } from "./products.model";

const createProductIntoDB = async (productData: IProduct) => {
  const product = await ProductModel.create(productData);

  // meilisearch index
  await productSearch.addProductToMeili(product).catch((error) => {
    console.log("Error adding product to MeiliSearch:", error);
  });

  // bullmq email queue to notify all users about new product

  // await EmailService.sendEmailToAllUsers();
  return product;

};


const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const searchTerm = (query.searchTerm as string) || "";

  if (searchTerm) {
    const { meta, ids } = await productSearch.searchProducts(searchTerm, page, limit);

    const docs = await ProductModel.find({ _id: { $in: ids } }).lean().select("-__v");

    const map = new Map(docs.map((d: any) => [String(d._id), d]));

    const products = ids
      .map((id) => map.get(id.toString()))
      .filter(Boolean) as IProduct[];



    console.log("come from meilisearch");
    return { meta, products: products ? products : [] };
  }
  console.log("come from database");

  const qb = new QueryBuilder(ProductModel.find().select("-__v").lean(), query).filter().sort().paginate().fields();
  const meta = await qb.getPaginationInfo();
  const products = await qb.modelQuery.lean();
  return { meta, products };
};









export const ProductsService = {
  createProductIntoDB,
  getAllProductsFromDB,
};
