import { useState, useEffect } from "react";
import axios from "axios";

const GenresList = ({ genres: preferredGenres, setPreferredGenres }) => {
	const [genres, setGenres] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchGenres = async () => {
			setLoading(true);
			setError("");

			try {
				const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/genres`);
				setGenres(response.data.genres);
			} catch (err) {
				setError("Failed to fetch genres. Please try again.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchGenres();
	}, []);

	// Function to toggle genre preference
	const toggleGenre = async (genre) => {
		const isActive = preferredGenres.some((g) => g._id === genre._id);

		try {
			await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/api/users/update-preferences`,
				{
					type: "genre",
					itemId: genre._id,
					action: isActive ? "remove" : "add",
				},
				{ withCredentials: true }
			);

			setPreferredGenres((prev) => (isActive ? prev.filter((g) => g._id !== genre._id) : [...prev, genre]));
		} catch (err) {
			console.error("Failed to update preference:", err);
		}
	};

	if (loading) return <p>Loading genres...</p>;
	if (error) return <p className="text-danger">{error}</p>;
	if (genres.length === 0) return <p>No genres available.</p>;

	return (
		<div className="mt-6 flex gap-10 flex-wrap">
			{genres.map((genre) => {
				const isActive = preferredGenres.some((g) => g._id === genre._id);
				return (
					<div
						key={genre._id}
						onClick={() => toggleGenre(genre)}
						className={`cursor-pointer p-3 rounded-full border border-gray-500 text-center px-8 py-3 
                            ${isActive ? "bg-green-500 text-white" : "bg-gray-100 text-gray-800"}`}>
						{genre.name}
					</div>
				);
			})}
		</div>
	);
};

export default GenresList;
