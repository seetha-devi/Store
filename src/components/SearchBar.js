import React, { useState } from 'react';
import { GoSearch } from "react-icons/go";
import { FaFilter } from "react-icons/fa";
import { togglePopup } from '../features/catalog/catalogSlice'
import { useDispatch } from 'react-redux';
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="searchBar">
      <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search for products..." className="searchInput" />
      <button type="submit" className="searchBar-icons" ><GoSearch  /></button>
      <button onClick={() =>{dispatch(togglePopup())}} className="searchBar-icons"><FaFilter /></button>
      <button type="submit" className="searchButton">Search</button>
    </form>
  );
};

export default SearchBar;
