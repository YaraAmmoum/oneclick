import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';

export default function SkinCare() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchskinProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/products/category/skincare');
                if (!response.ok) {
                    throw new Error('Failed to fetch men products');
                }
                const menProducts = await response.json();
                setProducts(menProducts);
            } catch (error) {
                console.error('Error fetching men products:', error);
            }
        };

        fetchskinProducts();
    }, []);

    const categories = ['sunblock','cream','serum','mask','makeup remover','other'];

    return (
        <div>
            <ProductList products={products} title="Skin's Products" categories={categories} />
        </div>
    );
}

