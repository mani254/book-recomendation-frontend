import React, { useState, useCallback } from "react";
import { NumberInput, TextArea, TextInput } from "@/components/FormComponents/FormComponents";
import { validation } from "@/utils/indes";
import axios from "axios";

function Add() {
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

	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);

	const handleInputChange = useCallback(({ target: { name, value } }) => {
		setBookDetails((prev) => ({ ...prev, [name]: value }));
		let error = validation(name, value);
		setErrors((prevState) => ({ ...prevState, [name]: error }));
	}, []);

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			// Validate file type
			if (!file.type.startsWith("image/")) {
				alert("Please select a valid image file.");
				return;
			}

			// Set image and create a preview URL
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

		const formData = new FormData();
		Object.keys(bookDetails).forEach((key) => formData.append(key, bookDetails[key]));
		formData.append("image", image);

		async function fetch() {
			try {
				const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, formData, {
					headers: { "Content-Type": "multipart/form-data" },
				});

				if (response) {
					alert("Product added successfully!");
					console.log("Server Response:", response.data);
					setBookDetails({ title: "", overview: "", description: "", genre: "", author: "", publishedYear: "" });
					setImage("");
					setPreview("");
				}
			} catch (err) {
				alert(err.response?.data?.message || "Product adding failed");
				console.error("Error:", err);
			}
		}
		fetch();
	};

	return (
		<form className="p-6 max-w-6xl mx-auto min-h-screen rounded-lg overflow-hidden mt-2 bg-main" onSubmit={handleSubmit}>
			<h4 className="mb-5">Add Book 📚</h4>
			<div className="flex gap-3">
				<div className="w-4/6">
					<div className="outer-box">
						<TextInput label="Title" placeholder="Book Title" name="title" error={errors.title || ""} value={bookDetails.title} onChange={handleInputChange} required={true} className="mb-4" />
						<TextArea label="Overview" placeholder="Book Overview" name="overview" error={errors.overview || ""} value={bookDetails.overview} onChange={handleInputChange} rows={3} className="mb-4" required={true} />
						<TextArea label="Description" placeholder="Book Description" name="description" error={errors.description || ""} value={bookDetails.description} onChange={handleInputChange} rows={8} className="mb-4" required={true} />
					</div>
					<div className="outer-box">
						<TextInput label="Author" placeholder="Book Author" name="author" error={errors.author || ""} value={bookDetails.author} onChange={handleInputChange} className="mb-4" required={true} />
						<TextInput label="Genre" placeholder="Book Genre" name="genre" error={errors.genre || ""} value={bookDetails.genre} onChange={handleInputChange} className="mb-4" required={true} />
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
					<button type="submit" className="btn-primary w-full mt-4">
						Add Book
					</button>
				</div>
			</div>
		</form>
	);
}

export default Add;
