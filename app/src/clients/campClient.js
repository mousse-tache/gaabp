import ApiClient from "./apiClient";

export class CampClient {
    constructor() {
        this._apiClient = new ApiClient({ baseURL: process.env.GATSBY_API_URL });
    }

    save = (camp) => {
        const data = { camp };
        return this._apiClient.post(`camp`, data);
   }    

   getLast = (unitId) => {
    return this._apiClient.get(`camp/last/${unitId}`);
   }

   getList = () => {
    return this._apiClient.get(`camps/list`);
   }
}    

export default CampClient;