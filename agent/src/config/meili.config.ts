import { MeiliSearch } from "meilisearch";
import config from ".";

// console.log("MeiliSearch Config:", config?.meiliSearch);

const meiliSearchClient = new MeiliSearch({
    host: config?.meiliSearch?.host!,
    apiKey: config?.meiliSearch?.apiKey!,
});

export default meiliSearchClient;