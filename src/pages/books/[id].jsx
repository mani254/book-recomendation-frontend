import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import ImageComponent from "@/components/ImageComponent";

const BookDetails = () => {
	const [book, setBook] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		if (!id) return;

		const fetchBookData = async () => {
			try {
				setLoading(true);
				const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`);
				setBook(response.data.book);
				setLoading(false);
			} catch (err) {
				setError("Failed to fetch book data.");
				setLoading(false);
			}
		};

		fetchBookData();
	}, [id]);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-xl text-gray-600">Loading...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-xl text-red-600">{error}</div>
			</div>
		);
	}

	if (!book) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-xl text-gray-600">No book found</div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto p-6">
			{/* Book Title & Cover */}
			<div className="text-center mb-6">
				<h1 className="text-3xl font-bold text-gray-800 mb-4">{book.title}</h1>
				<ImageComponent path={book.image || "/public/uploads"} alt="Book Cover" className="w-[300px] mx-auto object-cover rounded-lg shadow-lg" />
			</div>

			{/* Book Details */}
			<div className="space-y-4">
				<div>
					<h2 className="text-xl font-semibold text-gray-700">Overview</h2>
					<p className="text-gray-600">{book.overview}</p>
				</div>

				<div>
					<h2 className="text-xl font-semibold text-gray-700">Description</h2>
					<p className="text-gray-600">{book.description}</p>
				</div>

				<div>
					<h2 className="text-xl font-semibold text-gray-700">Published Year</h2>
					<p className="text-gray-600">{book.publishedYear}</p>
				</div>

				<div>
					<h2 className="text-xl font-semibold text-gray-700">Genre</h2>
					<p className="text-gray-600">{book.genre.name}</p>
				</div>

				<div>
					<h2 className="text-xl font-semibold text-gray-700">Author</h2>
					<p className="text-gray-600">{book.author.name}</p>
				</div>
			</div>
		</div>
	);
};

export default BookDetails;
