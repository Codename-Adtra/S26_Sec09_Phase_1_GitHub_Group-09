// Profile page — user info, stat dashboard, test history, and account actions. All inline.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useApiClient } from "../api/client";
import { env } from "../config/env";

interface Stats {
    avgWpm: number;
    bestWpm: number;
    totalTests: number;
    avgAccuracy: number;
}

interface TypingTestRow {
    id: string;
    wpm: string | number;
    accuracy: string | number;
    duration: number;
    totalChars: number;
    correctChars: number;
    createdAt: string;
}

interface TestsResponse {
    tests: TypingTestRow[];
    pagination: {
        page: number;
        limit: number;
        totalCount: number;
        totalPages: number;
    };
}

const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
const dateFmt = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
});
const memberDateFmt = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" });

export default function Profile() {
    const { user, setUser, isAuthenticated, isLoading: authLoading, login } = useAuth();
    const api = useApiClient();

    const [stats, setStats] = useState<Stats | null>(null);
    const [tests, setTests] = useState<TypingTestRow[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [editingUsername, setEditingUsername] = useState<boolean>(false);
    const [usernameDraft, setUsernameDraft] = useState<string>("");
    const [usernameError, setUsernameError] = useState<string | null>(null);

    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    const [pwStatus, setPwStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [pwError, setPwError] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            login();
        }
    }, [authLoading, isAuthenticated, login]);

    useEffect(() => {
        if (!isAuthenticated) return;
        let cancelled = false;
        async function load() {
            setIsLoading(true);
            setError(null);
            try {
                const [statsData, testsData] = await Promise.all([
                    api.get<Stats>("/tests/stats"),
                    api.get<TestsResponse>(`/tests?page=${page}&limit=20`)
                ]);
                if (cancelled) return;
                setStats(statsData);
                setTests(testsData.tests);
                setTotalPages(testsData.pagination.totalPages || 1);
            } catch (err) {
                if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load profile");
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }
        load();
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, page]);

    function startEditingUsername() {
        if (!user) return;
        setUsernameDraft(user.username);
        setUsernameError(null);
        setEditingUsername(true);
    }

    async function saveUsername() {
        if (!user) return;
        const value = usernameDraft.trim();
        if (value.length < 3 || value.length > 20 || !USERNAME_REGEX.test(value)) {
            setUsernameError("3-20 chars: letters, numbers, underscores only");
            return;
        }
        try {
            const updated = await api.put<typeof user>("/users/me", { username: value });
            setUser(updated);
            setEditingUsername(false);
            setUsernameError(null);
        } catch (err) {
            setUsernameError(err instanceof Error ? err.message : "Failed to update username");
        }
    }

    async function deleteTest(id: string) {
        try {
            await api.del(`/tests/${id}`);
            setTests(prev => prev.filter(t => t.id !== id));
            setConfirmDeleteId(null);
            // Refresh stats since totals just changed.
            try {
                const statsData = await api.get<Stats>("/tests/stats");
                setStats(statsData);
            } catch { /* non-fatal */ }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete test");
        }
    }

    async function changePassword() {
        if (!user) return;
        setPwStatus("sending");
        setPwError(null);
        try {
            const res = await fetch(`https://${env.AUTH0_DOMAIN}/dbconnections/change_password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    client_id: env.AUTH0_CLIENT_ID,
                    email: user.email,
                    connection: "Username-Password-Authentication"
                })
            });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to send reset email");
            }
            setPwStatus("sent");
        } catch (err) {
            setPwStatus("error");
            setPwError(err instanceof Error ? err.message : "Failed to send reset email");
        }
    }

    if (authLoading || (!isAuthenticated && !authLoading)) {
        return (
            <div className="container">
                <div className="page-center loading">redirecting...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container">
                <div className="page-center loading">loading profile...</div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="profile-header">
                {editingUsername ? (
                    <div className="edit-inline">
                        <input
                            className="edit-input"
                            value={usernameDraft}
                            onChange={e => setUsernameDraft(e.target.value)}
                            autoFocus
                            maxLength={20}
                        />
                        <button className="btn btn-primary" onClick={saveUsername}>save</button>
                        <button className="btn btn-ghost" onClick={() => setEditingUsername(false)}>cancel</button>
                    </div>
                ) : (
                    <div className="edit-inline">
                        <div className="profile-username">{user.username}</div>
                        <button className="nav-link" onClick={startEditingUsername}>edit</button>
                    </div>
                )}
                {usernameError && <div className="error-text">{usernameError}</div>}
                <div className="profile-email">{user.email}</div>
                <div className="profile-date">
                    member since {memberDateFmt.format(new Date(user.createdAt))}
                </div>
            </div>

            <div className="stats-grid">
                {isLoading || !stats ? (
                    <>
                        <StatSkeleton />
                        <StatSkeleton />
                        <StatSkeleton />
                        <StatSkeleton />
                    </>
                ) : (
                    <>
                        <div className="stat-card">
                            <div className="stat-value">{Number(stats.avgWpm).toFixed(1)}</div>
                            <div className="stat-label">avg wpm</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{Number(stats.bestWpm).toFixed(1)}</div>
                            <div className="stat-label">best wpm</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{stats.totalTests}</div>
                            <div className="stat-label">tests taken</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{Number(stats.avgAccuracy).toFixed(1)}%</div>
                            <div className="stat-label">avg accuracy</div>
                        </div>
                    </>
                )}
            </div>

            <div className="section-title">test history</div>
            {error && <div className="error-text">{error}</div>}
            {isLoading ? (
                <div className="loading" style={{ padding: "20px 0" }}>loading...</div>
            ) : tests.length === 0 ? (
                <div className="empty-state">
                    no tests yet — <Link to="/" style={{ color: "var(--accent)", textDecoration: "underline" }}>take a typing test</Link> to see your history
                </div>
            ) : (
                <>
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>date</th>
                                <th>duration</th>
                                <th>wpm</th>
                                <th>accuracy</th>
                                <th>characters</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tests.map(t => (
                                <tr key={t.id}>
                                    <td>{dateFmt.format(new Date(t.createdAt))}</td>
                                    <td>{t.duration}s</td>
                                    <td>{Number(t.wpm).toFixed(1)}</td>
                                    <td>{Number(t.accuracy).toFixed(1)}%</td>
                                    <td>{t.correctChars}/{t.totalChars}</td>
                                    <td>
                                        {confirmDeleteId === t.id ? (
                                            <div className="confirm-delete">
                                                <span>delete?</span>
                                                <button className="nav-link" onClick={() => deleteTest(t.id)}>yes</button>
                                                <button className="nav-link" onClick={() => setConfirmDeleteId(null)}>no</button>
                                            </div>
                                        ) : (
                                            <button className="delete-btn" onClick={() => setConfirmDeleteId(t.id)}>delete</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="btn btn-ghost"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                            >
                                previous
                            </button>
                            <span>page {page} of {totalPages}</span>
                            <button
                                className="btn btn-ghost"
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages}
                            >
                                next
                            </button>
                        </div>
                    )}
                </>
            )}

            <div className="account-section">
                <div className="section-title">account</div>
                <div className="account-row">
                    <div>
                        <div>change password</div>
                        <div className="profile-email">we'll email you a reset link (only for email/password logins)</div>
                    </div>
                    <button className="btn btn-ghost" onClick={changePassword} disabled={pwStatus === "sending"}>
                        {pwStatus === "sending" ? "sending..." : "send reset email"}
                    </button>
                </div>
                {pwStatus === "sent" && <div className="save-status saved">password reset email sent</div>}
                {pwStatus === "error" && <div className="error-text">{pwError}</div>}
            </div>

        </div>
    );
}

function StatSkeleton() {
    return (
        <div className="stat-card">
            <div className="stat-value" style={{ color: "var(--text-pending)" }}>—</div>
            <div className="stat-label">loading</div>
        </div>
    );
}
