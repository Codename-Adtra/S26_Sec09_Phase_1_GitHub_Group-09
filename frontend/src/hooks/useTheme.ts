// Theme management — persists choice to localStorage and sets data-theme on <html>.

import { useEffect, useState } from "react";

export type ThemeId = "glossy" | "midnight" | "catppuccin" | "nord" | "latte";

export interface ThemeMeta {
    id: ThemeId;
    name: string;
    bg: string;
    accent: string;
    danger: string;
}

export const THEMES: ThemeMeta[] = [
    { id: "glossy",     name: "glossy black", bg: "#0d0d0d", accent: "#10b981", danger: "#ef4444" },
    { id: "midnight",   name: "midnight",     bg: "#1a1a2e", accent: "#10b981", danger: "#ef4444" },
    { id: "catppuccin", name: "catppuccin",   bg: "#1e1e2e", accent: "#a6e3a1", danger: "#f38ba8" },
    { id: "nord",       name: "nord",         bg: "#2e3440", accent: "#a3be8c", danger: "#bf616a" },
    { id: "latte",      name: "latte",        bg: "#eff1f5", accent: "#40a02b", danger: "#d20f39" }
];

const STORAGE_KEY = "typeshi-theme";
const DEFAULT_THEME: ThemeId = "glossy";

function readStoredTheme(): ThemeId {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    return THEMES.some(t => t.id === saved) ? (saved as ThemeId) : DEFAULT_THEME;
}

export function useTheme() {
    const [theme, setThemeState] = useState<ThemeId>(readStoredTheme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    return { theme, setTheme: setThemeState };
}
