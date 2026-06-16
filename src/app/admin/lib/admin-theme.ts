const STORAGE_KEY = "kz-admin-theme";

/** 避免 hydration 前閃爍 — 在 layout 以 inline script 執行 */
export function adminThemeInitScript() {
  return `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="dark")document.documentElement.dataset.adminTheme="dark";else if(t==="light")document.documentElement.dataset.adminTheme="light";}catch(e){}})();`;
}

export const ADMIN_THEME_STORAGE_KEY = STORAGE_KEY;
