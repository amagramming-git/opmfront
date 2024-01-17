import { Dispatch, SetStateAction } from "react";
import { Pagination } from "react-bootstrap";

interface Props {
	currentPage: number;
	setCurrentPage: Dispatch<SetStateAction<number>>;
	endPage: number;
}

const PaginationLayout = (props: Props) => {
	if (props.endPage < 1) {
		return <></>;
	} else if (props.endPage == 1) {
		return (
			<Pagination>
				<Pagination.Prev disabled />
				<Pagination.Item disabled>{1}</Pagination.Item>
				<Pagination.Next disabled />
			</Pagination>
		);
	} else if (props.endPage <= 5) {
		const pageCounts = Array.from(
			{ length: props.endPage },
			(_, index) => index + 1
		);
		return (
			<>
				<Pagination>
					<Pagination.Prev
						disabled={props.currentPage == 1}
						onClick={() => {
							props.setCurrentPage((prev) => {
								if (prev != 1) {
									return prev - 1;
								} else {
									return prev;
								}
							});
						}}
					/>
					{pageCounts.map((pageCount) => (
						<Pagination.Item
							key={pageCount}
							active={pageCount == props.currentPage}
							onClick={() => {
								props.setCurrentPage(pageCount);
							}}
						>
							{pageCount}
						</Pagination.Item>
					))}
					<Pagination.Next
						disabled={props.currentPage == props.endPage}
						onClick={() => {
							props.setCurrentPage((prev) => {
								if (prev != props.endPage) {
									return prev + 1;
								} else {
									return prev;
								}
							});
						}}
					/>
				</Pagination>
			</>
		);
	} else if (props.endPage > 5) {
		return (
			<>
				<Pagination>
					<Pagination.Prev
						disabled={props.currentPage == 1}
						onClick={() => {
							props.setCurrentPage((prev) => {
								if (prev != 1) {
									return prev - 1;
								} else {
									return prev;
								}
							});
						}}
					/>
					<Pagination.Item
						active={1 == props.currentPage}
						onClick={() => {
							props.setCurrentPage(1);
						}}
					>
						{1}
					</Pagination.Item>
					{props.currentPage <= 3 ? (
						<Pagination.Item
							active={2 == props.currentPage}
							onClick={() => {
								props.setCurrentPage(2);
							}}
						>
							{2}
						</Pagination.Item>
					) : (
						<Pagination.Ellipsis disabled />
					)}
					{props.currentPage < 3 || props.currentPage > props.endPage - 2 ? (
						<Pagination.Item
							onClick={() => {
								props.setCurrentPage(
									props.currentPage < 3 ? 3 : props.endPage - 2
								);
							}}
						>
							{props.currentPage < 3 ? 3 : props.endPage - 2}
						</Pagination.Item>
					) : (
						<Pagination.Item
							active={true}
							onClick={() => {
								props.setCurrentPage(props.currentPage);
							}}
						>
							{props.currentPage}
						</Pagination.Item>
					)}
					{props.currentPage >= props.endPage - 2 ? (
						<Pagination.Item
							active={props.endPage - 1 == props.currentPage}
							onClick={() => {
								props.setCurrentPage(props.endPage - 1);
							}}
						>
							{props.endPage - 1}
						</Pagination.Item>
					) : (
						<Pagination.Ellipsis disabled />
					)}
					<Pagination.Item
						active={props.endPage == props.currentPage}
						onClick={() => {
							props.setCurrentPage(props.endPage);
						}}
					>
						{props.endPage}
					</Pagination.Item>
					<Pagination.Next
						disabled={props.currentPage == props.endPage}
						onClick={() => {
							props.setCurrentPage((prev) => {
								if (prev != props.endPage) {
									return prev + 1;
								} else {
									return prev;
								}
							});
						}}
					/>
				</Pagination>
			</>
		);
	}
};

export default PaginationLayout;
