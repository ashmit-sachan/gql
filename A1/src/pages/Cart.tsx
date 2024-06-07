import CartItem from '../components/CartItem';

const ShoppingCart = () => {
    const cartItems = [
        { id: 1, name: 'Artwork Tee', imageUrl: 'https://placehold.co/100x100', color: 'Mint', size: 'Medium', price: 32.00, quantity: 3.00, stockStatus: 'In stock' },
        { id: 2, name: 'Basic Tee', imageUrl: 'https://placehold.co/100x100', color: 'Charcoal', size: 'Large', price: 32.00, quantity: 2.00, stockStatus: 'Will ship in 7-8 years' },
        { id: 3, name: 'Basic Tee', imageUrl: 'https://placehold.co/100x100', color: 'Sienna', size: 'Large', price: 32.00, quantity: 1.00, stockStatus: 'In stock' },
    ];

    const calculateTotal = () => {
        let cartTotal: number = +cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);
        return (cartTotal * 1.12).toFixed(2);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            <div className="space-y-6">
                {cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
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
}

export default ShoppingCart;
