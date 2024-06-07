// CartItem.tsx
import React from 'react';
import api from '../api';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

interface CartItemProps {
    item: {
        id: number;
        productId: number;
        userId: string;
        quantity: number;
        Product: {
            id: number;
            name: string;
            img: string;
            price: number;
            special: boolean;
        };
    };
    onRemove: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
    const { Product, quantity } = item;

    const handleRemove = () => {
        const userId = Cookies.get('user');
        api.post('/carts/remove', { productId: Product.id, userId })
            .then(response => {
                onRemove(Product.id);
                toast.success(Product.name + ' removed from cart');
                console.log('Product removed from cart:', response.data);
            })
            .catch(error => {
                console.error('Failed to remove product from cart:', error);
            });
    };

    return (
        <div className="flex justify-between items-start border-b pb-4">
            <div className="flex space-x-4">
                <img src={Product.img} alt={Product.name} className="w-24 h-24 object-cover" />
                <div>
                    <h2 className="font-semibold">{Product.name}</h2>
                    {Product.special && <span className="font-semibold text-xs text-yellow-700">(Special)</span>}
                </div>
            </div>
            <div className="text-right">
                <p className="text-lg font-semibold">{quantity} x ${Product.price.toFixed(2)}</p>
                <button className="text-green-600 hover:text-green-700 mt-1" onClick={handleRemove}>Remove</button>
            </div>
        </div>
    );
};

export default CartItem;
