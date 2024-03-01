import { useState, useEffect } from 'react'
import WHITE_STAR from '../../assets/white-star.png'
const ReviewCard = ({review}) => {
    useEffect(() => {
        getReviewColor(review.author_details.rating)
    }, [review.author_details.rating])
    const [bg, setBg] = useState('bg-green-500')
    console.log(review)
    const getReviewColor = (rating) => {
        if(review && review.author_details && review.author_details.rating) {
            if(review.author_details.rating > 7) {
                setBg('bg-green-500')
            } else if(review.author_details.rating > 5) {
                setBg('bg-yellow-500')
            } else {
                setBg('bg-red-500')
            }
        }
    }
    return (
        <div className='p-4 pl-0'>
            <div className='flex items-center mb-1'>
                <h2 className='font-bold mr-2'>{review && review.author}</h2>
                <h3 className='text-gray-400 mr-2'>@{review && review.author_details && review.author_details.username}</h3>
                <div className={'text-white pr-1 pt-0 rounded-md flex items-center w-max'+' '+bg}>
                    <img className='w-3 m-1' src={WHITE_STAR} alt="Star rating" />
                    <p className='text-sm'>{review && review.author_details && review.author_details.rating}</p>
                </div>
            </div>
            <p>{review && review.content}</p>
        </div>
    )
}
export default ReviewCard