"use client";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "../ui/button";
import SearchInput from "../ui/search-input";
import { useState } from "react";

const MobileSearch = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{isOpen && (
				<div
					role="dialog"
					aria-modal="true"
					className="absolute inset-0 h-dvh bg-background"
				>
					<div className="container py-4">
						<div className="flex items-center gap-1">
							<Button
								onClick={() => setIsOpen(false)}
								variant="ghost"
								size={"icon-sm"}
								aria-label="close search"
							>
								<ArrowLeft />
							</Button>
							<SearchInput
								callback={() => setIsOpen(false)}
								className="w-full"
							/>
						</div>
					</div>
				</div>
			)}
			<Button onClick={() => setIsOpen(true)} variant="ghost" size={"icon-sm"}>
				<Search />
			</Button>
		</>
	);
};

export default MobileSearch;
