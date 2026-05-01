// Core typing test hook — handles word fetching, keystroke processing, timer, and scoring.
// Mirrors the logic from Phase_4_Part_1 BeginTypingTest / CompleteTypingTest use cases.

import { useCallback, useEffect, useRef, useState } from "react";
import { publicFetch } from "../api/client";

export type CharStatus = "correct" | "incorrect" | "pending";

const DEFAULT_DURATION = 30;
const WORD_COUNT = 200;

interface WordsResponse {
    words: string[];
}

export function useTypingTest() {
    const [words, setWords] = useState<string[]>([]);
    const [currentText, setCurrentText] = useState<string>("");
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [charStatuses, setCharStatuses] = useState<CharStatus[]>([]);

    const [isActive, setIsActive] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);

    const [duration, setDurationState] = useState<number>(DEFAULT_DURATION);
    const [timeRemaining, setTimeRemaining] = useState<number>(DEFAULT_DURATION);

    const [wpm, setWpm] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(0);
    const [totalChars, setTotalChars] = useState<number>(0);
    const [correctChars, setCorrectChars] = useState<number>(0);
    const [liveWpm, setLiveWpm] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Refs let the timer interval read latest counts without re-creating itself.
    const correctCharsRef = useRef<number>(0);
    const totalCharsRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const fetchWords = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await publicFetch<WordsResponse>(`/words?count=${WORD_COUNT}`);
            const text = data.words.join(" ");
            setWords(data.words);
            setCurrentText(text);
            setCharStatuses(new Array(text.length).fill("pending"));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load words");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWords();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [fetchWords]);

    function clearTimerInterval() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    // Compute final results — formulas mirror CompleteTypingTestUseCase from Phase 4.
    function finishTest(elapsedSecondsOverride?: number) {
        clearTimerInterval();
        setIsActive(false);
        setIsFinished(true);

        const elapsed = elapsedSecondsOverride ?? duration;
        const tc = totalCharsRef.current;
        const cc = correctCharsRef.current;

        if (tc === 0) {
            setWpm(0);
            setAccuracy(0);
            return;
        }

        const minutes = elapsed / 60;
        const finalWpm = minutes > 0 ? Number(((cc / 5) / minutes).toFixed(2)) : 0;
        const finalAccuracy = Number(((cc / tc) * 100).toFixed(2));
        setWpm(finalWpm);
        setAccuracy(finalAccuracy);
    }

    function startTimer() {
        startTimeRef.current = Date.now();
        intervalRef.current = setInterval(() => {
            setTimeRemaining(prev => {
                const next = prev - 1;
                // Update live WPM each tick using elapsed time so far.
                const elapsedSec = Math.max(1, Math.floor((Date.now() - startTimeRef.current) / 1000));
                const minutes = elapsedSec / 60;
                const cc = correctCharsRef.current;
                setLiveWpm(minutes > 0 ? Math.round((cc / 5) / minutes) : 0);

                if (next <= 0) {
                    finishTest(duration);
                    return 0;
                }
                return next;
            });
        }, 1000);
    }

    const handleKeyPress = useCallback((key: string) => {
        if (isFinished || isLoading || currentText.length === 0) return;

        if (key === "Backspace") {
            if (currentIndex === 0) return;
            const idx = currentIndex - 1;
            const prevStatus = charStatuses[idx];
            const newStatuses = [...charStatuses];
            newStatuses[idx] = "pending";
            setCharStatuses(newStatuses);
            setCurrentIndex(idx);

            // Roll back counts to keep accuracy/total in sync.
            totalCharsRef.current = Math.max(0, totalCharsRef.current - 1);
            setTotalChars(totalCharsRef.current);
            if (prevStatus === "correct") {
                correctCharsRef.current = Math.max(0, correctCharsRef.current - 1);
                setCorrectChars(correctCharsRef.current);
            }
            return;
        }

        // Treat any printable single-char key as a typing input.
        if (key.length !== 1) return;

        if (currentIndex >= currentText.length) return;

        // Start the test on the first real keystroke.
        if (!isActive) {
            setIsActive(true);
            startTimer();
        }

        const expected = currentText[currentIndex];
        const isCorrect = key === expected;
        const newStatuses = [...charStatuses];
        newStatuses[currentIndex] = isCorrect ? "correct" : "incorrect";
        setCharStatuses(newStatuses);
        setCurrentIndex(currentIndex + 1);

        totalCharsRef.current += 1;
        setTotalChars(totalCharsRef.current);
        if (isCorrect) {
            correctCharsRef.current += 1;
            setCorrectChars(correctCharsRef.current);
        }

        // If the user reaches the end of the text before time runs out, end early.
        if (currentIndex + 1 >= currentText.length) {
            const elapsed = Math.max(1, Math.floor((Date.now() - startTimeRef.current) / 1000));
            finishTest(elapsed);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFinished, isLoading, currentText, currentIndex, charStatuses, isActive, duration]);

    function resetState(newDuration?: number) {
        clearTimerInterval();
        const dur = newDuration ?? duration;
        setIsActive(false);
        setIsFinished(false);
        setCurrentIndex(0);
        setWpm(0);
        setAccuracy(0);
        setTotalChars(0);
        setCorrectChars(0);
        setLiveWpm(0);
        correctCharsRef.current = 0;
        totalCharsRef.current = 0;
        setTimeRemaining(dur);
    }

    async function restart() {
        resetState();
        await fetchWords();
    }

    function setDuration(seconds: number) {
        if (isActive) return;
        setDurationState(seconds);
        setTimeRemaining(seconds);
    }

    return {
        words,
        currentText,
        currentIndex,
        charStatuses,
        isActive,
        isFinished,
        duration,
        timeRemaining,
        wpm,
        accuracy,
        totalChars,
        correctChars,
        liveWpm,
        isLoading,
        error,
        restart,
        setDuration,
        handleKeyPress
    };
}
