import React, { useState } from 'react';
import { SearchEngine, Input, Button } from './styles';

export default function Search({ value, handleClick }) {
  const [searchText, setSearchText] = useState(value);

  // Save Local input state
  const handleChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
  }

  // Passing the search Text to the parent component
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick(searchText);
  }

  return (
    <SearchEngine>
      <form onSubmit={handleSubmit}>
        <Input type="text" placeholder="search with company" value={searchText} required onChange={handleChange} />
        <Button type="submit">Search Company</Button>
      </form>
    </SearchEngine>
  )
}