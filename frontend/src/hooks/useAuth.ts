// Wraps Auth0 React SDK and syncs the authenticated user with our backend (/api/users/me).

import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";
import { useApiClient } from "../api/client";

export interface AppUser {
    id: string;
    email: string;
    username: string;
    createdAt: string;
}

export function useAuth() {
    const {
        isAuthenticated,
        isLoading,
        loginWithRedirect,
        logout: auth0Logout,
        user: auth0User
    } = useAuth0();

    const api = useApiClient();
    const [user, setUser] = useState<AppUser | null>(null);
    const [isProfileLoaded, setIsProfileLoaded] = useState<boolean>(false);

    useEffect(() => {
        let cancelled = false;
        async function syncUser() {
            if (!isAuthenticated) {
                setUser(null);
                setIsProfileLoaded(false);
                return;
            }
            try {
                const data = await api.get<AppUser>("/users/me");
                if (!cancelled) {
                    setUser(data);
                    setIsProfileLoaded(true);
                }
            } catch (err) {
                if (!cancelled) {
                    console.error("Failed to load user profile:", err);
                    setIsProfileLoaded(true);
                }
            }
        }
        syncUser();
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const login = useCallback(() => {
        loginWithRedirect();
    }, [loginWithRedirect]);

    const register = useCallback(() => {
        loginWithRedirect({ authorizationParams: { screen_hint: "signup" } });
    }, [loginWithRedirect]);

    const logout = useCallback(() => {
        setUser(null);
        setIsProfileLoaded(false);
        auth0Logout({ logoutParams: { returnTo: window.location.origin } });
    }, [auth0Logout]);

    return {
        user,
        setUser,
        isAuthenticated,
        isLoading,
        isProfileLoaded,
        auth0User,
        login,
        register,
        logout
    };
}
