import config from "../../../config";
import meiliSearchClient from "../../../config/meili.config";
import { forTaskComplete } from "../../../helpers/ForTaskComplete";
import { IProduct } from "./products.interface";

const INDEX = config.meiliSearch.INDEX;

const getOrCreateIndex = async () => {
    try {
        const index = await meiliSearchClient.getIndex(INDEX);
        console.log("✅ Index exists");
        return index;
    } catch (error) {
        console.log("📝 Index does not exist, creating index...");
        try {
            // Wait for index creation to complete
            const task = await meiliSearchClient.createIndex(INDEX, { primaryKey: "_id" });
            await forTaskComplete(task.taskUid);

            // Now get the newly created index
            const index = await meiliSearchClient.getIndex(INDEX);
            await index.updateSearchableAttributes(["name", "description"]);

            console.log("✅ Index created and configured");
            return index;
        } catch (createError) {
            console.error("❌ Error creating index:", createError);
            throw createError;
        }
    }
}


const addProductToMeili = async (product: IProduct) => {
    const idx = await getOrCreateIndex();
    const task = await idx.addDocuments([product]);
    // Wait for the task to complete
    await forTaskComplete(task.taskUid);
    console.log("Task ID:", task.taskUid);
    return task;

}



// search
const searchProducts = async (query: string, page: number = 1, limit: number = 10) => {
    const idx = await getOrCreateIndex();

    const offSet = (page - 1) * limit;

    const searchResults = await idx.search(query, {
        limit: limit,
        offset: offSet,
        attributesToRetrieve: ["_id"],
    });
    const total = searchResults.estimatedTotalHits ?? 0;

    return {
        meta: {
            total,
            limit,
            page,
            totalPage: Math.ceil(total / limit),
        },
        ids: searchResults.hits.map((h: any) => h._id),
    };
}





export const productSearch = {
    addProductToMeili,
    searchProducts,

};