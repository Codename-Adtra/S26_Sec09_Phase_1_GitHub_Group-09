// Reads Vite environment variables and exposes a typed config object.

function required(name: string, value: string | undefined): string {
    if (!value || value.trim() === "") {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
}

export const env = {
    AUTH0_DOMAIN: required("VITE_AUTH0_DOMAIN", import.meta.env.VITE_AUTH0_DOMAIN as string | undefined),
    AUTH0_CLIENT_ID: required("VITE_AUTH0_CLIENT_ID", import.meta.env.VITE_AUTH0_CLIENT_ID as string | undefined),
    AUTH0_AUDIENCE: required("VITE_AUTH0_AUDIENCE", import.meta.env.VITE_AUTH0_AUDIENCE as string | undefined),
    API_URL: (import.meta.env.VITE_API_URL as string | undefined) || "/api"
};
