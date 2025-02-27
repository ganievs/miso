import * as Ariakit from "@ariakit/react";
import { startTransition, useState } from "react";
import "./style.css";
import { Module } from "../../Modules/types.ts";
import Fuse from "fuse.js";
import { Link } from "@tanstack/react-router";

interface SearchProps {
  options: Module[];
}

export const Search: React.FC<SearchProps> = ({ options }) => {
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
    <Ariakit.ComboboxProvider
      setValue={(value) => {
        startTransition(() => handleSearch(value));
      }}
    >
      <Ariakit.Combobox
        placeholder="Search the providers,modules…"
        className="combobox"
      />
      <Ariakit.ComboboxPopover gutter={8} sameWidth className="popover">
        {results.length ? (
          results.map((value) => (
            <Ariakit.ComboboxItem
              key={value.id}
              value={value.name}
              render={<Link to="/modules" />}
              className="combobox-item"
            />
          ))
        ) : (
          <div className="no-results">No results found</div>
        )}
      </Ariakit.ComboboxPopover>
    </Ariakit.ComboboxProvider>
  );
}

