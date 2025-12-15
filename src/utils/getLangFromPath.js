// src/utils/getLangFromPath.js
export function getLangFromPath(pathname) {
  const first = pathname.split("/")[1];
  return first === "az" || first === "ru" ? first : null;
}
