import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { EllipsisVertical, FolderOpen, Pencil, X } from "lucide-react";

import { Trash2 } from "lucide-react";
import { DropdownMenu } from "@radix-ui/themes";

export function ModalCrud({
  open,
  cancel,
  deletar,
  update,
}: {
  open?: boolean;
  cancel?: () => void;
  deletar?: () => void;
  update?: () => void;
}) {
  return (
    /*   <>
      <div
        className="absolute bottom-3 right-3 flex flex-col gap-3 bg-red-300"
        onClick={() => {
          open;
          cancel;
        }}
      >
        <button
          onClick={update}
          className="text-[#444648] text-sm flex items-center gap-2"
        >
          <Pencil size={24} /> Editar
        </button>
        <button
          onClick={deletar}
          className="text-[#444648] text-sm flex items-center gap-2"
        >
          <Trash2 size={24} color="red" /> Deletar
        </button>
      </div>
    </> */

    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <EllipsisVertical size={24} color="#444648" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
        <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>

        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
            <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

            <DropdownMenu.Separator />
            <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Separator />
        <DropdownMenu.Item>Share</DropdownMenu.Item>
        <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
