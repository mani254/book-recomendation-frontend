import React from "react";

const SearchComponent = ({ placeholder = "Search...", value = "", onChange, iconColor = "#707070", bgColor = "bg-main-2 bg-opacity-40", placeholderColor = "placeholder-zinc-400", className = "" }) => {
	return (
		<div className={`relative w-full ${className}`}>
			<input
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className={`w-full pl-10 pr-4 py-1 text-sm rounded-lg ${placeholderColor} ${bgColor} focus:outline-none`}
				style={{
					paddingLeft: "2.5rem",
				}}
			/>

			<div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" style={{ color: iconColor }}>
				<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
					<path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
				</svg>
			</div>
		</div>
	);
};

export default SearchComponent;
