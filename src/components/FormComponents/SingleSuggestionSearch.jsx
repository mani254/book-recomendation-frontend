import React, { useState, useEffect, useRef, useCallback } from "react";
import { TextInput } from "./FormComponents";

const SingleSuggestionSearch = ({ setSelected, fetchSuggestions, allowManual = false, value = null, label = null, placeholder = null }) => {
	const [search, setSearch] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [isFocused, setIsFocused] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
	const [flag, setFlag] = useState(false);
	const inputRef = useRef(null);

	// Fetch suggestions with debounce
	useEffect(() => {
		const handler = setTimeout(async () => {
			if (search.length > 1) {
				try {
					if (value) {
						setSelected((prev) => ({ ...prev, [value]: search }));
					} else {
						setSelected(search);
					}
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
			if (value) {
				setSelected((prev) => ({ ...prev, [value]: suggestion }));
			} else {
				setSelected(suggestion);
			}

			setSearch(suggestion);
			setFlag(true);
			setSuggestions([]);
			setActiveIndex(-1);
		},
		[setSelected, value]
	);

	const handleKeyDown = useCallback(
		(e) => {
			setFlag(false);
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
			{!flag && isFocused && suggestions.length > 0 && (
				<div className="absolute w-full bg-white border mt-1 max-h-52 overflow-y-auto shadow-md rounded">
					{suggestions.map((suggestion, index) => (
						<div key={suggestion} onMouseDown={(e) => e.preventDefault()} onClick={() => handleSelect(suggestion)} className={`p-2 cursor-pointer ${index === activeIndex ? "bg-gray-200" : ""}`}>
							{suggestion}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SingleSuggestionSearch;
