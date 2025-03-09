import React from "react";
import SingleSuggestionSearch from "./SingleSuggestionSearch";
import MultiSuggestionSearch from "./MultiSuggestionSearch";

const SuggestionSearch = ({ single = false, ...props }) => {
	return single ? <SingleSuggestionSearch {...props} /> : <MultiSuggestionSearch {...props} />;
};

export default SuggestionSearch;
