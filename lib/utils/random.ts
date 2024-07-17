import { getRandomValues } from "crypto";

/**
 * Returns a number in the format `YYMMDDXXXX` where XXXX is random
 */
export function getARandomDocumentNumber(): number {
	const now = new Date();

	// Extract year, month, and day
	const year = (now.getFullYear() % 100).toString().padStart(2, '0')
	const month = (now.getMonth() + 1).toString().padStart(2, '0') // getMonth() returns 0-11, so add 1
	const day = now.getDate().toString().padStart(2, '0')

	const randomNum = Math.floor(Math.random() * 99999) + 1111
	return Number(`${year}${month}${day}${randomNum}`);
}

export function getRandomInt64(): bigint {
	const bytes = new BigInt64Array(1);
	getRandomValues(bytes);
	const val = bytes.at(0);
	if (!val)
		throw new Error("An error happened while generating random int64");
	return val > 0 ? val : -val
}

export function getRandomHex(length = 32): string {
	const bytes = new Uint8Array(length / 2);
	getRandomValues(bytes);
	return bytes.reduce(
		(str, byte) => str + byte.toString(16).padStart(2, "0"),
		""
	);
}
