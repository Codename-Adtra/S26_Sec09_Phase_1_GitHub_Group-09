// App shell: Auth0 provider, router, navbar, route definitions, and footer.

import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { env } from "./config/env";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import About from "./pages/About";

export default function App() {
    return (
        <Auth0Provider
            domain={env.AUTH0_DOMAIN}
            clientId={env.AUTH0_CLIENT_ID}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: env.AUTH0_AUDIENCE
            }}
            cacheLocation="localstorage"
        >
            <BrowserRouter>
                <Shell />
            </BrowserRouter>
        </Auth0Provider>
    );
}

function Shell() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, user, login, register, logout } = useAuth();

    // Bumping this key remounts <Home /> so a logo click while on / restarts the test.
    const [restartKey, setRestartKey] = useState<number>(0);

    function handleLogoClick() {
        if (location.pathname === "/") {
            setRestartKey(k => k + 1);
        } else {
            navigate("/");
        }
    }

    return (
        <div className="app">
            <nav className="nav">
                <button className="nav-logo" onClick={handleLogoClick}>
                    type<span>シ</span>
                </button>
                <div className="nav-links">
                    <button className="nav-link" onClick={() => navigate("/about")}>about</button>
                    {isAuthenticated ? (
                        <>
                            <button className="nav-link" onClick={() => navigate("/profile")}>
                                {user?.username ?? "profile"}
                            </button>
                            <button className="btn btn-danger" onClick={logout}>logout</button>
                        </>
                    ) : (
                        <>
                            <button className="nav-link" onClick={register}>register</button>
                            <button className="btn btn-primary" onClick={login}>login</button>
                        </>
                    )}
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<Home key={restartKey} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
            </Routes>

            <footer className="footer">TypeShi | CS 3354.009 Group 09</footer>
        </div>
    );
}
