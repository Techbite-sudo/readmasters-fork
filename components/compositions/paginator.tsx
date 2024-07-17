import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../ui/pagination";
import Spacer from "../ui/spacer";

type Props = {
	count?: number;
	onNext: () => void;
	onPrevious: () => void;
};

export default function Paginator(props: Props) {
	return (
		<Pagination className="flex dead-center-children mt-4 justify-end gap-2">
			<Spacer />
			<div className="text-xs">{props.count && `${props.count} items`}</div>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href="#"
						onClick={e => {
							e.preventDefault();
							props.onPrevious();
						}}
					/>
				</PaginationItem>
				{/* <PaginationItem>
				<PaginationLink href="#">1</PaginationLink>
			</PaginationItem> */}
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationNext
						href="#"
						onClick={e => {
							e.preventDefault();
							props.onNext();
						}}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
