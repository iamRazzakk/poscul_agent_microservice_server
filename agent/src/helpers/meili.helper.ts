import meiliSearchClient from "../config/meili.config";

const createIndexMeili = async (indexName: string) => {
    try {
        const index = await meiliSearchClient.getIndex(indexName);
        if (!index) {
            await meiliSearchClient.createIndex(indexName);
        }
    } catch (error) {
        console.log(error);
    }
};


export const meiliHelper = {
    createIndexMeili,
};