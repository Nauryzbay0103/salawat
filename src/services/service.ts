import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export class Service {
    protected api: AxiosInstance

    constructor(baseURL?: string, config?: AxiosRequestConfig) {
        this.api = axios.create({
            baseURL: baseURL || import.meta.env.VITE_API_BASE_URL,
            ...config,
        })

        this.api.interceptors.request.use(
            async (config) => {
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )
    }

    protected async get<T>(url: string, defaultValue: T, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.api.get(url, config)
            return response.data ?? defaultValue
        } catch (error) {
            console.error(`GET request to ${url} failed:`, error)
            return defaultValue
        }
    }

    protected async post<D>(url: string, data?: D, config?: AxiosRequestConfig) {
        try {
            return await this.api.post(url, data, config)
        } catch (error) {
            console.error(`POST request to ${url} failed:`, error)
        }
    }

    protected async put<T, D = unknown>(
        url: string,
        data: D,
        defaultValue: T,
        config?: AxiosRequestConfig
    ): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.api.put(url, data, config)
            return response.data ?? defaultValue
        } catch (error) {
            console.error(`PUT request to ${url} failed:`, error)
            return defaultValue
        }
    }

    protected async delete<T>(url: string, defaultValue: T, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.api.delete(url, config)
            return response.data ?? defaultValue
        } catch (error) {
            console.error(`DELETE request to ${url} failed:`, error)
            return defaultValue
        }
    }
}
