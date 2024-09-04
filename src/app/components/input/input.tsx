import React from 'react';

export default function Input({
    onChange,
    noBorder,
    placeholder = 'Digite aqui...',
    value,
}: {
    onChange: (e: any) => void;
    noBorder?: boolean;
    placeholder?: string;
    value?: string;
}) {
    return (
        <div className={`${noBorder ? 'border-none py-[3px]' : 'border py-[10px] size-10'}  rounded  flex gap-2 items-center flex-row-reverse w-full  px-[5px]`}>
            <input
                value={value}
                type="text"
                className="placeholder:text-[#8A8A8A] bg-transparent text-xs h-full outline-none w-full"
                placeholder={placeholder}
                onChange={(e) => onChange(e)}
            />
        </div>
    );
}
