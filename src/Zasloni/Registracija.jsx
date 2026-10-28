import "../CSS/PrijavaRegistracija.css"
import { Link, useNavigate } from "react-router"
import supabase from "../supabase.js"
import { useState } from "react";
import roza from "../Grafike/bckgRegistracijaPrijava.png"

function Registracija() {
    const navigate = useNavigate();

    const [ ime, setIme ] = useState("");
    const [ priimek, setPriimek ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ geslo, setGeslo ] = useState("");

    const [napaka, setNapaka] = useState("");

    async function registriraj(e) {
        e.preventDefault();
        setNapaka("");

        const { error } = await supabase.auth.signUp({
            email: email,
            password: geslo,
            options: {
                data: { ime: ime, priimek: priimek }
            }
        })

        if(error) {
            setNapaka(error.message);
            return;
        }

        navigate("/")
    }

    return(
        <div className="registracijaWrapper">
            <div className="glava">
                <button type="button" onClick={() => navigate("/")}>Prijava</button>
            </div>

            <div className="grafika">
                <img src={roza} alt="roža" />
            </div>

            <div className="registracijaForma">
                <div className="prijavaRegistracija">
                    <Link to="/">Prijava</Link>
                    <Link to="/registracija" style={{backgroundColor: "#12142a", color: "#b8b6ff"}}>Registracija</Link>
                </div>

                <h1>Registracija</h1>
                
                <form onSubmit={registriraj}>

                    {napaka && (
                        <div className="napaka">
                            <p>{napaka}</p>
                        </div>
                    )}

                    <input type="text" placeholder="Ime" value={ime} onChange={(e) => setIme(e.target.value)}></input>
                    <input type="text" placeholder="Priimek" value={priimek} onChange={(e) => setPriimek(e.target.value)}></input>
                    <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input type="password" placeholder="Geslo" value={geslo} onChange={(e) => setGeslo(e.target.value)}></input>

                    <button type="submit">Registriraj se</button>
                </form>

                <Link to="/">Že imate račun? Prijavite se</Link>
            </div>
        </div>
    )
}

export default Registracija