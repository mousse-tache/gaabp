import ApiClient from "./apiClient";

export class ReportingClient {
    constructor() {
        this._apiClient = new ApiClient({ baseURL: process.env.GATSBY_API_URL });
    }

    getGlobalReport = () => {
         return this._apiClient.get(`reports/global`);
    }    
}    

export default ReportingClient;