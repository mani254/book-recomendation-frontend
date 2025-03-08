import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Pagination = ({ totalItems = 1000 }) => {
	const router = useRouter();
	const { query } = router;

	const limit = parseInt(query.limit, 10) || 10;
	const totalPages = Math.ceil(totalItems / limit);
	const [currentPage, setCurrentPage] = useState(parseInt(query.page, 10) || 1);

	useEffect(() => {
		setCurrentPage(parseInt(query.page, 10) || 1);
	}, [query.page]);

	const changePage = (page) => {
		if (page >= 1 && page <= totalPages) {
			router.push(
				{
					pathname: router.pathname,
					query: { ...query, page },
				},
				undefined,
				{ shallow: true }
			);
		}
	};

	const renderPageNumbers = () => {
		const pages = [];
		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (currentPage <= 4) {
				pages.push(1, 2, 3, 4, 5, "ellipsis-start", totalPages);
			} else if (currentPage > totalPages - 4) {
				pages.push(1, "ellipsis-end", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
			} else {
				pages.push(1, "ellipsis-start", currentPage - 1, currentPage, currentPage + 1, "ellipsis-end", totalPages);
			}
		}
		return pages;
	};

	return (
		<div className="flex items-center justify-center gap-2 mt-10">
			<button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1} className={`px-3 py-1 rounded-full ${currentPage === 1 ? "bg-main-2 bg-opacity-60 text-gray-500" : "bg-main-2 bg-opacity-65 hover:bg-opacity-100"}`}>
				Previous
			</button>

			<div className="flex gap-2">
				{renderPageNumbers().map((page) =>
					page === "ellipsis-start" || page === "ellipsis-end" ? (
						<span key={page} className="px-4 py-2">
							...
						</span>
					) : (
						<button key={page} onClick={() => changePage(page)} className={`px-3 py-1 rounded-full ${page === currentPage ? "bg-primary bg-opacity-80 text-white" : "bg-main-2 bg-opacity-65 hover:bg-opacity-100"}`}>
							{page}
						</button>
					)
				)}
			</div>

			<button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages} className={`px-3 py-1 rounded-full ${currentPage === totalPages ? "bg-main-2 bg-opacity-60 text-gray-500" : "bg-main-2 bg-opacity-65 hover:bg-opacity-100"}`}>
				Next
			</button>

			<span className="ml-4 text-gray-600">
				Showing {Math.min(currentPage * limit, totalItems)} of {totalItems} results
			</span>
		</div>
	);
};

export default Pagination;
