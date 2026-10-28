import "../CSS/Glava.css"
import { Link } from "react-router";

function Glava({ uporabnik }) {
    return(
        <div className="glavaWrapper">
            <div className="pozdrav">
                <p>Pozdravljeni,</p>
                <p>{uporabnik.ime} {uporabnik.priimek}</p>
            </div>

            <Link to="/novVnos">+</Link>
        </div>
    )
}

export default Glava;