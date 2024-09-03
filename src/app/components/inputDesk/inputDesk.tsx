import React from 'react';
import Input from '../input/input';

export default function InputDesk({
    create,
    onChange,
    cancel,
    noBorder,
    key,
    placeholder,
}: {
    create: () => void;
    onChange: (e: any) => void;
    cancel: () => void;
    key?: number;
    noBorder?: boolean;
    placeholder?: string;
}) {
    return (
        <div key={key} className=" flex flex-col gap-[10px]">
            <Input onChange={onChange} noBorder={noBorder} placeholder={placeholder} />
            <div className="flex items-center gap-3">
                <button onClick={create} className="bg-[#7C00BE] w-20 h-8 text-white text-xs font-normal rounded">
                    Adicionar
                </button>
                <button onClick={cancel} className="text-[#656565] text-xs font-normal">
                    Cancelar
                </button>
            </div>
        </div>
    );
}
