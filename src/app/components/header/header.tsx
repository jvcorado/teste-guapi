import { FolderOpen } from "lucide-react";
import { Menus } from "../menu/menu";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white md:hidden w-full p-5 flex items-center justify-between border-b-2 shadow-lg">
      <Link href={"/"} className="flex gap-2 items-center">
        <FolderOpen size={24} color="#444648" />
        <p className="text-sm text-[#444648]">Meus Projetos</p>
      </Link>
      <Menus />
    </header>
  );
}
