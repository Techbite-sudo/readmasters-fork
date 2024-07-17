export function formatCurrency(arg: string | number, currency: string = "USD"): string {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});

	if (typeof arg === "number") {
		return formatter.format(arg);
	} else {
		const num = parseFloat(arg);
		if (isNaN(num)) {
			throw new Error(`Invalid input: "${arg}" not a valid number or numeric string`);
		}
		return formatter.format(num);
	}
}
