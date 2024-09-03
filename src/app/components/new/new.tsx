"use client";

import { AlignVerticalSpaceAround, Plus, SquarePlus } from "lucide-react";
import React from "react";

export default function New({
  sm,
  section,
  subtarefa,
  open,
}: {
  sm?: boolean;
  section?: boolean;
  subtarefa?: boolean;
  open?: () => void;
}) {
  return (
    <button
      onClick={open}
      className={`${
        subtarefa
          ? "bg-transparent !px-0"
          : section
          ? "bg-[#ECD9F5] text-[#7C00BE]"
          : "bg-[#7C00BE] text-white"
      } ${
        sm ? "h-10 w-10 justify-center" : "size-full  gap-2 text-sm "
      } rounded flex items-center p-[10px]  `}
    >
      {sm && <Plus color="white" size={24} />}
      {!section && !sm && (
        <SquarePlus color={subtarefa ? "#7C00BE" : "white"} size={24} />
      )}
      {section && <AlignVerticalSpaceAround color="#7C00BE" size={24} />}
      {!sm && !section && !subtarefa && (
        <p className="text-white">Adicionar Tarefa</p>
      )}
      {section && <p className="text-[#7C00BE]">Adicionar Seção</p>}
      {subtarefa && <p className=" text-[#7C00BE]">Adicionar Subtarefa</p>}
    </button>
  );
}
