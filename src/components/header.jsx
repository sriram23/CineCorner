import LOGO from '../../assets/logo.png'
const Header = () => {
    return (
        <div className="flex flex-col md:flex-row p-2 justify-between items-center sticky top-0 bg-secondary z-30">
        <div className="flex items-center">
          <img src={LOGO} alt="Cine Corner Logo" className="w-16 m-2" />
          <h1 className="text-4xl mb-4 pt-4 font-bold">Cine Corner</h1>
        </div>
      </div>
    )
}

export default Header