import CartItem from '../components/CartItem';
import PaymentProfile from '../components/payment/PaymentProfile';
import ShippingAddress from '../components/payment/ShippingAddress';

function Payment() {
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
        <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 shadow-lg">
                    <ShippingAddress />
                    <PaymentProfile />
                    <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-4">Pay now</button>
                </div>
                <div className="bg-white p-8 shadow-lg">
                    <h2 className="font-bold text-lg mb-4">Order Details</h2>
                    {cartItems.map(item => (
                        <div className="my-3">
                            <CartItem key={item.id} item={item} />
                        </div>
                    ))}

                    <div className="mt-8">
                        <div className="flex justify-between items-center font-semibold text-lg">
                            <p>Subtotal</p>
                            <p><span className="text-xs font-light">(Incl. 12% taxes)</span>  ${calculateTotal()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;