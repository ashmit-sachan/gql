interface CartItemProps {
    item: {
        imageUrl: string;
        name: string;
        color: string;
        size: string;
        quantity: number;
        stockStatus: string;
        price: number;
    };
}

function CartItem(props: CartItemProps) {
    const { item } = props;

    return (
        <div className="flex justify-between items-start border-b pb-4">
            <div className="flex space-x-4">
                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover" />
                <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-zinc-600">{item.color}</p>
                    <p className="text-sm text-zinc-600">{item.size}</p>
                    <p className="text-sm text-green-500 flex items-center mt-1">
                        <svg className="w-4 h-4 mr-1 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7.629 14.571L3.149 10.09l1.414-1.414 3.066 3.066 5.656-5.657 1.415 1.415-7.071 7.072z" /></svg>
                        {item.stockStatus}
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-lg font-semibold">{item.quantity + ` x ` + `$` + item.price.toFixed(2)}</p>
                <button className="text-green-600 hover:text-green-700 mt-1">Remove</button>
            </div>
        </div>
    );
}

export default CartItem;
