import ApiClient from "./apiClient";

export class UserClient {
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

    addGroup = (user) => {
        return this._apiClient.post("group", user );
    }

    updateGroup = (user) => {
        return this._apiClient.put(`group/${user.id}`, user );
    }

    deleteGroup = (id) => {
        return this._apiClient.delete("group", { id });
    }

}    

export default UserClient;