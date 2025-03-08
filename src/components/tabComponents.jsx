import { useEffect, useState } from "react";
import axios from "axios";

import GenresList from "./generes";
import AuthorsList from "./authors";

const TabsComponent = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [preferredGenres, setPreferredGenres] = useState([]);
	const [preferredAuthors, setPreferredAuthors] = useState([]);

	useEffect(() => {
		const fetchPreferences = async () => {
			try {
				const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/preferences`);
				setPreferredAuthors(response.data.authors);
				setPreferredGenres(response.data.genres);
			} catch (err) {
				setError(err.response?.data?.message || "Failed to fetch preferences");
			} finally {
				setLoading(false);
			}
		};

		fetchPreferences();
	}, []);

	if (loading) return <p>Loading preferences...</p>;
	if (error) return <p className="text-danger">{error}</p>;

	return (
		<div>
			<h4 className="my-5">Genres</h4>
			<GenresList genres={preferredGenres} setPreferredGenres={setPreferredGenres} />

			<div className="py-4"></div>

			<h4 className="my-5">Authors</h4>
			<AuthorsList authors={preferredAuthors} setPreferredAuthors={setPreferredAuthors} />
		</div>
	);
};

export default TabsComponent;
