import { FilterIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useBool } from "@/hooks/useBool";
import { Input } from "../ui/input";
import { Fragment } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "../ui/select";
import { useState } from "react";

type Props = {
	filters: {
		label: string;
		type: "text" | "search" | "date-range" | "select";
		selectOptions?: { value: string; label?: string }[];
	}[];
};

export default function TableFilter(props: Props) {
	const isExpanded = useBool();
	const valueMap = useState<Record<string, any>>({});

	function renderFilterInput(item: Props["filters"][number]) {
		switch (item.type) {
			case "text": {
				return <Input className="max-w-[200px]" placeholder={item.label} />;
			}
			case "select": {
				return (
					<Select>
						<SelectTrigger className="max-w-[200px]">{item.label}</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{item.selectOptions?.map(item => {
									return (
										<SelectItem key={item.value} value={item.value}>
											{item.label || item.value}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
				);
			}
			default:
				return null;
		}
	}

	return (
		<div
			style={{
				height: isExpanded.state ? 72 : 32,
				transition: "height 0.5s",
				marginBottom: 24,
			}}
		>
			<Button
				variant={"ghost"}
				className="flex gap-2 justify-start px-0 h-[28px]"
				onClick={() => {
					isExpanded.toggle();
				}}
			>
				<FilterIcon size={20} />
				Filters
			</Button>
			{isExpanded.state && (
				<div className="grid pt-2">
					<div className="flex gap-2">
						{props.filters.map((filterItem, index) => {
							return (
								<Fragment key={`${filterItem.label}-${index}`}>
									{renderFilterInput(filterItem)}
								</Fragment>
							);
						})}
					</div>
					<div>
						<button className="text-sm mt-2">apply</button>
					</div>
				</div>
			)}
		</div>
	);
}
