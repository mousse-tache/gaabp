import ApiClient from "./geoBaseClient";

export class GeoClient {
    constructor() {
        this._apiClient = new ApiClient({ baseURL: "http://api.positionstack.com/v1/" });
    }

    forward = (query) => {
                
        return this._apiClient.get(`forward?access_key=${process.env.GATSBY_GEO_API_KEY}&query=${query}`);
    }
}    

export default GeoClient;