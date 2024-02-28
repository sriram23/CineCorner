const PageComponent = ({totalPages, currenPage, onNextClick, onPrevClick}) => {
    return (
        <div className="flex justify-center items-center p-4">
            <button className="mr-4" onClick={onPrevClick}>Previous</button>
            <p>Page {currenPage} of {totalPages}</p>
            <button className="ml-4" onClick={onNextClick}>Next</button>
        </div>
    )
}

export default PageComponent