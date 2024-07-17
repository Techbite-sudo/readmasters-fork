export function sleep(num: number) {
	return new Promise<null>(resolve => {
		setTimeout(() => {
			resolve(null);
		}, num);
	});
}
