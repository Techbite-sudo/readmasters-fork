export function capitalize<S extends string>(str: S): Capitalize<S> {
	return (str.charAt(0).toUpperCase() +
		str.slice(1).toLowerCase()) as Capitalize<S>;
}

export function makeSentenceCase(str: string): string {
	return str
		.split(" ")
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");
}

export function removeSpecialCharacters(str: string): string {
	return str.replace(/[^a-zA-Z0-9\s]/g, "");
}

/**
 * transforms string to lowercase then makes it sentence case
 */
export function makeSnakeCase(str: string): string {
	const lowerCaseStr = str.toLowerCase();
	// Replace spaces and other non-word characters with underscores
	const snakeCaseStr = lowerCaseStr
		.replace(/\s+/g, "_")
		.replace(/[^\w_]/g, "");
	return snakeCaseStr;
}

export function joinNames(...args: Array<string | undefined | null>): string {
	return args.join(" ");
}


export const generateRandomPassword = (length: number = 12): string => {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
	let password = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		password += characters[randomIndex];
	}
	return password;
};
