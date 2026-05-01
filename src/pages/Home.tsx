// Home page — the main typing test. Everything (timer, typing area, results) is inlined here.

import { useEffect, useRef, useState } from "react";
import { useTypingTest } from "../hooks/useTypingTest";
import { useAuth } from "../hooks/useAuth";
import { useApiClient } from "../api/client";

const TIMER_OPTIONS = [15, 30, 60, 120];

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function Home() {
    const test = useTypingTest();
    const { isAuthenticated, login } = useAuth();
    const api = useApiClient();

    const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
    const [saveError, setSaveError] = useState<string | null>(null);

    const innerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);

    // Scroll typing area as the cursor advances past the visible 3-line window.
    useEffect(() => {
        if (!innerRef.current || !cursorRef.current) return;
        const cursorTop = cursorRef.current.offsetTop;
        const lineHeight = 40; // 20px font * line-height 2
        const visibleLines = 3;
        const visibleHeight = lineHeight * visibleLines;
        // Keep the cursor on the second line whenever it would otherwise be off-screen.
        if (cursorTop >= visibleHeight - lineHeight) {
            const linesToScroll = Math.floor((cursorTop - lineHeight) / lineHeight);
            innerRef.current.style.transform = `translateY(-${linesToScroll * lineHeight}px)`;
        } else {
            innerRef.current.style.transform = "translateY(0)";
        }
    }, [test.currentIndex]);

    // Auto-save the result for authenticated users when a test finishes.
    useEffect(() => {
        if (!test.isFinished) {
            setSaveStatus("idle");
            setSaveError(null);
            return;
        }
        if (!isAuthenticated) {
            setSaveStatus("idle");
            return;
        }

        let cancelled = false;
        async function save() {
            setSaveStatus("saving");
            try {
                await api.post("/tests", {
                    wpm: test.wpm > 0 ? test.wpm : 0.01,
                    accuracy: test.accuracy,
                    duration: test.duration,
                    totalChars: test.totalChars,
                    correctChars: test.correctChars
                });
                if (!cancelled) setSaveStatus("saved");
            } catch (err) {
                if (!cancelled) {
                    setSaveStatus("error");
                    setSaveError(err instanceof Error ? err.message : "Failed to save");
                }
            }
        }
        // Skip saving zero-char tests since the backend rejects wpm <= 0.
        if (test.totalChars > 0) {
            save();
        } else {
            setSaveStatus("idle");
        }
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [test.isFinished, isAuthenticated]);

    // Global keyboard handling — drives the typing test from anywhere on the page.
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            const target = e.target as HTMLElement | null;
            if (target) {
                const tag = target.tagName;
                if (tag === "INPUT" || tag === "TEXTAREA") return;
            }

            if (e.ctrlKey || e.metaKey || e.altKey) return;

            if (e.key === "Tab") {
                e.preventDefault();
                test.restart();
                return;
            }

            if (test.isFinished) return;

            if (e.key === "Backspace") {
                e.preventDefault();
                test.handleKeyPress("Backspace");
                return;
            }

            if (e.key === " ") {
                e.preventDefault();
                test.handleKeyPress(" ");
                return;
            }

            if (e.key.length === 1) {
                test.handleKeyPress(e.key);
            }
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [test.isFinished, test.handleKeyPress]);

    function handleTimerClick(seconds: number) {
        if (test.isActive) {
            test.setDuration(seconds);
            test.restart();
            return;
        }
        if (seconds === test.duration) {
            test.restart();
        } else {
            test.setDuration(seconds);
        }
    }

    const timerClass =
        test.timeRemaining <= 5 && test.isActive
            ? "timer-display warning"
            : test.isActive
            ? "timer-display running"
            : "timer-display";

    return (
        <div className="container">
            {/* Timer pills */}
            <div className="timer-options">
                {TIMER_OPTIONS.map(opt => (
                    <button
                        key={opt}
                        className={`timer-pill ${test.duration === opt ? "active" : ""}`}
                        onClick={() => handleTimerClick(opt)}
                    >
                        {opt}
                    </button>
                ))}
            </div>

            {!test.isFinished && (
                <>
                    <div className={timerClass}>{test.timeRemaining}</div>
                    {test.isActive && <div className="live-wpm">{test.liveWpm} wpm</div>}

                    {test.isLoading && <div className="loading" style={{ textAlign: "center" }}>loading words...</div>}
                    {test.error && <div className="error-text" style={{ textAlign: "center" }}>{test.error}</div>}

                    {!test.isLoading && !test.error && (
                        <div className="typing-area">
                            <div className="typing-area-inner" ref={innerRef}>
                                {test.currentText.split("").map((ch, i) => {
                                    const status = test.charStatuses[i] ?? "pending";
                                    const isCurrent = i === test.currentIndex;
                                    const cls = [
                                        "char",
                                        status === "correct" && "char-correct",
                                        status === "incorrect" && "char-incorrect",
                                        status === "pending" && "char-pending",
                                        isCurrent && "char-current",
                                        isCurrent && !test.isActive && "blink"
                                    ]
                                        .filter(Boolean)
                                        .join(" ");
                                    return (
                                        <span
                                            key={i}
                                            className={cls}
                                            ref={isCurrent ? cursorRef : null}
                                        >
                                            {ch}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="hint">
                        {test.isActive ? "press tab to restart" : "start typing to begin"}
                    </div>
                </>
            )}

            {test.isFinished && (
                <div className="results">
                    <div className="results-label">wpm</div>
                    <div className="results-wpm">{test.wpm}</div>
                    <div className="results-label" style={{ marginTop: 24 }}>accuracy</div>
                    <div className="results-accuracy">{test.accuracy}%</div>
                    <div className="results-details">
                        characters: {test.correctChars}/{test.totalChars} &nbsp;&nbsp; time: {test.duration}s
                    </div>

                    {isAuthenticated && saveStatus === "saving" && (
                        <div className="save-status">saving...</div>
                    )}
                    {isAuthenticated && saveStatus === "saved" && (
                        <div className="save-status saved">result saved</div>
                    )}
                    {isAuthenticated && saveStatus === "error" && (
                        <div className="save-status error">failed to save{saveError ? `: ${saveError}` : ""}</div>
                    )}
                    {!isAuthenticated && (
                        <div className="save-status guest">
                            <button className="nav-link" onClick={login} style={{ textDecoration: "underline" }}>
                                sign in
                            </button>{" "}
                            to save your results
                        </div>
                    )}

                    <div className="results-actions">
                        <button className="btn btn-primary" onClick={() => test.restart()}>
                            restart
                        </button>
                    </div>
                    <div className="hint">or press tab to restart</div>
                </div>
            )}
        </div>
    );
}
