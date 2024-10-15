import React, { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  const updateProductRating = (productId, newRating) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId ? { ...product, rating: newRating } : product
      )
    );
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, updateProductRating }}>
      {children}
    </ProductContext.Provider>
  );
}
