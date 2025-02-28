import * as Ariakit from "@ariakit/react";
import { startTransition, useState } from "react";
import "./style.css";
import { Module } from "../../Modules/types.ts";
import { Provider } from "../../Providers/types.ts";
import Fuse from "fuse.js";
import { Link } from "@tanstack/react-router";

interface SearchProps {
  options: (Module | Provider)[];
}

const Output = (value: Module | Provider) => {
  if ('provider_logo_url' in value) {
    return (
      <Ariakit.ComboboxItem
        key={value.id}
        value={value.name}
        render={<Link to="/modules/$namespace/$moduleName/$provider" params={{ namespace: value.namespace, moduleName: value.name, provider: value.provider }} />}
        className="combobox-item"
      />
    )
  };

  if ('logo_url' in value) {
    return (
      <Ariakit.ComboboxItem
        key={value.id}
        value={value.name}
        render={<Link to="/providers/$namespace/$providerName" params={{ namespace: value.namespace, providerName: value.name }} />}
        className="combobox-item"
      />
    )
  };

  return null;

}
export const Search: React.FC<SearchProps> = ({ options }) => {
  const [results, setResults] = useState<Module[] | Provider[]>([]);

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
            <Output {...value} />
          ))
        ) : (
          <div className="no-results">No results found</div>
        )}
      </Ariakit.ComboboxPopover>
    </Ariakit.ComboboxProvider>
  );
}
