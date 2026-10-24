import "../CSS/Noga.css"
import { Link } from "react-router"

function Noga() {
    return(
        <div className="nogaWrapper">
            <Link to="/domov">Domov</Link>
            <Link to="/statistike">Statistike</Link>
        </div>
    )
}

export default Noga