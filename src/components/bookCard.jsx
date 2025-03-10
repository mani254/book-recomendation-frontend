import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import ImageComponent from "./ImageComponent";
import { useRouter } from "next/router";

function BookCard({ book, setBooks }) {
	const [isAdmin, setIsAdmin] = useState(false);
	const router = useRouter();

	const handleDelete = async () => {
		try {
			const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${book._id}`);

			if (response.status === 200) {
				setBooks((prevBooks) => prevBooks.filter((b) => b._id !== book._id));
				alert("Book deleted successfully!");
			}
		} catch (error) {
			console.error("Error deleting book:", error);
			alert("There was an error deleting the book. Please try again.");
		}
	};

	useEffect(() => {
		const storedIsAdmin = JSON.parse(localStorage.getItem("isAdmin") || "false");
		setIsAdmin(storedIsAdmin);
	}, []);

	return (
		<div className="max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden relative group p-4 transition-all duration-300 hover:shadow-2xl">
			<ImageComponent path={book.image || "/pubic/uploads"} alt="Book Cover" className="w-full h-48 object-contain rounded-lg" />

			<div className="mt-4">
				<h3 className="text-md font-semibold text-gray-800">{book.title}</h3>
				<p className="text-sm text-gray-500 mt-2">
					By <span className="font-medium">{book.author?.name}</span>
				</p>
				<span className="text-xs text-gray-400 bg-gray-200 px-4 py-1 rounded-full inline-block mt-2">{book.genre?.name}</span>
			</div>

			<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<Link href={`/books/${book._id}`} passHref>
					{" "}
					<p className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 transition">
						<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
							<circle cx="12" cy="12" r="3"></circle>
						</svg>
					</p>
				</Link>
				{isAdmin && (
					<button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 transition" onClick={handleDelete}>
						<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<polyline points="3 6 5 6 21 6"></polyline>
							<path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5 4v6m4-6v6M10 2h4a1 1 0 0 1 1 1v1H9V3a1 1 0 0 1 1-1z"></path>
						</svg>
					</button>
				)}
				{isAdmin && (
					<button
						className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 transition"
						onClick={() => {
							router.push(`books/update/${book._id}`);
						}}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
							<path d="M14.06 2.94a1.5 1.5 0 0 1 2.12 0l4.88 4.88a1.5 1.5 0 0 1 0 2.12l-10.6 10.6a1.5 1.5 0 0 1-.67.39l-5.46 1.54a1 1 0 0 1-1.25-1.26l1.54-5.45a1.5 1.5 0 0 1 .39-.67l10.6-10.6ZM15.12 5.06L5.5 14.69a.5.5 0 0 0-.13.22l-1.2 4.25 4.24-1.2a.5.5 0 0 0 .22-.13L18.94 8.88 15.12 5.06ZM16.18 4 20 7.82 21.06 6.76 17.24 3 16.18 4Z" />
						</svg>
					</button>
				)}
			</div>
		</div>
	);
}

export default BookCard;
