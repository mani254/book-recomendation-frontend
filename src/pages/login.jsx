import React, { useState } from "react";
import { TextInput, PasswordInput } from "@/components/FormComponents/FormComponents";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

function Login() {
	const [loginDetails, setLoginDetails] = useState({
		username: "",
		password: "",
	});

	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [serverError, setServerError] = useState("");

	// Handle Input Change
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setLoginDetails({ ...loginDetails, [name]: value });
	};

	// Handle Form Submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);
		try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, loginDetails);

			if (response.status === 200) {
				localStorage.setItem("authToken", response.data.token);
				localStorage.setItem("isAdmin", response.data.isAdmin);
				localStorage.setItem("username", response.data.username);
				alert("Login successful!");
				router.push("/books");
			}
		} catch (err) {
			if (err.response) {
				setServerError(err.response.data.message || "Login failed");
			} else {
				console.error("Login error:", err);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center">
			<div className="max-w-md min-w-[400px] mx-auto p-6 bg-white shadow-md rounded-md">
				<h2 className="text-xl font-semibold mb-4">Login</h2>
				{serverError && <p className="text-red-500">{serverError}</p>}
				<form onSubmit={handleSubmit}>
					<TextInput label="Username" placeholder="Enter your username" name="username" value={loginDetails.username} onChange={handleInputChange} required className="mb-4" />

					<PasswordInput label="Password" placeholder="Enter your password" name="password" value={loginDetails.password} onChange={handleInputChange} required className="mb-4" />

					<button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition" disabled={loading}>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>
				<p className="mt-4 text-center text-gray-600">
					New user?{" "}
					<Link href="/register" className="text-blue-500 hover:underline">
						register here
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
