export interface Range<T> {
    start: T;
    end: T;
}

export function isRange<T>(n: T | Range<T>): n is Range<T> {
    return (n as Range<T>).start !== undefined && (n as Range<T>).end !== undefined;
}

export function convertToRange<T>(n: T): Range<T> {
    return { start: n, end: n };
}

export function assertRange<T>(n: T | Range<T>): Range<T> {
    return isRange(n) ? n : convertToRange(n);
}