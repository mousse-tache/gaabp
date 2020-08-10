import ApiClient from "./geoBaseClient";

export class GeoClient {
    constructor() {
        this._apiClient = new ApiClient({ baseURL: "http://api.positionstack.com/v1/" });
    }

    forward = (query) => {
        var params = {
            "access_key": process.env.GATSBY_GEO_API_KEY,
            query:query
        }
        return this._apiClient.get(`forward`, { params });
    }
}    

export default GeoClient;