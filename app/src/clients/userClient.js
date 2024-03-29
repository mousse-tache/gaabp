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

    inializeSession = (token) => {
        return this._apiClient.post("identity", {token});
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

    getPagedUsers = (page, pageSize, query, activeOnly) => {
        return this._apiClient.get(`users/paged?page=${page}&pageSize=${pageSize}&query=${query}&activeOnly=${activeOnly}`);
    }

    getEmailContact = () => {
        return this._apiClient.get(`users/exportcontacts`);
    }

    addUser = (users) => {
        return this._apiClient.post("user", users );
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

    removeFromUnit = (userId, unitId, type) => {
        return this._apiClient.post("user/removefromunit", { userId, unitId, type });
    }

    confirmFormation = (userId, formations) => {
        return this._apiClient.put(`user/formation/${userId}`, formations);
    }

    recommendFormation = (userId, formation) => {
        return this._apiClient.post(`user/formation/${userId}`, formation);
    }
}    

export default UserClient;