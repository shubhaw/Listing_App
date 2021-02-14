import React from 'react';
import './SearchBar.css';
import {useRef} from 'react';

const SearchBar = (props) => {
  const inputRef = useRef(null);
  const inputHandler = (e) => {
    e.preventDefault();
    const searchItem = inputRef.current.value
    props.onChange(searchItem)
  }
  return (
      <form onSubmit={inputHandler} className="Search">
       <input ref={inputRef} className="product_input" type="text" name="product"
          placeholder="Search Product..." />
    </form>
  );
}

export default SearchBar