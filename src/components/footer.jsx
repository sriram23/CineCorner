import TMDB_LOGO from '../../assets/tmdb_logo.svg'
const Footer = () => {
    return(
        <div className='border-t-2 border-white text-light' style={{background: 'rgba(25,25,25,1)'}}>
            <div>
                <img className='m-6 w-48' src={TMDB_LOGO} alt="TMDB Logo" />
                <p className='text-3xl p-4'>Data Powered by <a className='underline' href="https://www.themoviedb.org/">themoviedb</a></p>
            </div>
            <div className='text-center p-4'>
                Copyright © 2024 - Sriram Balasubramanian
            </div>
        </div>
    )
}

export default Footer