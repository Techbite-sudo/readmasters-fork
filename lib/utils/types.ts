export type Nullable<T> = T | null;
export interface FormActionState {
	success?: boolean;
	formError?: string;
	fieldErrors?: Record<string, string>;
	formValues?: Record<string, FormDataEntryValue>;
}

export type CurrentSession = { [K: string]: unknown } & Nullable<{
	user?: { username?: string };
}>;
