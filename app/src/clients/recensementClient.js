import ApiClient from "./apiClient";

export class RecensementClient {
    constructor() {
        this._apiClient = new ApiClient({ baseURL: process.env.GATSBY_API_URL });
    }

    getByUnitId = (id) => {
         return this._apiClient.get(`recensement/${id}`);
    }

    getLatestByUnitId = (id) => {
        return this._apiClient.get(`recensement/latest/${id}`);
    }

    addRecensement = (recensement) => {
        return this._apiClient.post("recensement", recensement );
    }

    updateRecensement = (recensement) => {
        return this._apiClient.put(`recensement`, recensement );
    }
}    

export default RecensementClient;