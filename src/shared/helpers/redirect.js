export function redirect(url, delay = 0) {
  if (typeof url !== "string" || !url.trim()) {
    throw new Error("URL must be a non-empty string");
  }

  setTimeout(() => {
    window.location.href = url;
  }, delay);
}
