// API client: publicFetch for unauthenticated calls + useApiClient hook for authenticated ones.

import { useAuth0 } from "@auth0/auth0-react";
import { env } from "../config/env";

async function parseResponse<T>(res: Response): Promise<T> {
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
        const message = data?.error?.message ?? `Request failed (${res.status})`;
        throw new Error(message);
    }

    return data as T;
}

export async function publicFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${env.API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        }
    });
    return parseResponse<T>(res);
}

export function useApiClient() {
    const { getAccessTokenSilently } = useAuth0();

    async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
        const token = await getAccessTokenSilently();
        const res = await fetch(`${env.API_URL}${path}`, {
            method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: body !== undefined ? JSON.stringify(body) : undefined
        });
        // 204 No Content for DELETE — return null cast
        if (res.status === 204) return null as unknown as T;
        return parseResponse<T>(res);
    }

    return {
        get: <T>(path: string) => request<T>("GET", path),
        post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
        put: <T>(path: string, body?: unknown) => request<T>("PUT", path, body),
        del: <T>(path: string) => request<T>("DELETE", path)
    };
}
