import { useState } from 'react'
import LOGO from '../../assets/logo.png'
import SEARCH from '../../assets/search.webp'
import { useNavigate } from 'react-router-dom'
const Header = () => {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    return (
        <div className="flex flex-col md:flex-row p-2 justify-between items-center sticky top-0 bg-secondary z-30">
        <div className="flex items-center">
          <img src={LOGO} alt="Cine Corner Logo" className="w-16 m-2" />
          <h1 className="text-4xl mb-4 pt-4 font-bold">Cine Corner</h1>
        </div>
        <div className='relative text-black'>
          <input onChange={(e) => setQuery(e.target.value)} className='p-2 rounded-md outline-0' type="text" placeholder='Search for a movie' />
          <button onClick={() => navigate('search/', { state: query })} className='bg-white rounded-md w-9 h-10 p-2 absolute right-0 top-0 border'>
            <img src={SEARCH} alt="Search Icon" />
          </button>
        </div>
      </div>
    )
}

export default Header