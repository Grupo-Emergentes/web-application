import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface Headers {
    [key: string]: string;
}

function createAxios(token: string | null = null): AxiosInstance {
    let headers: Headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    
    if (token) {
        headers.Authorization = `bearer ${token}`;
    }
    
    return axios.create({
        baseURL: `/api/`,
        headers,
    });
}

let apiClient: AxiosInstance = createAxios();

function setToken(token: string): void {
    apiClient = createAxios(token);
}

class Requester {
    async get<T = any>(url: string, headers: Headers = {}): Promise<T | null> {
        try {
            const response: AxiosResponse<T> = await apiClient.get(url, { headers });
            return response.data;
        } catch (error) {
            console.error('Error en la solicitud GET:', error);
            return null;
        }
    }

    async post<T = any>(url: string, data: any, headers: Headers = {}): Promise<T | null> {
        try {
            const response: AxiosResponse<T> = await apiClient.post(url, data, { headers });
            return response.data;
        } catch (error) {
            console.error('Error en la solicitud POST:', error);
            return null;
        }
    }

    async put<T = any>(url: string, data: any, headers: Headers = {}): Promise<T | null> {
        try {
            const response: AxiosResponse<T> = await apiClient.put(url, data, { headers });
            return response.data;
        } catch (error) {
            console.error('Error en la solicitud PUT:', error);
            return null;
        }
    }

    async patch<T = any>(url: string, data: any, headers: Headers = {}): Promise<T | null> {
        try {
            const response: AxiosResponse<T> = await apiClient.patch(url, data, { headers });
            return response.data;
        } catch (error: any) {
            console.error('Error en la solicitud PATCH:', error.response ? error.response.data : error.message);
            return null;
        }
    }

    async delete<T = any>(url: string, headers: Headers = {}): Promise<T | null> {
        try {
            const response: AxiosResponse<T> = await apiClient.delete(url, { headers });
            return response.data;
        } catch (error) {
            console.error('Error en la solicitud DELETE:', error);
            return null;
        }
    }
}

const requester = new Requester();

export { requester, setToken };