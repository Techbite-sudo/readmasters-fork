export function returnErr(message: string) {
	return { success: false, error: { message: message } } as const;
}

export function returnOk<T>(value: T) {
	return { success: true, value: value } as const;
}

export function Ok<T>(value: T) {
	return returnOk(value);
}

export function Err(message: string) {
	return returnErr(message);
}


export type ReturnX = ReturnType<typeof returnOk> | ReturnType<typeof returnErr>;
