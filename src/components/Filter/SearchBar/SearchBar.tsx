import { useState } from 'react';
import { TextField } from '@mui/material';

const SearchBar = () => {
  const [search, setSearch] = useState<string>('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <TextField
      size="small"
      value={search}
      type="text"
      name="search-bar"
      id="search-bar"
      helperText="not working"
      onChange={handleOnChange}
    />
  );
};

export default SearchBar;
