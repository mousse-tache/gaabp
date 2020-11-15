import ApiClient from "./apiClient";

export class NominationClient {
    constructor() {
        this._apiClient = new ApiClient({ baseURL: process.env.GATSBY_API_URL });
    }

    getNominations = (state) => {
         return this._apiClient.get(`demandenomination/${state}`);
    }

    addDemandeNomination = (nomination) => {
        return this._apiClient.post("demandenomination", nomination );
    }

    updateDemandeNomination = (nomination) => {
        return this._apiClient.put(`demandenomination`, nomination );
    }

    getPendingRecommendationForUser = (userId) => {
        return this._apiClient.get(`demandenomination/approval/${userId}`);
    }

    confirmNomination = (nominationId, confirmerId) => {
        return this._apiClient.post(`demandenomination/confirm`, { nominationId, confirmerId });
    }
    
}    

export default NominationClient;