import React, { useState } from 'react';
import api from '../api';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface Product {
    id: string;
    name: string;
    img: string;
    price: number;
    rating: number;
    special: boolean;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(event.target.value));
    };

    const handleAddToCart = () => {
        const userId = Cookies.get('user');
        const productId = product.id;

        api.post('/carts/place', { productId, userId, quantity })
            .then(response => {
                // Handle success
                toast.success(product.name + ' added to cart');
                console.log('Product added to cart:', response.data);
            })
            .catch(error => {
                // Handle error
                console.error('Failed to add product to cart:', error);
            });
    };
    
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <img className="p-8 pb-0 rounded-t-lg cursor-pointer" src={product.img} alt="product image" onClick={() => navigate(`/product?id=${product.id}`)}/>
            <div className="px-8 pb-5">
                <div className="flex items-center pb-3">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 mr-1">{product.name}</h5>
                    {product.special &&
                        <span className="font-semibold text-xs text-yellow-700">(Special)</span>}
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                    <div className="flex items-center">
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="w-16 h-10 text-center border rounded-lg px-2 py-1 mr-2"
                        />
                        <button className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleAddToCart}>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;


