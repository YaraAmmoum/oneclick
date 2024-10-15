import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';

export default function EleProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchEleProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/products/category/ele');
                if (!response.ok) {
                    throw new Error('Failed to fetch electronic products');
                }
                const electronicProducts = await response.json();
                setProducts(electronicProducts);
            } catch (error) {
                console.error('Error while fetching electronic products:', error);
            }
        };

        fetchEleProducts();
    }, []);

    const categories = ['airpods','tv','audio','keyboard','charger','other'];

    return (
        <div>
            <ProductList products={products} title="Electronic's Products" categories={categories} />
        </div>
    );
}
