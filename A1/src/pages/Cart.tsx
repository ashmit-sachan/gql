// ShoppingCart.tsx
import React, { useState, useEffect } from 'react';
import api from '../api';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import CartItem from '../components/CartItem';

const ShoppingCart: React.FC = () => {
    const [cartItems, setCartItems] = useState<any[]>([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            const userId = Cookies.get('user');
            try {
                const response = await api.get(`/carts/get?userId=${userId}`);
                setCartItems(response.data);
            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch cart items');
            }
        };

        fetchCartItems();
    }, []);

    const handleRemoveItem = (productId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.Product.id !== productId));
    };

    const calculateTotal = () => {
        const cartTotal: number = cartItems.reduce((acc, item) => acc + (item.Product.price * item.quantity), 0);
        return (cartTotal * 1.12).toFixed(2);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            <div className="space-y-6">
                {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} onRemove={handleRemoveItem} />
                ))}
            </div>
            <div className="mt-8">
                <div className="flex justify-between items-center font-semibold text-lg">
                    <p>Subtotal</p>
                    <p><span className="text-xs font-light">(Incl. 12% taxes)</span>  ${calculateTotal()}</p>
                </div>
            </div>
            <div className="mt-6">
                <button className="bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-700">Checkout</button>
            </div>
        </div>
    );
};

export default ShoppingCart;
