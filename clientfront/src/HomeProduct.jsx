import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';

export default function HomeProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchHomeProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/products/category/home');
                if (!response.ok) {
                    throw new Error('Failed to fetch home products');
                }
                const homeProducts = await response.json();
                setProducts(homeProducts);
            } catch (error) {
                console.error('Error fetching home products:', error);
            }
        };

        fetchHomeProducts();
    }, []);

    const categories = ['plant','basket','decoration','other'];
    return (
        <div>
            <ProductList products={products} title="Home's Products" categories={categories} />
        </div>
    );
}

