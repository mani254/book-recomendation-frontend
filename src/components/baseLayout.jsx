import React from "react";
import Navbar from "./navbar";

function BaseLayout({ children }) {
	return (
		<div className="flex gap-10">
			<Navbar />
			<div className="w-full">{children}</div>
		</div>
	);
}

export default BaseLayout;
