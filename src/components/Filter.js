import React, { useState } from 'react';
// import styles from '../styles/Filters.css';
import { useSelector, useDispatch } from 'react-redux';
import { togglePopup } from '../features/catalog/catalogSlice';
import { IoMdClose } from "react-icons/io";


const Filters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    gender: [],
    color: [],
    priceRange: [],
    type: [],
  });

  //For Color data
  const colors = [
    'Blue',
    'Green',
    'Red'
  ]
  //For Gender data
  const gender = [
    'Men',
    'Women'
  ]

  //For Type data
  const type = [
    'Polo',
    'Hoodie',
    'Basic'
  ]

  //For Price Data

  const price = [
    '0-250',
    '251-450',
  ]


  const isOpen = useSelector(state => state.catalog.isOpen);
  const dispatch = useDispatch();


  const handleCheckboxChange = (category, value) => {
    setFilters(prevFilters => {
      // Check if the value is already selected
      const isSelected = prevFilters[category].includes(value);
  
      if (isSelected) {
        // If the value is already selected, remove it from the array
        return {
          ...prevFilters,
          [category]: prevFilters[category].filter(item => item !== value),
        };
      } else {
        // If the value is not selected, add it to the array
        return {
          ...prevFilters,
          [category]: [...prevFilters[category], value],
        };
      }
    });
  };
  

  const handleFilter = () => {
    onFilter(filters);
  };

  const handleClearFilter = () =>{
      setFilters(
        {
        gender: [],
        color: [],
        priceRange: [],
        type: [],
        }
      );
  }


  return (
    <>
      <div className="filters">
        <h2>Filters</h2>
        {/* Gender Data Check */}
        <div className="filter-data">
          <h3>Gender:</h3>
          {gender.map((item, index) => {
            return (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={filters.gender.includes(item)}
                  onChange={() => handleCheckboxChange('gender', item)}
                />
                {item}
              </label>
            );
          })}
        </div>
        {/* Colors Data Check */}
        <div className="filter-data">
          <h3>Color:</h3>
          {colors.map((item, index) => {
            return (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={filters.color.includes(item)}
                  onChange={() => handleCheckboxChange('color', item)}
                />
                {item}
              </label>
            );
          })}
        </div>

        {/* Price-range Data Check */}
        <div className="filter-data">
          <h3>Price Range:</h3>
          {price.map((item, index) => {
            // Splitting the item to get the lower and upper bounds
            const [lowerBound, upperBound] = item.split('-');
            // Format the label
            const label = upperBound ? `Rs.${lowerBound} - Rs.${upperBound}` : `Rs.${lowerBound}`;
            return (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={filters.priceRange.includes(item)}
                  onChange={() => handleCheckboxChange('priceRange', item)}
                />
                {label}
              </label>
            )
          })}

        </div>


        {/* Product Type Data Check */}
        <div className="filter-data">
          <h3>Type:</h3>
          {type.map((item, index) => {
            return (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={filters.type.includes(item)}
                  onChange={() => handleCheckboxChange('type', item)}
                />
                {item}
              </label>
            );
          })}

        </div>
        <button onClick={handleFilter} style={{margin:'0px 5px'}}>Apply</button>
        <button onClick={handleClearFilter} style={{margin:'0px 5px'}}>Clear</button>
      </div>

      {/*  When togglePopup(isOpen) is true, this component will be display */}
      {isOpen && (
        <div className="popup">
          <IoMdClose className="popupClose" onClick={() => dispatch(togglePopup())} />
          <div className="popupContent">
            <h2>Filters</h2>
            <div className='flex-format'>
              <div className='flex-format-data'>
                {/* Popup Gender data */}
                <div className="filter-data">
                  <h3>Gender:</h3>
                  {gender.map((item, index) => {
                    return (
                      <label key={index}>
                        <input
                          type="checkbox"
                          checked={filters.gender === item}
                          onChange={() => handleCheckboxChange('gender', item)}
                        />
                        {item}
                      </label>
                    );
                  })}
                </div>
                {/* Popup Color data */}
                <div className="filter-data">
                  <h3>Color:</h3>
                  {colors.map((item, index) => {
                    return (
                      <label key={index}>
                        <input
                          type="checkbox"
                          checked={filters.color === item}
                          onChange={() => handleCheckboxChange('color', item)}
                        />
                        {item}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Popup Price-range data */}
              <div className='flex-format-data'>
                <div className="filter-data">
                  <h3>Price Range:</h3>
                  {price.map((item, index) => {
                    // Splitting the item to get the lower and upper bounds
                    const [lowerBound, upperBound] = item.split('-');
                    // Format the label
                    const label = upperBound ? `Rs.${lowerBound} - Rs.${upperBound}` : `Rs.${lowerBound}`;
                    return (
                      <label key={index}>
                        <input
                          type="checkbox"
                          checked={filters.priceRange === item}
                          onChange={() => handleCheckboxChange('priceRange', item)}
                        />
                        {label}
                      </label>
                    )
                  })}
                </div>
                {/* Popup Type data */}
                <div className="filter-data">
                  <h3>Type:</h3>
                  {type.map((item, index) => {
                    return (
                      <label key={index}>
                        <input
                          type="checkbox"
                          checked={filters.type === item}
                          onChange={() => handleCheckboxChange('type', item)}
                        />
                        {item}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* Popup Apply button */}
          <div className="popup-apply">
            <button
              className='popup-apply-button'
              onClick={() => {
                handleFilter()
                dispatch(togglePopup());
              }}>Apply Filters</button>

           
          </div>

        </div>
      )}

    </>
  );
};

export default Filters;