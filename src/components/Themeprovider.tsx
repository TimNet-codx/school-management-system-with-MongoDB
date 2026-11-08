// "use client";

// import Script from "next/script";
// import {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";
// import type { ComponentProps } from "react";

// export type Theme = "light" | "dark" | "system";
// export type FontSize = "sm" | "md" | "lg";
// export type Density = "comfortable" | "compact";

// export type Prefs = {
//   theme: Theme;
//   fontSize: FontSize;
//   density: Density;
// };

// // export const PREFS_KEY = "tn-prefs";



// const DEFAULTS: Prefs = { theme: "system", fontSize: "md", density: "comfortable" };
// const FONT_PX: Record<FontSize, string> = { sm: "14px", md: "16px", lg: "18px" };

// function readPrefs(): Prefs {
//   try {
//     const raw = localStorage.getItem(PREFS_KEY);
//     return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
//   } catch {
//     return DEFAULTS;
//   }
// }

// function isDark(theme: Theme) {
//   return (
//     theme === "dark" ||
//     (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
//   );
// }

// function applyPrefs(p: Prefs) {
//   const root = document.documentElement;
//   const dark = isDark(p.theme);
//   root.classList.toggle("dark", dark);
//   root.style.colorScheme = dark ? "dark" : "light";
//   root.style.fontSize = FONT_PX[p.fontSize];
//   root.dataset.density = p.density;
//   return dark;
// }

// type Ctx = {
//   prefs: Prefs;
//   resolvedTheme: "light" | "dark";
//   setPrefs: (patch: Partial<Prefs>) => void;
//   resetPrefs: () => void;
// };

// const ThemeContext = createContext<Ctx | null>(null);

// // export function ThemeProvider({ children }: { children: React.ReactNode }) {
// //   const [prefs, setPrefsState] = useState<Prefs>(DEFAULTS);
// //   const [resolvedTheme, setResolved] = useState<"light" | "dark">("light");

// //   // Load saved preferences once on the client
// //   useEffect(() => {
// //     const saved = readPrefs();
// //     setPrefsState(saved);
// //     setResolved(applyPrefs(saved) ? "dark" : "light");
// //   }, []);

// //   // Follow the OS while theme === "system"
// //   useEffect(() => {
// //     if (prefs.theme !== "system") return;
// //     const mq = window.matchMedia("(prefers-color-scheme: dark)");
// //     const onChange = () => setResolved(applyPrefs(prefs) ? "dark" : "light");
// //     mq.addEventListener("change", onChange);
// //     return () => mq.removeEventListener("change", onChange);
// //   }, [prefs]);

// //   // Keep several open tabs in sync
// //   useEffect(() => {
// //     const onStorage = (e: StorageEvent) => {
// //       if (e.key !== PREFS_KEY) return;
// //       const next = readPrefs();
// //       setPrefsState(next);
// //       setResolved(applyPrefs(next) ? "dark" : "light");
// //     };
// //     window.addEventListener("storage", onStorage);
// //     return () => window.removeEventListener("storage", onStorage);
// //   }, []);

// //   const persist = useCallback((next: Prefs) => {
// //     setPrefsState(next);
// //     setResolved(applyPrefs(next) ? "dark" : "light");
// //     try {
// //       localStorage.setItem(PREFS_KEY, JSON.stringify(next));
// //     } catch {}
// //   }, []);

// //   const setPrefs = useCallback(
// //     (patch: Partial<Prefs>) => persist({ ...prefs, ...patch }),
// //     [prefs, persist]
// //   );

// //   const resetPrefs = useCallback(() => persist(DEFAULTS), [persist]);

// //   const value = useMemo(
// //     () => ({ prefs, resolvedTheme, setPrefs, resetPrefs }),
// //     [prefs, resolvedTheme, setPrefs, resetPrefs]
// //   );

// //   return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
// // }

// export function ThemeProvider(props: ComponentProps<typeof NextThemesProvider>) {
//   return <NextThemesProvider {...props} />;
// }

// export function useTheme() {
//   const ctx = useContext(ThemeContext);
//   if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
//   return ctx;
// }
// // export { useTheme } from "next-themes";

// /**
//  * Put <ThemeScript /> inside <head> of the root layout.
//  * It runs before first paint so there is no white flash in dark mode.
//  */
// // export function ThemeScript() {
// //   const code = `(function(){try{
// // var p=JSON.parse(localStorage.getItem("${PREFS_KEY}")||"{}");
// // var t=p.theme||"system";
// // var d=t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);
// // var r=document.documentElement;
// // if(d){r.classList.add("dark");r.style.colorScheme="dark";}
// // var f={sm:"14px",md:"16px",lg:"18px"}[p.fontSize||"md"];
// // r.style.fontSize=f;
// // r.dataset.density=p.density||"comfortable";
// // }catch(e){}})();`;
// //   return <script dangerouslySetInnerHTML={{ __html: code }} />;
// // }

// const PREFS_KEY = "tn-prefs";

// const code = `(function(){try{
// var p=JSON.parse(localStorage.getItem("${PREFS_KEY}")||"{}");
// var t=p.theme||"system";
// var d=t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);
// var r=document.documentElement;
// if(d){r.classList.add("dark");r.style.colorScheme="dark";}
// var f={sm:"14px",md:"16px",lg:"18px"}[p.fontSize||"md"];
// r.style.fontSize=f;
// r.dataset.density=p.density||"comfortable";
// }catch(e){}})();`;

// export default function ThemeScript() {
//   return (
//     <Script
//       id="theme-script"
//       strategy="beforeInteractive"
//       dangerouslySetInnerHTML={{ __html: code }}
//     />
//   )
// }


"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Theme = "light" | "dark" | "system";
export type FontSize = "sm" | "md" | "lg";
export type Density = "comfortable" | "compact";

export type Prefs = {
  theme: Theme;
  fontSize: FontSize;
  density: Density;
};

export const PREFS_KEY = "tn-prefs";

const DEFAULTS: Prefs = { theme: "system", fontSize: "md", density: "comfortable" };
const FONT_PX: Record<FontSize, string> = { sm: "14px", md: "16px", lg: "18px" };

function readPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

function isDark(theme: Theme) {
  return (
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
}

function applyPrefs(p: Prefs) {
  const root = document.documentElement;
  const dark = isDark(p.theme);
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
  root.style.fontSize = FONT_PX[p.fontSize];
  root.dataset.density = p.density;
  return dark;
}

type Ctx = {
  prefs: Prefs;
  resolvedTheme: "light" | "dark";
  setPrefs: (patch: Partial<Prefs>) => void;
  resetPrefs: () => void;
};

const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [prefs, setPrefsState] = useState<Prefs>(DEFAULTS);
  const [resolvedTheme, setResolved] = useState<"light" | "dark">("light");

  // Load saved preferences once on the client
  useEffect(() => {
    const saved = readPrefs();
    setPrefsState(saved);
    setResolved(applyPrefs(saved) ? "dark" : "light");
  }, []);

  // Follow the OS while theme === "system"
  useEffect(() => {
    if (prefs.theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setResolved(applyPrefs(prefs) ? "dark" : "light");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [prefs]);

  // Keep several open tabs in sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== PREFS_KEY) return;
      const next = readPrefs();
      setPrefsState(next);
      setResolved(applyPrefs(next) ? "dark" : "light");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next: Prefs) => {
    setPrefsState(next);
    setResolved(applyPrefs(next) ? "dark" : "light");
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const setPrefs = useCallback(
    (patch: Partial<Prefs>) => persist({ ...prefs, ...patch }),
    [prefs, persist]
  );

  const resetPrefs = useCallback(() => persist(DEFAULTS), [persist]);

  const value = useMemo(
    () => ({ prefs, resolvedTheme, setPrefs, resetPrefs }),
    [prefs, resolvedTheme, setPrefs, resetPrefs]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

/**
 * Put <ThemeScript /> inside <head> of the root layout.
 * It runs before first paint so there is no white flash in dark mode.
 */
export function ThemeScript() {
  const code = `(function(){try{
var p=JSON.parse(localStorage.getItem("${PREFS_KEY}")||"{}");
var t=p.theme||"system";
var d=t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);
var r=document.documentElement;
if(d){r.classList.add("dark");r.style.colorScheme="dark";}
var f={sm:"14px",md:"16px",lg:"18px"}[p.fontSize||"md"];
r.style.fontSize=f;
r.dataset.density=p.density||"comfortable";
}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}