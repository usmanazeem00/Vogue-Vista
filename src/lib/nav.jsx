import React, { createContext, useContext } from "react";

export const NavContext = createContext({ navigate: () => {}, path: "/" });

export const useNav = () => useContext(NavContext);

export function normalizePath(p) {
  const clean = (p || "/").split(/[?#]/)[0];
  return clean.length > 1 ? clean.replace(/\/+$/, "") : "/";
}

// A real <a href> so search engines can crawl every internal link, with
// client-side navigation for normal left-clicks (new-tab clicks still work).
export function Link({ to, children, onClick, ...rest }) {
  const { navigate } = useNav();
  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
