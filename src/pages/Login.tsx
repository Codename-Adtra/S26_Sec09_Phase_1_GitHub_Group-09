// Login page — bounce: kick off Auth0 redirect if guest, send to home if already authenticated.

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const { isAuthenticated, isLoading, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) return;
        if (isAuthenticated) {
            navigate("/");
        } else {
            login();
        }
    }, [isAuthenticated, isLoading, login, navigate]);

    return (
        <div className="container">
            <div className="page-center loading">redirecting...</div>
        </div>
    );
}
