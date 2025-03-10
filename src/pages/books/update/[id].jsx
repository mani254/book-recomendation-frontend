import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SuggestionSearch from "@/components/FormComponents/SuggestionSearch";
import { NumberInput, TextInput, TextArea } from "@/components/FormComponents/FormComponents";

const UpdateBook = () => {
	const router = useRouter();
	const { id } = router.query;

	const [bookDetails, setBookDetails] = useState({
		title: "",
		overview: "",
		description: "",
		genre: "",
		author: "",
		publishedYear: "",
	});

	const [errors, setErrors] = useState({
		title: "",
		overview: "",
		description: "",
		genre: "",
		author: "",
		publishedYear: "",
	});
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);

	const urlToFile = async (imageUrl, filename) => {
		try {
			const response = await fetch(imageUrl);
			const blob = await response.blob();
			return new File([blob], filename, { type: blob.type });
		} catch (error) {
			console.error("Error converting URL to file:", error);
			return null;
		}
	};

	useEffect(() => {
		const fetchBook = async () => {
			try {
				setLoading(true);
				const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`);
				response.data.book.author = response.data.book.author.name;
				response.data.book.genre = response.data.book.genre.name;
				setBookDetails(response.data.book);
				setPreview(response.data.book.image);
				const imageFile = await urlToFile(response.data.book.image, "book-cover.jpg");
				setImage(imageFile);
			} catch (err) {
				console.log(err);
				alert("Failed to load book. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchBook();
	}, []);

	const handleInputChange = useCallback(({ target: { name, value } }) => {
		setBookDetails((prev) => ({ ...prev, [name]: value }));
		let error = validation(name, value);
		setErrors((prevState) => ({ ...prevState, [name]: error }));
	}, []);

	const fetchAuthorSuggestions = useCallback(async (query) => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/authors`, { params: query });

			if (response?.data.authors) {
				const data = response.data.authors.map((author) => author.name);
				return data;
			}
			return [];
		} catch (err) {
			console.error("Error fetching authors:", err);
			return [];
		}
	}, []);

	const fetchGenreSuggestions = useCallback(async (query) => {
		try {
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/genres`, { params: query });

			if (response?.data.genres) {
				const data = response.data.genres.map((gene) => gene.name);
				return data;
			}
			return [];
		} catch (err) {
			console.error("Error fetching genres:", err);
			return [];
		}
	}, []);

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			if (!file.type.startsWith("image/")) {
				alert("Please select a valid image file.");
				return;
			}

			setImage(file);
			setPreview(URL.createObjectURL(file));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const requiredFields = ["title", "overview", "publishedYear", "author", "genre"];
		const emptyField = requiredFields.find((field) => !bookDetails[field]);
		if (emptyField) {
			setErrors((prev) => ({ ...prev, [emptyField]: `${emptyField} is required` }));
			window.alert(`${emptyField} is required`);
			return;
		}
		if (!image) {
			window.alert("Please add an image");
			return;
		}
		setLoading(true);
		const formData = new FormData();
		Object.keys(bookDetails).forEach((key) => formData.append(key, bookDetails[key]));
		formData.append("image", image);

		async function update() {
			try {
				const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, formData, {
					headers: { "Content-Type": "multipart/form-data" },
				});

				if (response) {
					alert("Book updated successfully!");
					router.push("/books");
				}
			} catch (err) {
				alert(err.response?.data?.message || "Product adding failed");
				console.error("Error:", err);
			} finally {
				setLoading(false);
			}
		}
		update();
	};

	return (
		<form className="p-6 max-w-6xl mx-auto min-h-screen rounded-lg overflow-hidden mt-2 bg-main" onSubmit={handleSubmit}>
			<h4 className="mb-5">Update Book 📚</h4>
			<div className="flex gap-3">
				<div className="w-4/6">
					<div className="outer-box">
						<TextInput label="Title" placeholder="Book Title" name="title" error={errors.title || ""} value={bookDetails.title} onChange={handleInputChange} required={true} className="mb-4" />
						<TextArea label="Overview" placeholder="Book Overview" name="overview" error={errors.overview || ""} value={bookDetails.overview} onChange={handleInputChange} rows={3} className="mb-4" required={true} />
						<TextArea label="Description" placeholder="Book Description" name="description" error={errors.description || ""} value={bookDetails.description} onChange={handleInputChange} rows={8} className="mb-4" required={true} />
					</div>
					<div className="outer-box">
						<div className="mb-3">
							<SuggestionSearch defaultValue={bookDetails.author} label="Author" placeholder="Book Author" selected={bookDetails} setSelected={setBookDetails} allowManual={true} single={true} value={"author"} fetchSuggestions={fetchAuthorSuggestions} />
						</div>
						<div className="mb-3">
							<SuggestionSearch defaultValue={bookDetails.genre} label="Genre" placeholder="Book Genre" selected={bookDetails} setSelected={setBookDetails} allowManual={true} single={true} value={"genre"} fetchSuggestions={fetchGenreSuggestions} />
						</div>

						<NumberInput label="Published Year" placeholder="Book Published Year" name="publishedYear" error={errors.publishedYear || ""} value={bookDetails.publishedYear} onChange={handleInputChange} className="mb-4" required={true} />
					</div>
				</div>
				<div className="w-2/5">
					<div className="outer-box">
						<h5 className="mb-2">Collection Image</h5>
						<input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
						{preview && (
							<div className="mt-2">
								<img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-md" />
							</div>
						)}
					</div>
					<button type="submit" className="btn-primary w-full mt-4" disabled={loading}>
						{loading ? "Updating..." : "Update Book"}
					</button>
				</div>
			</div>
		</form>
	);
};

export default UpdateBook;
