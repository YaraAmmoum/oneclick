import React, { useState } from 'react';
import "./assets/styles/style.css";
const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);  
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="🔎"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search"
            />
        </form>
    );
};

export default SearchBar;
