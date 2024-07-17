import qs from 'qs';

/**
 * Checks if the given argument is a Plain Old JavaScript Object (PoJo).
 * 
 * A PoJo is considered to be any object that is not null, not an array, and is of type 'object'.
 * 
 * @example
 * ```
 * isPoJo({}); // true
 * isPoJo(null); // false
 * isPoJo([]); // false
 * isPoJo("string"); // false
 * ```
 */
export function isPoJo(arg: unknown) {
	if (!arg) {
		return false;
	}
	if (Array.isArray(arg)) {
		return false;
	}
	if (typeof arg === "object") {
		return true;
	}
	return false;
}

export function getEmptyObject() {
    return Object.create(null)
}

export function parseQS(arg: string) {
    return qs.parse(arg);
}

export function stringifyQs(arg: any) {
    return qs.stringify(arg);
}

export function toObject(object: any) {
    return JSON.parse(JSON.stringify(object, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
}
