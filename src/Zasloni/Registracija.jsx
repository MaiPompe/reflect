import "../CSS/PrijavaRegistracija.css"
import { Link, useNavigate } from "react-router"

function Registracija() {
    const navigate = useNavigate();

    return(
        <div className="registracijaWrapper">
            <div className="glava">
                <button type="button" onClick={() => navigate("/")}>Prijava</button>
            </div>

            <div className="registracijaForma">
                <h1>Registracija</h1>
                
                <form>
                    <input type="text" placeholder="Ime"></input>
                    <input type="text" placeholder="Priimek"></input>
                    <input type="email" placeholder="E-mail"></input>
                    <input type="password" placeholder="Geslo"></input>

                    <button type="submit">Registriraj se</button>
                </form>

                <Link to="/">Že imate račun? Prijavite se</Link>
            </div>
        </div>
    )
}

export default Registracija