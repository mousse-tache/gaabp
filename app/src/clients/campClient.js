import ApiClient from "./apiClient";

export class CampClient {
    constructor() {
        this._apiClient = new ApiClient({ baseURL: process.env.GATSBY_API_URL });
    }

    save = (camp) => {
        const data = { camp };
        return this._apiClient.post(`camp`, data);
   }    
}    

export default CampClient;