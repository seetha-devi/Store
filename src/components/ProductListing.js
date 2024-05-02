import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/catalog/catalogSlice';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import Filters from './Filter'; // Import the Filters component


const ProductListing = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.catalog);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    gender: '',
    color: '',
    priceRange: '',
    type: '',
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearch = query => {
    setSearchQuery(query.toLowerCase());
  };

  const handleFilter = selectedFilters => {
    setFilters(selectedFilters);
  };

  const checkPriceRange = (price, range) => {
    const [min, max] = range.split('-').map(Number);
    return min <= price && price <= max;
  };

  const filteredProducts = items.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery) ||
      product.color.toLowerCase().includes(searchQuery) ||
      product.type.toLowerCase().includes(searchQuery);

    const matchesFilters =
      (filters.gender.length === 0 || filters.gender.includes(product.gender)) &&
      (filters.color.length === 0 || filters.color.includes(product.color)) &&
      (filters.priceRange.length === 0 || filters.priceRange.some(range => checkPriceRange(product.price, range))) &&
      (filters.type.length === 0 || filters.type.includes(product.type));

    return matchesSearch && matchesFilters;
  });



  return (
    <div className="productListing">
      <SearchBar onSearch={handleSearch} />
      <div className="productLists">
        <div className="filters-section">
          <Filters onFilter={handleFilter} />
        </div>
        <div className="cards">
          {status === 'loading' && <p>Loading...</p>}
          {filteredProducts.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                fontSize: '32px',
                fontWeight: 'bold'
              }}
            >
              No Product Matched
            </p>
          ) : (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductListing;
