export default function InputError(props: { message: string | undefined }) {
	if (props.message) {
		return <div className="text-red-500">{props.message}</div>;
	}
	return null;
}
