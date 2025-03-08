import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const RecommendationsIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
		<path d="M232,96a7.89,7.89,0,0,0-.3-2.2L217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.8A7.89,7.89,0,0,0,24,96v16a40,40,0,0,0,16,32v64a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V144a40,40,0,0,0,16-32ZM54,48H202l11.42,40H42.61Z"></path>
	</svg>
);

const BooksIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
		<path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15Z"></path>
	</svg>
);

const AddBookIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
		<path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
	</svg>
);

const SettingsIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
		<path d="M240.58,131.39l-23.42-9a83.38,83.38,0,0,0,0-18.8l23.42-9a8,8,0,0,0,4.91-10.15,114.85,114.85,0,0,0-12.87-31,8,8,0,0,0-10.33-3.22l-23.43,9a83.4,83.4,0,0,0-16.3-9.41l-3.46-24a8,8,0,0,0-8-6.83H98.9a8,8,0,0,0-8,6.83l-3.46,24a83.4,83.4,0,0,0-16.3,9.41l-23.43-9A8,8,0,0,0,37.4,54.41a114.85,114.85,0,0,0-12.87,31,8,8,0,0,0,4.91,10.15l23.42,9a83.38,83.38,0,0,0,0,18.8l-23.42,9a8,8,0,0,0-4.91,10.15,114.85,114.85,0,0,0,12.87,31,8,8,0,0,0,10.33,3.22l23.43-9a83.4,83.4,0,0,0,16.3,9.41l3.46,24a8,8,0,0,0,8,6.83h58.2a8,8,0,0,0,8-6.83l3.46-24a83.4,83.4,0,0,0,16.3-9.41l23.43,9a8,8,0,0,0,10.33-3.22,114.85,114.85,0,0,0,12.87-31A8,8,0,0,0,240.58,131.39ZM128,152a24,24,0,1,1,24-24A24,24,0,0,1,128,152Z"></path>
	</svg>
);

const LogoutIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor">
		<path d="M15.75 16.5a.75.75 0 0 1 0-1.5h3.69l-1.72-1.72a.75.75 0 1 1 1.06-1.06l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72h-3.69ZM10.5 4.5a.75.75 0 0 1 .75.75v2.75h3.5a.75.75 0 0 1 0 1.5h-3.5v5h3.5a.75.75 0 0 1 0 1.5h-3.5v2.75a.75.75 0 0 1-1.5 0v-12a.75.75 0 0 1 .75-.75ZM3 12a9 9 0 1 1 18 0 .75.75 0 0 1-1.5 0 7.5 7.5 0 1 0-15 0 .75.75 0 0 1-1.5 0Z" />
	</svg>
);

const UserIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
		<path d="M128,128a40,40,0,1,0-40-40A40,40,0,0,0,128,128Zm0,16c-44.18,0-80,35.82-80,80a8,8,0,0,0,16,0c0-35.35,28.65-64,64-64s64,28.65,64,64a8,8,0,0,0,16,0C208,179.82,172.18,144,128,144Z"></path>
	</svg>
);

// const LoginIcon = UserIcon;

const navItems = [
	{ label: "Recommendations", icon: RecommendationsIcon, link: "/recommendations" },
	{ label: "Books", icon: BooksIcon, link: "/books" },
	{ label: "Add Book", icon: AddBookIcon, link: "/books/add" },
	{ label: "Preference Setting", icon: SettingsIcon, link: "/preferences" },
	// { label: "Login", icon: LoginIcon, link: "/login" },
];

function Navbar() {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem("authToken");
		localStorage.removeItem("username");
		localStorage.removeItem("isAdmin");
		router.push("/login");
	};

	useEffect(() => {
		const storedUsername = localStorage.getItem("username") || "Guest";
		const storedIsAdmin = JSON.parse(localStorage.getItem("isAdmin") || "false");
		setUsername(storedUsername);
		setIsAdmin(storedIsAdmin);
	}, []);

	return (
		<div className="layout-content-container flex flex-col xl:min-w-[260px]">
			<div className="flex h-screen flex-col justify-between bg-main p-4 rounded-tr-xl rounded-br-xl sticky top-0">
				<div className="flex flex-col gap-2">
					<h4 className="text-lg font-bold mt-1 tracking-wide bg-gradient-to-br from-blue-500 to-purple-500 text-transparent bg-clip-text hidden lg:block">Books App</h4>
					<div className="w-full h-[2px] rounded-full bg-main-2"></div>
					{navItems
						.filter(({ label }) => isAdmin || label !== "Add Book")
						.map(({ label, icon: Icon, link }) => (
							<Link href={link} key={label} className={`flex items-center gap-3 px-3 py-[6px] rounded-xl ${router.pathname === link ? "bg-main-3 text-primary" : "hover:bg-main-2"} transition-colors font-medium`}>
								<Icon />
								<p className="text-xs hidden lg:block">{label}</p>
							</Link>
						))}
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-3 px-3 py-[6px] rounded-xl hover:bg-main-2 transition-colors font-medium cursor-pointer" onClick={handleLogout}>
						<LogoutIcon />
						<p className="text-xs hidden lg:block">Logout</p>
					</div>
					<div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-main-2">
						<UserIcon />
						<p className="text-xs hidden lg:block">{username}</p>
					</div>
					<p className="text-xxs text-center"> login as admin to add books</p>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
