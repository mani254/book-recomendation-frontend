import React from "react";
// import "./FormComponents.css";

export const TextInput = ({ className, variant, id, label, error, ...props }) => {
	return (
		<div className={`input-wrapper  variant-${variant} ${className || ""} ${error && "error"}`}>
			<div>
				{label && <label htmlFor={id}>{label}</label>}
				<input type="text" id={id} {...props} />
			</div>
			{error && <p className="text-xxs mt-[2px] text-accent">{error}</p>}
		</div>
	);
};

export const TextArea = ({ className, variant, id, label, error, ...props }) => {
	return (
		<div className={`input-wrapper  variant-${variant} ${className || ""} ${error && "error"}`}>
			{label && <label htmlFor={id}>{label}</label>}
			<textarea type="text" id={id} {...props} />
			{error && <p className="text-xxs mt-[2px] text-accent">{error}</p>}
		</div>
	);
};

export const NumberInput = ({ className, variant, id, label, error, ...props }) => {
	return (
		<div className={`input-wrapper  variant-${variant} ${className || ""}`}>
			{label && <label htmlFor={id}>{label}</label>}
			<input type="number" id={id} {...props} />
			{error && <p className="text-xxs mt-[2px] text-accent">{error}</p>}
		</div>
	);
};

export const CheckboxInput = ({ className, variant, id, label, checked, ...props }) => {
	return (
		<div className={`input-wrapper  checkbox variant-${variant} ${className || ""}`}>
			<input type="checkbox" id={id} className={`checkbox-input`} checked={checked} {...props} />
			{label && <label htmlFor={id}>{label}</label>}
		</div>
	);
};

export const SelectInput = ({ className, variant, id, label, options, ...props }) => {
	return (
		<div className={`input-wrapper variant-${variant} ${className || ""}`}>
			<label htmlFor={id}>{label}</label>
			<select {...props} id={id}>
				{options.map((option, index) => (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export const DateInput = ({ className, variant, id, label, error, ...props }) => {
	return (
		<div className={`input-wrapper variant-${variant} ${className || ""} ${error && "error"}`}>
			{label && <label htmlFor={id}>{label}</label>}
			<input type="date" id={id} {...props} />
			{error && <p className="text-xxs mt-[2px] text-accent">{error}</p>}
		</div>
	);
};

import { useState } from "react";

export const PasswordInput = ({ className, variant, id, label, error, ...props }) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className={`input-wrapper variant-${variant} ${className || ""} ${error && "error"}`}>
			<div>
				{label && <label htmlFor={id}>{label}</label>}
				<div className="relative">
					<input type={showPassword ? "text" : "password"} id={id} {...props} />
					<span className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
						{showPassword ? (
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-gray-700" viewBox="0 0 24 24">
								<path d="M12 4c-7 0-12 8-12 8s5 8 12 8 12-8 12-8-5-8-12-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm0-10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
							</svg>
						) : (
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-gray-700" viewBox="0 0 24 24">
								<path d="M12 4c-7 0-12 8-12 8s5 8 12 8c1.1 0 2.2-.2 3.3-.5l-1.6-1.6c-.6.1-1.2.1-1.7.1-3.3 0-6-2.7-6-6 0-.5 0-1 .1-1.6l-1.7-1.7c-.4.9-.6 2-.6 3.3 0 3.5 2.1 6.5 5.1 8.1l-1.5 1.5c-.9-.4-1.8-.8-2.6-1.4-1.6-1-3-2.3-4.1-3.8-1.1-1.5-1.8-3.1-1.8-3.1s5-8 12-8c1.1 0 2.2.2 3.3.5l-1.5 1.5c-.6-.1-1.2-.1-1.7-.1zm10 8c0 .4-.2 1.1-.6 1.9l-1.6-1.6c.1-.6.2-1.2.2-1.8 0-3.3-2.7-6-6-6-.6 0-1.2.1-1.8.2l-1.6-1.6c.9-.4 1.6-.6 1.9-.6 7 0 12 8 12 8zm-12 2c1.1 0 2-.9 2-2s-.9-2-2-2v4z" />
							</svg>
						)}
					</span>
				</div>
			</div>
			{error && <p className="text-xxs mt-[2px] text-accent">{error}</p>}
		</div>
	);
};
