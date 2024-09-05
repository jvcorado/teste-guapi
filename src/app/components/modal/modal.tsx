'use client';

import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { AlignVerticalSpaceAround, FolderOpen, X } from 'lucide-react';
import Input from '../input/input';

export function Modal({
    open,
    cancel,
    create,
    children,
    title = 'Novo Projeto',
    subtitle,
}: {
    open: boolean;
    cancel: () => void;
    create: () => void;
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
}) {
    return (
        <Dialog open={open} handler={cancel} className="" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <DialogHeader
                className="font-semibold text-sm flex items-center justify-between border-b-2"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            >
                <div className="flex items-center gap-2 text-[#444648]">
                    <FolderOpen size={24} />
                    {subtitle ? (
                        <p className="flex items-center gap-2 text-sm">
                            {' '}
                            {title} / <AlignVerticalSpaceAround size={24} /> {subtitle}
                        </p>
                    ) : (
                        <p> {title}</p>
                    )}
                </div>
                <button onClick={cancel}>
                    <X size={24} color="#444648" />
                </button>
            </DialogHeader>
            <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {children}
            </DialogBody>
            <DialogFooter className="border-t-2 flex items-center gap-5" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <button onClick={cancel} className="text-[#444648] text-sm">
                    Cancelar
                </button>
                <button onClick={create} className="text-white px-[5px] py-[10px] rounded w-[30%] bg-[#7C00BE] text-sm">
                    Criar
                </button>
            </DialogFooter>
        </Dialog>
    );
}
