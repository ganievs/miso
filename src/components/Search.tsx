import {
  Combobox,
  ComboboxItem,
  ComboboxList,
  ComboboxProvider,
} from "@ariakit/react";
import * as RadixPopover from "@radix-ui/react-popover";
import { useRef, useState } from "react";
import { Module } from "../Modules/types";
import Fuse from "fuse.js";
import "./style.css";

interface SearchProps {
  options: Module[];
}

export const Search: React.FC<SearchProps> = ({ options }) => {
  const comboboxRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<Module[]>([]);

  const fuse = new Fuse(options, {
    keys: ['name'],
    threshold: 0.3,
  });

  const handleSearch = (value: string) => {
    const searchResults = fuse.search(value);
    setResults(searchResults.map(result => result.item));
    console.log(searchResults);
  };

  return (
    <RadixPopover.Root open={open} onOpenChange={setOpen}>
      <ComboboxProvider open={open} setOpen={setOpen}>
        <RadixPopover.Anchor asChild>
          <Combobox
            ref={comboboxRef}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
            placeholder="Search the providers,modules…"
            className="combobox"
          />
        </RadixPopover.Anchor>
        <RadixPopover.Content
          asChild
          sideOffset={8}
          onOpenAutoFocus={(event) => event.preventDefault()}
          onInteractOutside={(event) => {
            const target = event.target as Element | null;
            const isCombobox = target === comboboxRef.current;
            const inListbox = target && listboxRef.current?.contains(target);
            if (isCombobox || inListbox) {
              event.preventDefault();
            }
          }}
        >
        {results.length > 0 && (
          <ComboboxList ref={listboxRef} role="listbox" className="listbox">
            {
              results.map((option) => (
                <ComboboxItem focusOnHover value={option.id}>
                  {option.name}
                </ComboboxItem>
              ))
            }
          </ComboboxList>
        )}
        </RadixPopover.Content>
      </ComboboxProvider>
    </RadixPopover.Root>
  );
}

