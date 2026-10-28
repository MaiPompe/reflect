import { SignOutIcon, TrashIcon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import supabase from "../supabase.js";
import Noga from "../Komponente/Noga";

import roza from "../Grafike/bckgRegistracijaPrijava.png"

import "../CSS/Global.css"
import "../CSS/Profil.css"

function Profil({ uporabnik }) {
    const navigate = useNavigate();

    const [ ime, setIme ] = useState("");
    const [ priimek, setPriimek ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ geslo, setGeslo ] = useState("");
    const [ napaka, setNapaka ] = useState("");

    useEffect(() => {
        if (uporabnik) {
            setIme(uporabnik.ime || "");
            setPriimek(uporabnik.priimek || "");
            setEmail(uporabnik.email || "");
        }
    }, [uporabnik]);

    async function shrani(e) {
        e.preventDefault();
        setNapaka("");

        const { error: napakaTabele } = await supabase
            .from("uporabnik")
            .update({ ime: ime, priimek: priimek })
            .eq("id_uporabnika", uporabnik.id_uporabnika);

        if (napakaTabele) {
            setNapaka(napakaTabele.message);
            return;
        }

        const spremembe = {};
        if (email !== uporabnik.email) spremembe.email = email;
        if (geslo) spremembe.password = geslo;

        if (Object.keys(spremembe).length > 0) {
            const { error: napakaAuth } = await supabase.auth.updateUser(spremembe);

            if (napakaAuth) {
                setNapaka(napakaAuth.message);
                return;
            }
        }

        setGeslo("");
    }

    async function odjavi() {
        await supabase.auth.signOut();
        navigate("/");
    }

    async function izbrišiRačun() {
        const potrdi = window.confirm("Ali res želite izbrisati račun? Vsi vaši vpisi bodo trajno izbrisani.");
        if (!potrdi) return;

        setNapaka("");

        const { error } = await supabase.rpc("izbrisi_racun");

        if (error) {
            setNapaka(error.message);
            return;
        }

        await supabase.auth.signOut();
        navigate("/");
    }

    if (!uporabnik) return null;

    return(
        <div className="profilWrapper">
            <div className="osnovniPodatki">
                <p className="začetnice">{uporabnik.ime[0]}{uporabnik.priimek[0]}</p>
                <p className="ime">{uporabnik.ime} {uporabnik.priimek}</p>
                <p className="email">{uporabnik.email}</p>

                <img src={roza} alt="roža" />
            </div>

            <div className="nastavitveProfila">
                <div className="urejanjePodatkov">
                    <h2>Osebni podatki</h2>

                    <form onSubmit={shrani}>
                        <div className="imePriimekInput">
                            <div className="labelInputWrapper">
                                <label htmlFor="ime">Ime</label>
                                <input type="text" id="ime" placeholder="Ime" value={ime} onChange={(e) => setIme(e.target.value)} />
                            </div>

                            <div className="labelInputWrapper">
                                <label htmlFor="priimek">Priimek</label>
                                <input type="text" id="priimek" placeholder="Priimek" value={priimek} onChange={(e) => setPriimek(e.target.value)} />
                            </div>
                        </div>

                        <div className="labelInputWrapper">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" id="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="labelInputWrapper">
                            <label htmlFor="geslo">Novo geslo</label>
                            <input type="password" id="geslo" placeholder="Pusti prazno, če ga ne spreminjaš" value={geslo} onChange={(e) => setGeslo(e.target.value)} />
                        </div>

                        {napaka && (
                            <div className="napaka">
                                <p>{napaka}</p>
                            </div>
                        )}

                        <button type="submit">Shrani Spremembe</button>
                    </form>
                </div>

                <div className="upravljanjeRačuna">
                    <h2>Račun</h2>

                    <button type="button" onClick={odjavi} id="odjaviSeGumb"><SignOutIcon weight="bold" /> Odjavi se</button>
                    <button type="button" id="izbrišiRačunGumb" onClick={izbrišiRačun}><TrashIcon weight="bold" /> Izbriši račun</button>               
                </div>

                <Noga />
            </div>
        </div>
    )
}

export default Profil;