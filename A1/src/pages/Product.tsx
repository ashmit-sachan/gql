// Product.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { StarRating } from "star-rating-react-ts";
import api from '../api';
import Cookies from 'js-cookie';
import ProductReview from '../components/ProductReview';
import WriteReviewModal from '../components/WriteProductReview';
import { toast } from 'react-toastify';

interface ProductData {
    id: number;
    name: string;
    img: string;
    price: number;
    qty: number;
    special: boolean;
    createdAt: string;
    Reviews: Array<{
        id: number;
        rating: number;
        review: string;
        userId: string;
        createdAt: string;
    }>;
}

const Product: React.FC = () => {
    const [product, setProduct] = useState<ProductData | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState(null);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(event.target.value));
    };

    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const productId = searchParams.get('id');

        if (productId) {
            const fetchProduct = async () => {
                try {
                    const response = await api.get(`/products/${productId}`);
                    setProduct(response.data.product);
                } catch (error) {
                    console.error('Failed to fetch product data:', error);
                }
            };

            fetchProduct();
        }
    }, [location.search]);

    const handleAddToCart = () => {
        const userId = Cookies.get('user');
        const searchParams = new URLSearchParams(location.search);
        const productId = searchParams.get('id');

        api.post('/carts/place', { productId, userId, quantity })
            .then(response => {
                toast.success(product?.name + ' added to cart');
                console.log('Product added to cart:', response.data);
            })
            .catch(error => {
                console.error('Failed to add product to cart:', error);
            });
    };

    const handleWriteReview = () => {
        setIsModalOpen(true);
    };

    const handleEditReview = (review: any) => {
        setCurrentReview(review);
        setIsEditModalOpen(true);
    };

    const handleReviewSubmitted = (newReview: any) => {
        setProduct((prevProduct) => {
            if (prevProduct) {
                return {
                    ...prevProduct,
                    Reviews: [...prevProduct.Reviews, newReview],
                };
            }
            return prevProduct;
        });
    };

    const handleReviewUpdated = (updatedReview: any) => {
        setProduct((prevProduct) => {
            if (prevProduct) {
                const updatedReviews = prevProduct.Reviews.map((review) =>
                    review.id === updatedReview.id ? updatedReview : review
                );
                return {
                    ...prevProduct,
                    Reviews: updatedReviews,
                };
            }
            return prevProduct;
        });
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="font-sans">
            <div className="p-6 lg:max-w-6xl max-w-2xl mx-auto">
                <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="w-full top-0 sm:flex gap-2">
                        <img src={product.img} alt={product.name} className="w-4/5 rounded object-cover" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-800">{product.name}</h2>
                        <div className="flex flex-wrap gap-4 mt-4">
                            <p className="text-gray-800 text-xl font-bold">${product.price}</p>
                            <p className="text-gray-400 text-xl">
                                <span className="text-sm ml-1">Tax included</span>
                            </p>
                        </div>
                        <div className="flex space-x-2 mt-4">
                            <div className="flex items-center mt-2.5 mb-5">
                                <StarRating
                                    initialRating={product.Reviews.reduce((acc, review) => acc + review.rating, 0) / product.Reviews.length}
                                    readOnly={true}
                                    numStars={5}
                                    theme={{
                                        colors: {
                                            backgroundDefault: 'lightgray',
                                            backgroundColorActive: '#009e6c',
                                            backgroundColorHover: '#009e6c'
                                        },
                                        size: 25
                                    }}
                                />
                                <span className="bg-blue-100 text-green-600 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
                                    {isNaN(product.Reviews.reduce((acc, review) => acc + review.rating, 0) / product.Reviews.length) ? 
                                    "Not Reviewed yet" : product.Reviews.reduce((acc, review) => acc + review.rating, 0) / product.Reviews.length}
                                </span>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-center">
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="w-16 h-12 text-center border rounded-lg px-2 py-1 mr-2"
                            />
                            <button onClick={handleAddToCart} type="button" className="w-full px-4 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded">
                                Add to cart
                            </button>
                        </div>
                        <div className="mt-8 flex">
                            <button onClick={handleWriteReview} type="button" className="w-full px-4 py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded">
                                Write a Review
                            </button>
                        </div>
                    </div>
                </div>
                {product.Reviews.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-semibold text-gray-800">Reviews:</h2>
                        {product.Reviews.map((review) => (
                            <ProductReview key={review.id} review={review} onEditReview={handleEditReview} />
                        ))}
                    </div>
                )}
            </div>
            <WriteReviewModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                product={{ id: product.id, name: product.name, img: product.img }}
                onReviewSubmitted={handleReviewSubmitted}
            />
            {currentReview && (
                <WriteReviewModal
                    isOpen={isEditModalOpen}
                    onRequestClose={() => setIsEditModalOpen(false)}
                    product={{ id: product.id, name: product.name, img: product.img }}
                    review={currentReview}
                    onReviewUpdated={handleReviewUpdated}
                />
            )}
        </div>
    );
};

export default Product;
