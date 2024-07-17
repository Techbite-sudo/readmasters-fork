export function formDataToObject(form: FormData) {
	return Object.fromEntries(form.entries());
}
