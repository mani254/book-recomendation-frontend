import { useState, useEffect } from "react";
import axios from "axios";

const AuthorsList = ({ authors: preferredAuthors, setPreferredAuthors }) => {
	const [authors, setAuthors] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchAuthors = async () => {
			setLoading(true);
			setError("");

			try {
				const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/authors`);
				setAuthors(response.data.authors);
			} catch (err) {
				setError("Failed to fetch authors. Please try again.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchAuthors();
	}, []);

	const toggleAuthor = async (author) => {
		const isActive = preferredAuthors.some((a) => a._id === author._id);

		try {
			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/update-preferences`, {
				type: "author",
				itemId: author._id,
				action: isActive ? "remove" : "add",
			});

			setPreferredAuthors((prev) => (isActive ? prev.filter((a) => a._id !== author._id) : [...prev, author]));
		} catch (err) {
			console.error("Failed to update preference:", err);
		}
	};

	if (loading) return <p>Loading authors...</p>;
	if (error) return <p className="text-danger">{error}</p>;
	if (authors.length === 0) return <p>No authors available.</p>;

	return (
		<div className="mt-6 flex gap-10 flex-wrap">
			{authors.map((author) => {
				const isActive = preferredAuthors.some((a) => a._id === author._id);
				return (
					<div
						key={author._id}
						onClick={() => toggleAuthor(author)}
						className={`cursor-pointer p-3 rounded-full border border-gray-500 text-center px-8 py-3 
                            ${isActive ? "bg-green-500 text-white" : "bg-gray-100 text-gray-800"}`}>
						{author.name}
					</div>
				);
			})}
		</div>
	);
};

export default AuthorsList;
