import ApiClient from "./apiClient";

export class UserClient {
    constructor() {
        this._apiClient = new ApiClient({ baseURL: "https://formation-aabp.herokuapp.com/api/" });
    }

    getById = (id) => {
        const params = { id };

        return this._apiClient.get("user", { params });
    }

    getByEmail = (email) => {
        return this._apiClient.get(`/user/email/${email}`);
    }

    getUsers = () => {
        return this._apiClient.get("users");
    }

    addUser = (user) => {
        return this._apiClient.post("user", user );
    }

    updateUser = (user) => {
        return this._apiClient.put(`user/${user.id}`, user );
    }

    deleteUser = (id) => {
        return this._apiClient.delete("user", { id });
    }

}    

export default UserClient;