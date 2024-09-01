import { SearchIcon } from "lucide-react";
import React from "react";

interface SearchProps {
  onSearch: (searchText: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  return (
    <div className="border rounded flex gap-2 items-center flex-row-reverse w-full size-10 py-[10px] px-[5px]">
      <input
        type="search"
        className="placeholder:text-[#8A8A8A] bg-transparent text-xs h-full outline-none w-full"
        placeholder="Faça sua busca..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <SearchIcon size={24} color="#8A8A8A" />
    </div>
  );
}
