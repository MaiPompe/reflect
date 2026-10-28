import "../CSS/PrijavaRegistracija.css"
import { Link, useNavigate } from "react-router"
import supabase from "../supabase";
import { useState } from "react";
import roza from "../Grafike/bckgRegistracijaPrijava.png";

function Prijava() {
    const navigate = useNavigate();

    const [ email, setEmail ] = useState("");
    const [ geslo, setGeslo ] = useState("");
    const [ napaka, setNapaka ] = useState("");

    async function prijavi(e) {
        e.preventDefault();
        setNapaka("");

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: geslo
        });

        if (error) {
            setNapaka(error.message);
            return;
        }

        navigate("/domov");
    }

    return(
        <div className="prijavaWrapper">
            <div className="glava">
                <button type="button" onClick={() => navigate("/registracija")}>Registracija</button>
            </div>

            <div className="grafika">
                <img src={roza} alt="roža" />
            </div>

            <div className="prijavaForma">
                <div className="prijavaRegistracija">
                    <Link to="/" style={{backgroundColor: "#12142a", color: "#b8b6ff"}}>Prijava</Link>
                    <Link to="/registracija">Registracija</Link>
                </div>
                
                <h1>Prijava</h1>
                
                <form onSubmit={prijavi}>

                    {napaka && (
                        <div className="napaka">
                            <p>{napaka}</p>
                        </div>
                    )}

                    <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input type="password" placeholder="Geslo" value={geslo} onChange={(e) => setGeslo(e.target.value)}></input>

                    <button type="submit">Prijavi se</button>
                </form>

                <Link to="/registracija">Še nimate računa? Registrirajte se</Link>
            </div>
        </div>
    )
}

export default Prijava