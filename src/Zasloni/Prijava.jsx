import "../CSS/PrijavaRegistracija.css"
import { Link, useNavigate } from "react-router"

function Prijava() {
    const navigate = useNavigate();

    return(
        <div className="prijavaWrapper">
            <div className="glava">
                <button type="button" onClick={() => navigate("/registracija")}>Registracija</button>
            </div>

            <div className="prijavaForma">
                <h1>Prijava</h1>
                
                <form>
                    <input type="email" placeholder="E-mail"></input>
                    <input type="password" placeholder="Geslo"></input>

                    <button type="submit">Prijavi se</button>
                </form>

                <Link to="/registracija">Še nimate računa? Registrirajte se</Link>
            </div>
        </div>
    )
}

export default Prijava