export const objectToQuery = (object: Record<string, unknown>) =>
    Object.entries(object)
        .filter(([, value]) => value !== undefined && value !== null && value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(`${value}`)}`)
        .join("&");
