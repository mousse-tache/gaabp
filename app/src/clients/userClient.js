import ApiClient from "./apiClient";

export class UserClient {
    constructor() {
        this._apiClient = new ApiClient({ baseURL: process.env.GATSBY_API_URL });
    }

    getById = (id) => {
        return this._apiClient.get(`/user/${id}`);
    }

    getByIds = (ids) => {
        return this._apiClient.post(`/users/ids`, ids);
    }

    getByUnitId = (id) => {
        return this._apiClient.get(`/users/unit/${id}`);
    }

    getByGroupId = (id) => {
        return this._apiClient.get(`/users/group/${id}`);
    }

    getByEmail = (email) => {
        return this._apiClient.get(`/user/email/${email}`);
    }

    inializeSession = (token) => {
        return this._apiClient.post("identity", {token});
    }

    getUsers = () => {
        return this._apiClient.get("users");
    }

    searchUsersWithPendingFormations = () => {
        return this._apiClient.get("users/pendingFormations");
    }

    searchUsers = (query) => {
        return this._apiClient.post("users/search", {query});
    }

    searchUsersWithFormations = (query) => {
        return this._apiClient.post("users/formations/search", {query});
    }

    getBasicUsers = () => {
        return this._apiClient.get("users/basic");
    }

    getPagedUsers = (page, pageSize, query) => {
        return this._apiClient.get(`users/paged?page=${page}&pageSize=${pageSize}&query=${query}`);
    }

    getEmailContact = () => {
        return this._apiClient.get(`users/exportcontacts`);
    }

    addUsers = (users) => {
        return this._apiClient.post("users", users );
    }

    completeSignup = (users) => {
        return this._apiClient.post("completeSignup", users);
    }

    updateUser = (user) => {
        return this._apiClient.put(`user/${user.id}`, user );
    }

    fuseUsers = (memberToFuse, targetMember) => {
        return this._apiClient.post("user/fusion", { memberToFuse, targetMember });
    }



}    

export default UserClient;