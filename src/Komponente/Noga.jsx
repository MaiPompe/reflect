import "../CSS/Noga.css"
import { NavLink } from "react-router"
import { HouseIcon, GraphIcon, UserCircleGearIcon } from "@phosphor-icons/react"

function Noga() {
    return(
        <div className="nogaWrapper">
            <NavLink to="/domov"><HouseIcon size={22} /> <p>Domov</p></NavLink>
            <NavLink to="/statistike"><GraphIcon size={22} /> <p>Statistike</p></NavLink>
            <NavLink to="/profil"><UserCircleGearIcon size={22} /> <p>Profil</p></NavLink>
        </div>
    )
}

export default Noga