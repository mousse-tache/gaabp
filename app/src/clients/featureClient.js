import ApiClient from "./apiClient";

export class FeatureClient {
    constructor() {
        this._apiClient = new ApiClient({ baseURL: process.env.GATSBY_API_URL });
    }

    getList = () => {
         return this._apiClient.get(`features`);
    }    

    getActiveFeatures = () => {
        return this._apiClient.get(`activefeatures`);
    }        

    save = (feature) => {
        const data = { feature };
        return this._apiClient.put(`feature`, data);
   }    
}    

export default FeatureClient;