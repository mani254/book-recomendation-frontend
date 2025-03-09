import React, { useState, useEffect, useRef, useCallback } from "react";
import { TextInput } from "./FormComponents";

const MultiSuggestionSearch = ({ selected, setSelected, fetchSuggestions, allowManual = false, label = null, placeholder = null, valueKey = "title" }) => {
	const [search, setSearch] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [isFocused, setIsFocused] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
	const inputRef = useRef(null);

	// Fetch suggestions with debounce
	useEffect(() => {
		const handler = setTimeout(async () => {
			if (search.length > 1) {
				try {
					const result = await fetchSuggestions({ search });
					setSuggestions(result || []);
				} catch (err) {
					console.error("Error fetching suggestions:", err);
				}
			} else {
				setSuggestions([]);
			}
		}, 300);

		return () => clearTimeout(handler);
	}, [search, fetchSuggestions]);

	const handleSelect = useCallback(
		(suggestion) => {
			if (!selected.some((item) => (typeof item === "object" ? item[valueKey] : item) === (typeof suggestion === "object" ? suggestion[valueKey] : suggestion))) {
				setSelected((prev) => [...prev, suggestion]);
			}
			setSearch("");
			setSuggestions([]);
			setActiveIndex(-1);
		},
		[selected, setSelected, valueKey]
	);

	const handleKeyDown = useCallback(
		(e) => {
			if (e.key === "ArrowDown") {
				setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
			} else if (e.key === "ArrowUp") {
				setActiveIndex((prev) => Math.max(prev - 1, -1));
			} else if (e.key === "Enter") {
				if (activeIndex === -1 && allowManual && search.trim()) {
					handleSelect(search.trim());
				} else if (activeIndex >= 0 && suggestions[activeIndex]) {
					handleSelect(suggestions[activeIndex]);
				}
			}
		},
		[suggestions, activeIndex, handleSelect, allowManual, search]
	);

	return (
		<div className="relative">
			<TextInput ref={inputRef} label={label} placeholder={placeholder} value={search} onChange={(e) => setSearch(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setTimeout(() => setIsFocused(false), 200)} onKeyDown={handleKeyDown} />
			{isFocused && suggestions.length > 0 ? (
				<div className="absolute w-full bg-white border mt-1 max-h-52 overflow-y-auto shadow-md rounded">
					{suggestions
						.filter((sug) => !selected.some((item) => (typeof item === "object" ? item[valueKey] : item) === (typeof sug === "object" ? sug[valueKey] : sug)))
						.map((suggestion, index) => {
							const displayValue = typeof suggestion === "object" ? suggestion[valueKey] : suggestion;
							return (
								<div key={displayValue} onMouseDown={(e) => e.preventDefault()} onClick={() => handleSelect(suggestion)} className={`p-2 cursor-pointer ${index === activeIndex ? "bg-gray-200" : ""}`}>
									{displayValue}
								</div>
							);
						})}
				</div>
			) : (
				isFocused && search.length > 2 && <p className="text-center text-gray-500 absolute w-full bg-white border mt-1">No Results</p>
			)}
		</div>
	);
};

export default MultiSuggestionSearch;
