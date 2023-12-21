import { useState } from 'react';
import { TextField } from '@mui/material';

const SearchBar = () => {
  const [search, setSearch] = useState<string>('');

  return (
    <TextField size="small" value={search} type="text" name="search-bar" id="search-bar" helperText="not working" />
  );
};

export default SearchBar;
