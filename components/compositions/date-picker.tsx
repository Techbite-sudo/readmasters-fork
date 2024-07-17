"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/shad-utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DatePicker(props: { value?: Date; onSelectDate: (arg: Date) => void }) {
	const [date, setDate] = React.useState(props.value);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"ghost"}
					className={cn(
						"w-[240px] justify-start text-left font-normal",
						!date && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={date}
					onSelect={date => {
						if (date) {
							setDate(date);
							props.onSelectDate(date);
						}
					}}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
