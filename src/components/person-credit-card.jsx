import moment from "moment"
import LANGUAGES from "../helpers/languages.json"

const PersonCredit =  ({credit, type}) => {
    return (
        <div className="flex">
            <div className="flex">
                <p className="m-1 p-2">{credit.release_date ? moment(credit.release_date).format("YYYY"): '----'}</p>
                <li className="m-1 p-2"></li>
            </div>
            <h3 className="mt-1 mb-1 p-1 text-xl font-bold">{credit.original_title}</h3>
            {type === 'cast' && credit.character &&<h4 className="mt-1 mb-1 p-1 text-lg text-slate-500">as {credit.character}</h4>}
            {type === 'crew' && credit.job && <h4 className="mt-1 mb-1 p-2">{credit.job}</h4>}
            <p className="mt-1 mb-1 p-2 text-slate-500">({LANGUAGES[credit.original_language]})</p>
        </div>
    )
}

export default PersonCredit