import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "@/components/bookCard";
import Pagination from "@/components/pagination";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Recommendations() {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [totalItems, setTotalItems] = useState(0);
	const router = useRouter();
	const searchParams = router.query;

	useEffect(() => {
		const fetchRecommendedBooks = async () => {
			try {
				setLoading(true);
				const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/recommendations`, { params: searchParams });
				setBooks(response.data.recommendedBooks);
				setTotalItems(response.data.totalItems);
			} catch (err) {
				setError("Failed to load recommended books. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchRecommendedBooks();
	}, [searchParams]);

	const limit = parseInt(searchParams.limit, 10) || 10;

	if (loading)
		return (
			<div className="flex justify-center items-center h-40">
				<div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
				<p className="ml-3 text-gray-500 text-lg">Loading recommendations...</p>
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
		<div className="p-6 max-w-6xl mx-auto rounded-lg overflow-hidden mt-2 bg-main">
			<h4 className="mb-5">Recommended Books 📖</h4>
			<div>
				{books.length === 0 ? (
					<>
						<p className="text-center text-gray-600">
							You currently don't have any recommendations because your preferences are not set.
							<br />
							<span className="text-sm">Set your preferences to get personalized recommendations.</span>
						</p>
						<div className="text-center mt-4">
							<Link href="/preferences">
								<span className="inline-block bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300">Set Your Preferences</span>
							</Link>
						</div>
					</>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{books.slice(0, limit).map((book) => (
							<BookCard key={book._id} book={book} />
						))}
					</div>
				)}

				{totalItems > limit && <Pagination totalItems={totalItems} />}
			</div>
		</div>
	);
}
