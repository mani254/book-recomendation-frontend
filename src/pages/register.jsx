import React, { useState } from "react";
import { useRouter } from "next/router";
import { TextInput, PasswordInput, CheckboxInput } from "@/components/FormComponents/FormComponents";
import axios from "axios";
import Link from "next/link";

function Register() {
	const router = useRouter();

	const [registerDetails, setRegisterDetails] = useState({
		username: "",
		password: "",
		confirmPassword: "",
		admin: false,
	});
	const [errors, setErrors] = useState({
		username: "",
		password: "",
		confirmPassword: "",
	});
	const [loading, setLoading] = useState(false);
	const [serverError, setServerError] = useState("");

	// Handle Input Change
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setRegisterDetails({ ...registerDetails, [name]: value });

		// Clear previous errors
		setErrors((prev) => ({ ...prev, [name]: "" }));

		// Validate password (6 chars + 1 number)
		if (name === "password") {
			const passwordRegex = /^(?=.*\d).{6,}$/;
			if (!passwordRegex.test(value)) {
				setErrors((prev) => ({ ...prev, password: "Password must have at least 6 characters and one number" }));
			}
		}

		// Validate confirm password
		if (name === "confirmPassword") {
			if (value !== registerDetails.password) {
				setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
			}
		}
	};

	// Handle Form Submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Final validation check before submitting
		if (errors.password || errors.confirmPassword || !registerDetails.username || !registerDetails.password) {
			setErrors((prev) => ({
				...prev,
				username: !registerDetails.username ? "Username is required" : prev.username,
				password: !registerDetails.password ? "Password is required" : prev.password,
				confirmPassword: registerDetails.confirmPassword !== registerDetails.password ? "Passwords do not match" : prev.confirmPassword,
			}));
			return;
		}

		setLoading(true);
		try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, registerDetails);

			if (response) {
				alert("Registration successful! Redirecting to login...");
				router.push("/login");
			}
		} catch (err) {
			setServerError(err.response?.data?.message || "Registration failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex flex-col justify-center items-center ">
			<h5 className="mb-3 text-center max-w-[360px] text-red-500">Register as admin to add update and delete Product</h5>
			<div className="max-w-md min-w-[400px] mx-auto p-6 bg-white shadow-md rounded-md">
				<h2 className="text-xl font-semibold mb-4 ">Register</h2>

				{serverError && <p className="text-red-500 mb-3">{serverError}</p>}

				<form onSubmit={handleSubmit}>
					<TextInput label="Username" placeholder="Enter your username" name="username" error={errors.username} value={registerDetails.username} onChange={handleInputChange} required className="mb-4" />

					<PasswordInput label="Password" placeholder="Enter your password" name="password" error={errors.password} value={registerDetails.password} onChange={handleInputChange} required className="mb-4" />

					<PasswordInput label="Confirm Password" placeholder="Confirm your password" name="confirmPassword" error={errors.confirmPassword} value={registerDetails.confirmPassword} onChange={handleInputChange} required className="mb-4" />

					<CheckboxInput label="Register as Admin" id="admin" name="admin" checked={registerDetails.admin} onChange={(e) => setRegisterDetails({ ...registerDetails, admin: e.target.checked })} className="mb-4 flex items-center gap-2" />

					<button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition" disabled={loading || !!errors.password || !!errors.confirmPassword}>
						{loading ? "Registering..." : "Register"}
					</button>
				</form>

				<p className="mt-4 text-center text-gray-600">
					Already a user?{" "}
					<Link href="/login" className="text-blue-500 hover:underline">
						Login here
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Register;
