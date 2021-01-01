import ApiClient from "./apiClient";

export class DecorationClient {
    constructor() {
        this._apiClient = new ApiClient({ baseURL: process.env.GATSBY_API_URL });
    }

    getByUser = (id) => {
         return this._apiClient.get(`decorations/${id}`);
    }    

    save = (decoration) => {
        const data = { decoration };
        return this._apiClient.put(`decorations`, data);
   }    
}    

export default DecorationClient;