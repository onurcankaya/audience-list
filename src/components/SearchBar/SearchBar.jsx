import React from 'react'
import './SearchBar.css'

const SearchBar = ({ onTextChange, searchInput, isLoading }) => (
  <div className="search-input-wrapper">
    <div className="search-icon-wrapper">
      <img
        src="/assets/img/search.svg"
        alt="search-icon"
        width={16}
        height={16}
      />
    </div>
    <input
      className="search-input"
      onChange={onTextChange}
      value={searchInput}
      placeholder="Search for a name, company or email..."
      disabled={isLoading}
    />
  </div>
)

export default SearchBar
