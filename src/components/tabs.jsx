import { useEffect, useState } from "react"

const Tabs = ({tabs, contents}) => {
    const [active, setActive] = useState(Number(sessionStorage.getItem('currentTab')) || 0)
    useEffect(() => {
        sessionStorage.setItem('currentTab', active)
    }, [active])
    return (
        <div>
            <div className="flex m-2 whitespace-nowrap overflow-x-auto">
                {tabs.map((tab, index) => (
                    <button className={"m-1 p-2 "+(active === index && " border-b-2 border-blue-500")} key={index} onClick={() => setActive(index)}>{tab}</button>
                ))}
            </div>
            <div>
                {contents[active]}
            </div>
        </div>
    )
}
export default Tabs