import { ArrowLeftIcon, SmileyWinkIcon, SmileyIcon, SmileyMehIcon, SmileyNervousIcon, SmileySadIcon } from "@phosphor-icons/react"
import "../CSS/NovVnos.css"
import { Link, useNavigate } from "react-router"
import { useState, useEffect } from "react";
import supabase from "../supabase.js"

import roza from "../Grafike/bckgRegistracijaPrijava.png"

function NovVnos({ uporabnik }) {
    const navigate = useNavigate();

    const [ danes, setDanes ] = useState("");
    const [ kategorije, setKategorije ] = useState([]);

    const [ kategorija, setKategorija ] = useState("");
    const [ pocutje, setPocutje ] = useState("");
    const [ opombe, setOpombe ] = useState("");
    const [ ure, setUre ] = useState("");
    const [ minute, setMinute ] = useState("");
    const [ napaka, setNapaka ] = useState("");

    const pocutja = [
        { ime: "odlicno", ikona: <SmileyWinkIcon size={25} /> },
        { ime: "dobro", ikona: <SmileyIcon size={25} /> },
        { ime: "nevtralno", ikona: <SmileyMehIcon size={25} /> },
        { ime: "slabo", ikona: <SmileyNervousIcon size={25} /> },
        { ime: "zelo slabo", ikona: <SmileySadIcon size={25} /> },
    ];

    useEffect(() => {
        function pridobiDatum() {
            const danes = new Date();
            const datum = `${danes.getFullYear()}-${String(danes.getMonth() + 1).padStart(2, "0")}-${String(danes.getDate()).padStart(2, "0")}`;

            setDanes(datum);
        }

        pridobiDatum();
    })

    useEffect(() => {
        async function pridobiKategorije() {
            const { data, error } = await supabase
                .from("kategorija")
                .select("*")

            if (error) {
                setNapaka(error.message);
                return;
            }

            setKategorije(data);
        }

        pridobiKategorije();
    }, []);

    async function vnesi() {
        setNapaka("");

        if (!kategorija.trim() || !pocutje || ure === "" || minute === "") {
            setNapaka("Izpolni kategorijo, počutje in čas.");
            return;
        }

        if (ure < 0 || ure > 23 || minute < 0 || minute > 59) {
            setNapaka("Ura mora biti 0–23, minute pa 0–59.");
            return;
        }

        if (!uporabnik) {
            navigate("/");
            return;
        }

        const danes = new Date();
        const datum = `${danes.getFullYear()}-${String(danes.getMonth() + 1).padStart(2, "0")}-${String(danes.getDate()).padStart(2, "0")}`;
        const cas = `${String(ure).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

        setDanes(datum);

        const iskanoIme = kategorija.trim().toLowerCase();
        const obstojeca = kategorije.find((k) => k.naziv.trim().toLowerCase() === iskanoIme);

        let idKategorije;

        if (obstojeca) {
            idKategorije = obstojeca.id_kategorije;
        } else {
            const { data, error: napakaKategorije } = await supabase
                .from("kategorija")
                .insert({
                    id_uporabnika: uporabnik.id_uporabnika,
                    naziv: kategorija.trim()
                })
                .select("id_kategorije, naziv")
                .single();

            if (napakaKategorije) {
                setNapaka(napakaKategorije.message);
                return;
            }

            idKategorije = data.id_kategorije;
            setKategorije([...kategorije, data]);
        }

        const { error } = await supabase
            .from("vpis")
            .insert({
                id_uporabnika: uporabnik.id_uporabnika,
                id_kategorije: idKategorije,
                pocutje: pocutje,
                opombe: opombe,
                cas_vpisa: cas,
                datum_vpisa: datum
            });

        if (error) {
            setNapaka(error.message);
            return;
        }

        navigate("/domov");
    }

    function pridobiČas() {
        const zdaj = new Date();
        setUre(zdaj.getHours());
        setMinute(zdaj.getMinutes());
    }

    return(
        <div className="novVnosWrapper">
            <div className="glavaNovVnos">
                <Link to="/domov"><ArrowLeftIcon  size={25}/></Link>

                <h1>Nov vpis</h1>
                <p id="datum">{danes}</p>

                <img src={roza} alt="roza" />            
            </div>

            <div className="novVnosPodatki">
                <div className="kategorija">
                    <p>Kategorija</p>

                    <input type="text" placeholder="npr. Šola" value={kategorija} onChange={(e) => setKategorija(e.target.value)} />

                    <div className="kategorije">
                        {kategorije.map((k) => (
                            <button type="button" key={k.id_kategorije} onClick={() => setKategorija(k.naziv)}>{k.naziv}</button>
                        ))}
                    </div>
                </div>

                <div className="počutje">
                    <p>Počutje</p>

                    <div className="izbiraPočutja">
                        {pocutja.map((p) => (
                            <button
                                key={p.ime}
                                type="button"
                                onClick={() => setPocutje(p.ime)}
                                className={pocutje === p.ime ? "izbran" : ""}
                            >
                                {p.ikona}
                            </button>
                        ))}
                    </div>

                    <p id="izbranoPočutje">Izbrano: <span>{pocutje}</span></p>
                </div>

                <div className="čas">
                    <p>Čas</p>

                    <div className="izbiraČasa">
                        <div id="nastavitevČasa">
                            <input type="number" placeholder="0" min="0" max="23" value={ure} onChange={(e) => setUre(e.target.value)} />
                            <p>:</p>
                            <input type="number" placeholder="0" min="0" max="59" value={minute} onChange={(e) => setMinute(e.target.value)} />
                        </div>

                        <button type="button" onClick={pridobiČas}>Zdaj</button>
                    </div>
                </div>

                <div className="opombe">
                    <p>Opombe</p>

                    <textarea placeholder="Napiši opombo..." value={opombe} onChange={(e) => setOpombe(e.target.value)}></textarea>
                </div>

                {napaka && (
                    <div className="napaka">
                        <p>{napaka}</p>
                    </div>
                )}

                <div className="shraniPrekličiWrapper">
                    <button type="button" onClick={vnesi}>Shrani vpis</button>
                    <button type="button" onClick={() => navigate("/domov")}>Prekliči</button>
                </div>
            </div>
        </div>
    )
}

export default NovVnos