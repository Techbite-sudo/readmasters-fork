import { pbkdf2Async } from "@noble/hashes/pbkdf2";
import { sha256 } from "@noble/hashes/sha256";
import { bytesToHex } from "@noble/hashes/utils";
import { getRandomHex } from "./random";

async function hashPassword(password: string, salt: string): Promise<string> {
	const hash = await pbkdf2Async(sha256, password, salt, {
		c: 32,
		dkLen: 32,
	});
	const str = bytesToHex(hash);
	return `${str}-${salt}`;
}

/**
 * returns a string in the form `{hash}-{salt}`
 */
export function turnPasswordToHash(password: string): Promise<string> {
	const salt = getRandomHex(32);
	return hashPassword(password, salt);
}

export async function isValidPasswordHash(
	storedHash: string,
	providedPassword: string
): Promise<boolean> {
	const [expectedHash, salt] = storedHash.split("-");
	const generatedHash = await hashPassword(providedPassword, salt);
	return generatedHash === storedHash;
}
