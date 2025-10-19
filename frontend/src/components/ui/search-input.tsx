"use client";
import { Search } from "lucide-react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "./input-group";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "./label";

interface SearchInputProps extends React.ComponentProps<"form"> {
	callback?: () => void;
}

const SearchInput = ({ className, callback }: SearchInputProps) => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const searchAction = (formData: FormData) => {
		const query = formData.get("query");
		router.push(`/search?query=${query}`);
		if (callback) {
			callback();
		}
	};

	return (
		<form action={searchAction} className={cn(className)}>
			<InputGroup className="rounded-full w-full">
				<Label htmlFor="query" className="sr-only">
					Search
				</Label>
				<InputGroupInput
					name="query"
					id="query"
					placeholder="What do you want to learn?"
					defaultValue={searchParams.get("query") || ""}
				/>
				<InputGroupAddon align="inline-end">
					<InputGroupButton
						variant={"default"}
						size={"icon-xs"}
						className="rounded-full size-7"
						type="submit"
					>
						<Search />
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</form>
	);
};

export default SearchInput;
