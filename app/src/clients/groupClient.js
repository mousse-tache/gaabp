import ApiClient from "./apiClient";

export class GroupClient {
    constructor() {
        this._apiClient = new ApiClient({ baseURL: "https://formation-aabp.herokuapp.com/api/" });
    }

    getById = (id) => {
         return this._apiClient.get(`group/${id}`);
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