import {API_BASE_URL} from "@/constants/api-base-url";

const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "API request failed");
    }
    return response.json();
};

const makeApiCall = async <T>(
    endpoint: string,
    options: RequestInit
): Promise<T> => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        return handleResponse<T>(response);
    } catch (error) {
        console.error("API call error:", error);
        throw error;
    }
};


export const getRequest = async <T>(
    endpoint: string,
    token?: string
): Promise<T> => {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return makeApiCall<T>(endpoint, {
        method: "GET",
        headers,
    });
};

export const postRequest = async <T, B = unknown>(
    endpoint: string,
    body: B,
    token?: string
): Promise<T> => {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return makeApiCall<T>(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    });
};
