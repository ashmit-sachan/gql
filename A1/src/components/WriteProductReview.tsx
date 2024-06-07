// WriteReviewModal.tsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { StarRating } from 'star-rating-react-ts';
import api from '../api';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

interface WriteReviewModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    product: {
        id: number;
        name: string;
        img: string;
    };
    review?: {
        id: number;
        rating: number;
        review: string;
        userId: string;
    };
    onReviewSubmitted?: (review: any) => void;
    onReviewUpdated?: (review: any) => void;
}

const WriteReviewModal: React.FC<WriteReviewModalProps> = ({ isOpen, onRequestClose, product, review, onReviewSubmitted, onReviewUpdated }) => {
    const [rating, setRating] = useState(review ? review.rating : 0);
    const [reviewText, setReviewText] = useState(review ? review.review : '');

    useEffect(() => {
        if (review) {
            setRating(review.rating);
            setReviewText(review.review);
        }
    }, [review]);

    const handleSubmitReview = async () => {
        const userId = Cookies.get('user');
        const reviewData = {
            rating,
            review: reviewText,
            productId: product.id,
            userId,
        };

        try {
            if (review) {
                const response = await api.patch(`/reviews/edit/${review.id}`, reviewData);
                toast.success('Review updated successfully');
                onReviewUpdated && onReviewUpdated(response.data.review);
            } else {
                const response = await api.post('/reviews/create', reviewData);
                toast.success('Review submitted successfully');
                onReviewSubmitted && onReviewSubmitted(response.data.review);
            }
            onRequestClose();
        } catch (error) {
            console.error('Failed to submit review:', error);
            toast.error('Failed to submit review');
        }
    };

    const customStyles = {
        content: {
            width: '90%',
            maxWidth: '786px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '8px',
            overflow: 'auto',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Write a Review"
            style={customStyles}
            ariaHideApp={false}
        >
            <h2 className="text-2xl font-semibold text-gray-800">{review ? 'Edit Review' : 'Write a Review'}</h2>
            <div className="mt-4">
                <img src={product.img} alt={product.name} className="w-24 h-24 object-cover rounded" />
                <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
            </div>
            <div className="mt-4">
                <StarRating
                    initialRating={rating}
                    onClick={(rate) => setRating(rate)}
                    numStars={5}
                    theme={{
                        colors: {
                            backgroundDefault: 'lightgray',
                            backgroundColorActive: '#009e6c',
                            backgroundColorHover: '#275ed8'
                        },
                        size: 30
                    }}
                />
            </div>
            <div className="mt-4">
                <textarea
                    className="w-full p-2 border rounded-lg"
                    rows={5}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your review here..."
                />
            </div>
            <div className="mt-4 flex justify-end">
                <button onClick={onRequestClose} className="mr-2 px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                <button onClick={handleSubmitReview} className="px-4 py-2 bg-green-600 text-white rounded-lg">{review ? 'Update' : 'Submit'}</button>
            </div>
        </Modal>
    );
};

export default WriteReviewModal;
