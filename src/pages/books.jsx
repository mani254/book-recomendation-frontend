import { useEffect, useState, useRef } from "react";
import axios from "axios";
import BookCard from "@/components/bookCard";
import { useRouter } from "next/router";
import BooksFilter from "@/components/booksFilter";
import Pagination from "@/components/pagination";

export default function Books() {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [totalItems, setTotalItems] = useState(0);
	const router = useRouter();
	const searchParams = router.query;

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				setLoading(true);
				const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, { params: searchParams });
				setBooks(response.data.books);
				setTotalItems(response.data.totalItems);
			} catch (err) {
				setError("Failed to load books. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchBooks();
	}, [searchParams]);

	const limit = parseInt(searchParams.limit, 10) || 10;

	if (loading)
		return (
			<div className="flex justify-center items-center h-40">
				<div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
				<p className="ml-3 text-gray-500 text-lg">Loading books...</p>
			</div>
		);

	if (error)
		return (
			<div className="flex flex-col items-center justify-center h-40 bg-red-100 p-4 rounded-lg border border-red-300">
				<p className="text-red-600 text-lg font-semibold">⚠️ Error</p>
				<p className="text-red-500">{error}</p>
			</div>
		);

	return (
		<div className="p-6 max-w-6xl mx-auto  rounded-lg overflow-hidden mt-2 bg-main">
			<h4 className="mb-5">Books 📚</h4>
			<BooksFilter />
			<div>
				{books.length === 0 ? (
					<p className="text-center text-gray-600">No books available.</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{books.map((book) => (
							<BookCard key={book._id} book={book} setBooks={setBooks} />
						))}
					</div>
				)}

				{totalItems > limit && <Pagination totalItems={totalItems} />}
			</div>
		</div>
	);
}
