import React from "react";

function ImageComponent({ className, path, ...other }) {
	const actualUrl = path.startsWith("http") ? path : `${process.env.NEXT_PUBLIC_API_URL}/${path.slice(6)}`;
	return <img src={actualUrl} className={className} {...other} />;
}

export default ImageComponent;
