import TMDB_LOGO from '../../assets/tmdb_logo.svg'
import GITHUB from '../../assets/Github.png'
import LINKEDIN from '../../assets/Linkedin.png'
import WEBSITE from '../../assets/Link.png'
import MAIL from '../../assets/Mail.png'
import X from '../../assets/X.png'
const Footer = () => {
    const onButtonClick = (media) =>{
        switch(media) {
            case 'github':
                window.open('http://github.com/sriram23', '_blank')
                break
            case 'linkedin':
                window.open('http://linkedin.com/in/imsriramb', '_blank')
                break
            case 'email':
                window.open('mailto://sriramsubramanian23@gmail.com', '_blank')
                break
            case 'x':
                window.open('https://twitter.com/imsriramb', '_blank')
                break
            case 'portfolio':
                window.open('https://sriram-23.web.app', '_blank')
                break
        }
    }
    return(
        <div className='border-t-2 border-white text-white bg-secondary flex flex-col items-center'>
            <div className='m-4 ml-0 mr-0'>
                <button title='Email Developer' onClick={() => onButtonClick('email')} className='bg-white hover:bg-slate-200 rounded-full p-2 m-2'><img className='w-8' src={MAIL} alt="Email Developer" /></button>
                <button title='Hire Developer' onClick={() => onButtonClick('linkedin')} className='bg-white hover:bg-slate-200 rounded-full p-2 m-2'><img className='w-8' src={LINKEDIN} alt="Hire Developer" /></button>
                <button title="Developer's Portfolio" onClick={() => onButtonClick('portfolio')} className='bg-white hover:bg-slate-200 rounded-full p-2 m-2'><img className='w-8' src={WEBSITE} alt="Developer's Portfolio" /></button>
                <button title="Developer's Github" onClick={() => onButtonClick('github')} className='bg-white hover:bg-slate-200 rounded-full p-2 m-2'><img className='w-8' src={GITHUB} alt="Developer's Github" /></button>
                <button title="Connect with developer on Twitter" onClick={() => onButtonClick('x')} className='bg-white hover:bg-slate-200 rounded-full p-2 m-2'><img className='w-8' src={X} alt="Connect with developer on Twitter" /></button>
            </div>
            <div className='flex flex-col items-center'>
                <img className='m-6 w-24' src={TMDB_LOGO} alt="TMDB Logo" />
                <p className='text-xl p-4'>Data Powered by <a className='underline' href="https://www.themoviedb.org/">themoviedb</a></p>
            </div>
            <div className='text-center p-4'>
                Copyright © 2024 - Sriram Balasubramanian
            </div>
        </div>
    )
}

export default Footer