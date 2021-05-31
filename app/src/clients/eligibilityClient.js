import ApiClient from "./apiClient";

export class EligibilityClient {
    constructor() {
        this._apiClient = new ApiClient({ baseURL: process.env.GATSBY_API_URL });
    }

    getEligibilityByHonor = () => {
    return this._apiClient.get(`eligibility/users`);
   }
}    

export default EligibilityClient;