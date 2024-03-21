"use client";

import { useState } from "react";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  let selected: CollectionType[] = [];
console.log(value,"values testing")
  if (value.length > 0 && collections) {
    selected = value
      .map((id) => collections.find((collection) => collection?._id === id))
      .filter((collection) => collection) as CollectionType[];
  }

  const selectables = collections?.filter(
    (collection) => !selected.includes(collection)
  );

  return (
    <div className="overflow-visible bg-white">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map((collection) => (
          <Badge key={collection._id}>
            {collection.title}
            <button type="button" className="ml-1 hover:text-red-1" onClick={() => onRemove(collection._id)}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <input
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          className="w-full p-2 rounded-md"
        />
      </div>

      <div className="relative mt-2">
        {open && (
          <div className="absolute w-full z-[9999] backdrop-blur top-0 overflow-auto border rounded-md shadow-md">
            {selectables?.map((collection) => (
              <div
                key={collection._id}
                className="p-2 hover:bg-grey-2 cursor-pointer"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(collection._id);
                  setInputValue("");
                }}
              >
                {collection.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;