import React, { useState, useCallback } from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import SearchComponent from "./FormComponents/SearchComponent";
import { SelectInput } from "./FormComponents/FormComponents";

function debounce(func, delay) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func(...args);
		}, delay);
	};
}
function BooksFilter() {
	const { getParam, setParam, resetParams, searchParams } = useQueryParams({
		page: 1,
		limit: 10,
	});

	const [searchValue, setSearchValue] = useState(getParam("search"));

	// a debounce funation to set the search value in the params with some time
	const debouncedSearchChange = useCallback(
		debounce((searchText) => {
			setParam("search", searchText);
			setParam("page", 1);
		}, 500),
		[searchParams]
	);

	// function to update the search value
	const handleSearchChange = useCallback(
		(e) => {
			const searchText = e.target.value;
			setSearchValue(searchText);
			debouncedSearchChange(searchText);
		},
		[debouncedSearchChange]
	);

	// function to handle the staus change
	const handleStatusChange = useCallback(
		(e) => {
			setParam("status", e.target.value);
			setParam("page", 1);
		},
		[setParam]
	);

	// function to handle items per page change
	const handleItemsPerPageChange = useCallback(
		(e) => {
			setParam("limit", e.target.value);
			setParam("page", 1);
		},
		[setParam]
	);

	return (
		<div className="my-10 flex gap-4 items-center justify-between sticky top-10">
			<div className="flex justify-between items-center min-w-[350px]">
				<SearchComponent placeholder="Search for Book..." value={searchValue} onChange={handleSearchChange} rounded="lg" />
			</div>

			<div className="flex gap-4 items-center">
				<div className="flex gap-4 items-center">
					{/* <SelectInput
						label="Status:"
						className="flex gap-2"
						value={getParam("status")}
						onChange={handleStatusChange}
						options={[
							{ label: "All", value: "" },
							{ label: "Draft", value: "draft" },
							{ label: "Active", value: "active" },
							{ label: "Inactive", value: "inactive" },
						]}
					/> */}
					<SelectInput
						label="Items per page:"
						className="flex gap-2"
						value={getParam("limit")}
						onChange={handleItemsPerPageChange}
						options={[
							{ label: "10", value: 10 },
							{ label: "20", value: 20 },
							{ label: "30", value: 30 },
							{ label: "40", value: 40 },
							{ label: "50", value: 50 },
						]}
					/>
				</div>
			</div>

			<div className="flex justify-end">
				<button onClick={resetParams} className="px-6 py-1 bg-main-2 rounded-lg">
					Reset Filters
				</button>
			</div>
		</div>
	);
}

export default BooksFilter;
