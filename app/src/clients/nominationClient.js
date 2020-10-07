import ApiClient from "./apiClient";

export class NominationClient {
    constructor() {
        this._apiClient = new ApiClient({ baseURL: process.env.GATSBY_API_URL });
    }

    getPending = () => {
         return this._apiClient.get(`demandenomination/pending`);
    }

    getComplete = () => {
        return this._apiClient.get(`demandenomination/complete`);
   }

    addDemandeNomination = (nomination) => {
        return this._apiClient.post("demandenomination", nomination );
    }

    updateDemandeNomination = (nomination) => {
        return this._apiClient.put(`demandenomination`, nomination );
    }
}    

export default NominationClient;