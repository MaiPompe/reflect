import Noga from "../Komponente/Noga"
import Glava from "../Komponente/Glava.jsx"

import "../CSS/Global.css"
import "../CSS/Domov.css"

import supabase from "../supabase.js"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import { TrashIcon } from "@phosphor-icons/react"
import roza from "../Grafike/bckgRegistracijaPrijava.png"

function Domov({ uporabnik }) {
    const navigate = useNavigate();

    const [ današnjiVpisi, setDanašnjiVpisi ] = useState([]);
    const [ danes, setDanes ] = useState("");
    const [ napaka, setNapaka ] = useState("");

    useEffect(() => {
        async function pridobiDanašnjeVpise() {
            const danes = new Date();
            const datum = `${danes.getFullYear()}-${String(danes.getMonth() + 1).padStart(2, "0")}-${String(danes.getDate()).padStart(2, "0")}`;
            setDanes(datum);

            const { data, error } = await supabase
                .from("vpis")
                .select("*, kategorija(naziv)")
                .eq("datum_vpisa", datum)
                .order("cas_vpisa", { ascending: true });

            if (error) {
                setNapaka(error.message);
                return;
            }

            setDanašnjiVpisi(data);
        }

        pridobiDanašnjeVpise();
    }, []);

    async function izbrišiVnos(id_vpisa) {
        const { error } = await supabase
            .from("vpis")
            .delete()
            .eq("id_vpisa", id_vpisa);

        if (error) {
            setNapaka(error.message);
            return;
        }

        setDanašnjiVpisi(današnjiVpisi.filter((v) => v.id_vpisa !== id_vpisa));
    }

    const vrednostiPočutja = {
        "odlicno": 5,
        "dobro": 4,
        "nevtralno": 3,
        "slabo": 2,
        "zelo slabo": 1,
    };

    const ocene = današnjiVpisi
        .map((v) => vrednostiPočutja[v.pocutje])
        .filter((o) => o !== undefined);

    const povprečje = ocene.length > 0 ? (ocene.reduce((a, b) => a + b, 0) / ocene.length).toFixed(1) : "0.0";

    return(
        <div className="domovWrapper">
            <div className="glavaDomov">
                <Glava uporabnik={uporabnik} />

                <p id="datum">{danes}</p>

                <div className="statistike">
                    <div className="današnjiVpis">
                        <h1>{današnjiVpisi.length}</h1>
                        <p>Vpisov danes</p>
                    </div>

                    <div className="današnjePočutje">
                        <h1>{povprečje} <p id="od5">/5</p></h1>
                        <p>Povprečno počutje</p>
                    </div>
                </div>

                <img src={roza} alt="roza" />
            </div>

            <div className="današnjiVpisi">
                <div className="glavaDanašnjiVpisi">
                    <h1>Današnji vpisi</h1>
                    <p>{današnjiVpisi.length} vpis/a/i/ov</p>
                </div>

                {napaka &&
                    <div className="napaka">
                        <p>{napaka}</p>
                    </div>
                }

                {današnjiVpisi.map((v) => (
                    <div key={v.id_vpisa} className="vpis">
                        <p className="uraVpisa">{v.cas_vpisa.slice(0, 5)}</p>
                        <div className="kategorijaPočutjeWrapper">
                            <p className="kategorijaVpisa">{v.kategorija?.naziv}</p>
                            <p className="počutjeVpisa">{v.pocutje}</p>
                        </div>
                        <p className="izbrišiVnos" onClick={() => izbrišiVnos(v.id_vpisa)}><TrashIcon  size={28}/></p>
                    </div>
                ))}

                <button type="button" onClick={() => navigate("/novVnos")}>+ Dodaj nov vpis</button>                
                
                <Noga />
            </div>
        </div>
    )
}

export default Domov