import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';

export default function SportProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchSportProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/products/category/sport');
                if (!response.ok) {
                    throw new Error('Failed to fetch sport products');
                }
                const sportProducts = await response.json();
                setProducts(sportProducts);
            } catch (error) {
                console.error('Error fetching sport products:', error);
            }
        };

        fetchSportProducts();
    }, []);

    const categories = ['ball','helmet','bycycle','dumbbells','other'];
    return (
        <div>
            <ProductList products={products} title="Sport's Products" categories={categories} />
        </div>
    );
}
