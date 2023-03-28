export function arrayDeepCopy(record) {
    if (Array.isArray(record)) {
        return JSON.parse(JSON.stringify(record));
    }
}
