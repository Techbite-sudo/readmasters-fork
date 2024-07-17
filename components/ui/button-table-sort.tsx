import { type ComponentProps } from "react";
import { Button } from "./button";
import { cn } from "@/lib/shad-utils";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";

type Props = ComponentProps<typeof Button> & {
	column: string;
	onChangeSort: (arg: string) => void;
	currentOrderBy?: { column: string; direction: "asc" | "desc" } | null;
};

export function ButtonTableSort(props: Props) {
	const { className, children, currentOrderBy, onChangeSort, column, ...otherProps } = props;

	function renderCaret() {
		if (currentOrderBy) {
			const { column, direction } = currentOrderBy;
			if (props.column !== column) return null;
			if (direction === "asc") return <CaretUpIcon />;
			return <CaretDownIcon />;
		}
		return null;
	}

	return (
		<button
			{...otherProps}
			onClick={() => props.onChangeSort(column)}
			className={cn("w-full text-left flex pr-4", className)}
		>
			<span className="spacer">{children}</span>
			{renderCaret()}
		</button>
	);
}
