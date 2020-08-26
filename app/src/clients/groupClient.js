import ApiClient from "./apiClient";

export class GroupClient {
    constructor() {
        this._apiClient = new ApiClient({ baseURL: process.env.GATSBY_API_URL });
    }

    getById = (id) => {
         return this._apiClient.get(`group/${id}`);
    }

    getMultipleById = (ids) => {
        return this._apiClient.post("groups/ids", ids );
    }

    getByNumero = (numero) => {
        return this._apiClient.get(`user/numero/${numero}`);
    }

    getGroups = () => {
        return this._apiClient.get("groups");
    }

    addGroup = (group) => {
        return this._apiClient.post("group", group );
    }

    updateGroup = (group) => {
        return this._apiClient.put(`group/${group.id}`, group );
    }

    deleteGroup = (id) => {
        return this._apiClient.delete("group", { id });
    }

}    

export default GroupClient;