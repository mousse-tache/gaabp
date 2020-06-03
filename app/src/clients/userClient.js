import ApiClient from "./apiClient";

export class UserClient {
    constructor(appUrl) {
        this._apiClient = new ApiClient({ baseURL: "https://formation-aabp.herokuapp.com/api/" });
        this._webApiClient = new WebApiClient({ baseURL: `${appUrl}` });
    }

    getById = (id) => {
        const params = { id };

        return this._apiClient.get("user", { params });
    }

    getUsers = () => {
        return this._apiClient.get("users");
    }

    addUser = (user) => {
        return this._apiClient.post("user", { user });
    }

    updateUser = (user) => {
        return this._apiClient.put("user", { user });
    }

    deleteUser = (id) => {
        return this._apiClient.delete("user", { id });
    }

}    

export default UserClient;