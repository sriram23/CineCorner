const ReviewCard = ({review}) => {
    console.log(review)
    return (
        <div>
            <div>
                <p>Rating: {review && review.author_details && review.author_details.rating}</p>
                <h2>{review && review.author}</h2>
                <h3>{review && review.author_details && review.author_details.username}</h3>
                <p>{review && review.content}</p>
            </div>
        </div>
    )
}
export default ReviewCard