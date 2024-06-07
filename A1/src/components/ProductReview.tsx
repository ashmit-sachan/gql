// ProductReview.tsx
import React from 'react';
import { StarRating } from 'star-rating-react-ts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cookies from 'js-cookie';

interface Review {
    id: number;
    rating: number;
    review: string;
    userId: string;
    createdAt: string;
}

interface ProductReviewProps {
    review: Review;
    onEditReview: (review: Review) => void;
}

const ProductReview: React.FC<ProductReviewProps> = ({ review, onEditReview }) => {
    const handleEditClick = () => {
        onEditReview(review);
    };

    return (
        <article className="mt-8">
            <div className="flex items-center mb-4">
                <AccountCircleIcon fontSize='large' />
                <div className="flex font-medium ml-2">
                    <p>{review.userId}</p>
                    {(Cookies.get('user') === review.userId) && 
                        (<button onClick={handleEditClick} className="text-green-600 bg-gray-200 px-2 text-sm ml-2">Edit</button>)
                    }
                    
                </div>
            </div>
            <div className="items-center mb-1">
                <div className="flex items-center mt-2.5 mb-1">
                    <StarRating
                        initialRating={review.rating}
                        readOnly={true}
                        numStars={5}
                        theme={{
                            colors: {
                                backgroundDefault: 'lightgray',
                                backgroundColorActive: '#009e6c',
                                backgroundColorHover: '#275ed8'
                            },
                            size: 25
                        }}
                    />
                    <span className="bg-blue-100 text-green-600 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">{review.rating}</span>
                </div>
            </div>
            <div className="mb-5 text-sm text-gray-500">
                <p><time dateTime={review.createdAt}>{new Date(review.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</time></p>
            </div>
            <p className="mb-2 text-gray-500">{review.review}</p>
        </article>
    );
};

export default ProductReview;
