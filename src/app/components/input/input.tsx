import { SearchIcon } from "lucide-react";
import React from "react";

export default function Input({ onChange }: { onChange: (e: any) => void }) {
  return (
    <div className="border rounded flex gap-2 items-center flex-row-reverse w-full size-10 py-[10px] px-[5px]">
      <input
        type="text"
        className="placeholder:text-[#8A8A8A] text-xs h-full outline-none w-full"
        placeholder="Digite aqui..."
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}
