export const ERROR_CODES = ["ERR_SESSION_REQUIRED"] as const;

export class ErrorWithCode extends Error {
	code: (typeof ERROR_CODES)[number];
	constructor(
		msg: string,
		options: ErrorOptions & { code: (typeof ERROR_CODES)[number] }
	) {
		super(msg, options);
		this.code = options.code;
	}
}
