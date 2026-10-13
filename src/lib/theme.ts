export type Theme = "light" | "dark";

export function resolveTheme(stored: string | null, prefersDark: boolean): Theme {
  if (stored === "light" || stored === "dark") return stored;
  return prefersDark ? "dark" : "light";
}

// Runs in <head> before first paint. Must stay dependency-free ES5.
// Mirrors resolveTheme; keep both in sync.
export const THEME_INIT_SCRIPT = `(function(){var d=document.documentElement;var s=null;try{s=localStorage.getItem('theme')}catch(e){}
var m=function(q){return window.matchMedia&&window.matchMedia(q).matches};
var t=(s==='light'||s==='dark')?s:(m('(prefers-color-scheme: dark)')?'dark':'light');
d.setAttribute('data-theme',t);
if(!m('(prefers-reduced-motion: reduce)')){d.classList.add('motion');
var p=null;try{p=sessionStorage.getItem('loader-played')}catch(e){}
if(location.pathname==='/'&&p!=='1')d.classList.add('loader');}})();`;
