import axios from "axios";

const axiosDefaultConfiguration = {
    timeout: 0,
    headers: { "X-Requested-With": "XMLHttpRequest" }
};

let onSendingRequest = null;

export class ApiClient {
    constructor(defaultConfiguration = {}) {
        this._client = axios.create({
            ...axios.defaults,
            ...axiosDefaultConfiguration,
            ...defaultConfiguration
        });

        if (onSendingRequest !== null) {
            this._client.interceptors.request.use(onSendingRequest);
        }
    }

    static onSendingRequest(callback) {
        onSendingRequest = callback;
    }

    get(url, configuration = {}) {
        return this._client.get(url, configuration)
            .then(this._processApiResponse)
            .catch(this._processApiError);
    }

    head(url, configuration = {}) {
        return this._client.head(url, configuration)
            .then(() => true)
            .catch(() => false);
    }

    post(url, data, configuration) {
        return this._client.post(url, data, configuration)
            .then(this._processApiResponse)
            .catch(this._processApiError);
    }

    put(url, data, configuration = {}) {
        return this._client.put(url, data, configuration)
            .then(this._processApiResponse)
            .catch(this._processApiError);
    }

    delete(url, data, configuration = {}) {
        return this._client.delete(url, data, configuration)
            .then(this._processApiResponse)
            .catch(this._processApiError);
    }

    patch(url, data, configuration = {}) {
        return this._client.patch(url, data, configuration)
            .then(this._processApiResponse)
            .catch(this._processApiError);
    }

    _processApiResponse(response) {
        if (typeof response.data === "undefined") {
            return null;
        }

        const { isSuccess, errorMessage, data } = response.data;

        if (!isSuccess || errorMessage) {
            return Promise.reject({
                response,
                message: errorMessage
            });
        }

        return data;
    }

    _processApiError(error) {
        const { response } = error;

        return Promise.reject({
            error,
            message: response && response.data && response.data.message ? response.data.message : error.message
        });
    }
}

export default ApiClient;