// Shop.tsx
import { useState, useEffect } from 'react';
import api from '../api';
import { toast } from 'react-toastify';
import ProductCard from '../components/ProductCard';

const Shop = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        api.get('/products/all')
            .then(response => {
                setData(response.data.products);
            })
            .catch(error => {
                console.error(error);
                toast.error('Failed to fetch products');
            });
    }, []);

    return (
        <>
            <div className="w-11/12 mx-auto mt-5 mb-8">
                <h1 className='font-semibold text-2xl'>Products</h1>
            </div>
            <div className="index grid grid-cols-1 gap-8 w-11/12 mx-auto mt-4 mb-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-items-center">
                {data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    );
};

export default Shop;
