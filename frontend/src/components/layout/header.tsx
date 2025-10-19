import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import SearchInput from "../ui/search-input";
import MobileSearch from "./mobile-search";

const Header = () => {
	return (
		<header className="bg-background text-foreground border-b sticky top-0 z-50">
			{/* Container */}
			<div className="container py-4 flex justify-between items-center">
				{/* Left Side */}
				<div className="flex gap-2 md:gap-4 items-center">
					{/* Open Sidebar Button On Mobile */}
					<Button variant="ghost" size={"icon-sm"} className="md:hidden">
						<Menu />
					</Button>
					{/* LOGO */}
					<Link href="/">
						<h1 className="text-primary font-bold text-3xl">EduMarket</h1>
					</Link>
					{/* Search Bar On Desktop */}
					<SearchInput className="hidden md:flex w-sm lg:w-lg" />
				</div>
				{/* Right Side On Desktop (AUTH) */}
				<div className="hidden md:flex gap-4">
					{/* Login */}
					<Button asChild>
						<Link href="/login">Login</Link>
					</Button>
					{/* Sign Up */}
					<Button asChild>
						<Link href="/signup">Sign Up</Link>
					</Button>
				</div>
				{/* Right Side On Mobile (SEARCH) */}
				<div className="md:hidden">
					<MobileSearch />
				</div>
			</div>
		</header>
	);
};

export default Header;
