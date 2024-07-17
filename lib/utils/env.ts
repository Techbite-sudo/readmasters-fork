export function requireEnvVar(arg: string) {
	const env = process.env[arg];
	if (!env) {
		throw new Error(`Environment variable ${arg} is not set`);
	}
	return env;
}
