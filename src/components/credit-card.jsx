import AVATAR from '../../assets/Avatar.png'
const Credit = ({data}) => {
    const routeToPerson = (id) =>{
        window.location.href = `/person/${id}`
    }
    return (
        <div className='flex flex-col items-center m-4 p-4 w-52 border-secondary bg-secondary  border rounded-md ' style={{maxWidth: '50rem', width: '100%'}}>
            <figure className='w-40 h-40 m-0'>
                {data.profile_path ? <img className='object-cover rounded-full w-full h-full' src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`} alt="Crew Image" /> : <img className='rounded-full object-cover w-40 h-40' src={AVATAR} alt="Crew Image" />}
            </figure>
            <h4 onClick={() => routeToPerson(data.id)} className='text-center text-2xl whitespace-pre-wrap hover:underline cursor-pointer'>{data.name}</h4>
            {data.character && <p className='text-center whitespace-pre-wrap'>as <span className='font-bold'>{data.character}</span></p>}
            <p className='text-center whitespace-pre-wrap'>{data.known_for_department}</p>
        </div>
    )
}
export default Credit