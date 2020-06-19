import ApiClient from "./apiClient";

export class UserClient {
    constructor() {
        this._apiClient = new ApiClient({ baseURL: "https://formation-aabp.herokuapp.com/api/" });
    }

    getById = (id) => {
         return this._apiClient.get(`unit/${id}`);
    }

    getUnitsByName = (name) => {
        return this._apiClient.get(`user/name/${name}`);
    }

    getGroups = () => {
        return this._apiClient.get("units");
    }

    addGroup = (user) => {
        return this._apiClient.post("unit", user );
    }

    updateGroup = (user) => {
        return this._apiClient.put(`unit/${user.id}`, user );
    }

    deleteGroup = (id) => {
        return this._apiClient.delete("unit", { id });
    }

}    

export default UserClient;