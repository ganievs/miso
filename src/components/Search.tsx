import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Box, TextField } from '@radix-ui/themes';
import Fuse from 'fuse.js'
import { useState } from 'react';
import { Module } from '../Modules/types';


interface SearchProps {
  options: Module[];
}


export const Search: React.FC<SearchProps> = ({ options }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Module[]>([]);

  const fuse = new Fuse(options, {
    keys: ['name'],
    threshold: 0.3,
  });

  const handleSearch = (value: string) => {
    setQuery(value);
    const searchResults = fuse.search(value);
    setResults(searchResults.map(result => result.item));
    console.log(searchResults);
  };

  return (
    <>
      <TextField.Root size="3" placeholder="Search the providers,modules…"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
      {results.length > 0 && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          right="0"
        >
          {results.map((option, index) => (
            <Box
              key={index}
              onClick={() => {
                setQuery(option.name);
              }}
            >
              {option.name}
            </Box>
          ))}
        </Box>
      )}
    </>
  )
}


