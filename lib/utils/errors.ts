import { ZodError } from "zod";

/**
 * Mainly meant for try-catch blocks as the
 * catch block returns any instead of Error
 */
export function asError(val: unknown): Error {
	if (val instanceof Error) return val;
	return new Error("Unknown Error", { cause: val });
}

export function parseZodError(err: ZodError) {
	const errMap: Record<string, string> = {};
	err.errors.forEach(errVar => {
		const path = errVar.path.join(".");
		errMap[path] = errVar.message;
	});
	return errMap;
}
