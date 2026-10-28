import Noga from "../Komponente/Noga.jsx"
import Glava from "../Komponente/Glava.jsx"
import "../CSS/Statistike.css"
import supabase from "../supabase.js"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { SmileyWinkIcon, SmileyIcon, SmileyMehIcon, SmileyNervousIcon, SmileySadIcon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

import roza from "../Grafike/bckgRegistracijaPrijava.png"

function Statistike({ uporabnik }) {
    const [ podatki, setPodatki ] = useState([]);
    const [ vnosi, setVnosi ] = useState([]);
    const [ tedenskoPovprečje, setTedenskoPovprečje ] = useState("");
    const [ danes, setDanes ] = useState("");
    const [ prejsnjiTeden, setPrejsnjiTeden ] = useState("");
    const [ napaka, setNapaka ] = useState("");

    const [ izbranGraf, setIzbranGraf ] = useState("vnosi");

    const [ kategorije, setKategorije ] = useState([]);

    const dnevi = ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"];

    const vrednostiPocutja = {
        "odlicno": 5,
        "dobro": 4,
        "nevtralno": 3,
        "slabo": 2,
        "zelo slabo": 1,
    };

    const ikone = [null, SmileySadIcon, SmileyNervousIcon, SmileyMehIcon, SmileyIcon, SmileyWinkIcon];

    useEffect(() => {
        async function tedenskiVnosi() {
            const danes = new Date();

            const tedenNazaj = new Date();
            tedenNazaj.setDate(danes.getDate() - 6);

            const datumDanes = `${danes.getFullYear()}-${String(danes.getMonth() + 1).padStart(2, "0")}-${String(danes.getDate()).padStart(2, "0")}`;
            const datumTedenNazaj = `${tedenNazaj.getFullYear()}-${String(tedenNazaj.getMonth() + 1).padStart(2, "0")}-${String(tedenNazaj.getDate()).padStart(2, "0")}`;

            setDanes(datumDanes);
            setPrejsnjiTeden(datumTedenNazaj);

            const { data, error } = await supabase
                .from("vpis")
                .select("*")
                .gte("datum_vpisa", datumTedenNazaj)
                .lte("datum_vpisa", datumDanes)
                .order("datum_vpisa", { ascending: true });

            if (error) {
                setNapaka(error.message);
                return;
            }

            setVnosi(data);

            const tedenskeOcene = data
                .map((v) => vrednostiPocutja[v.pocutje])
                .filter((o) => o !== undefined);

            setTedenskoPovprečje(tedenskeOcene.length > 0 ? (tedenskeOcene.reduce((a, b) => a + b, 0) / tedenskeOcene.length).toFixed(1) : "0.0");

            const poDnevih = [];

            for (let i = 6; i >= 0; i--) {
                const d = new Date();
                d.setDate(danes.getDate() - i);

                const datum = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

                const vnosiDneva = data.filter((v) => v.datum_vpisa === datum);

                const ocene = vnosiDneva
                    .map((v) => vrednostiPocutja[v.pocutje])
                    .filter((o) => o !== undefined);

                const povprecje = ocene.length > 0 ? Math.round((ocene.reduce((a, b) => a + b, 0) / ocene.length) * 10) / 10 : null;

                poDnevih.push({
                    dan: dnevi[d.getDay()],
                    stevilo: vnosiDneva.length,
                    pocutje: povprecje,
                });
            }

            setPodatki(poDnevih);
        }

        tedenskiVnosi();
    }, []);

    useEffect(() => {
        async function pridobiKategorije() {
            const { data, error } = await supabase
                .from("kategorija")
                .select("*, vpis(count)");

            if (error) {
                setNapaka(error.message);
                return;
            }

            const zUporabo = data
                .map((k) => ({
                    ...k,
                    uporaba: k.vpis[0]?.count ?? 0,
                }))
                .sort((a, b) => b.uporaba - a.uporaba);

            setKategorije(zUporabo);
        }

        pridobiKategorije();
    }, []);

    const največ = Math.max(1, ...kategorije.map((k) => k.uporaba));

    return(
        <div className="statistikeWrapper">
            <div className="glavaStatistike">
                <Glava uporabnik={uporabnik} />

                <p id="datum">{prejsnjiTeden} - {danes}</p>

                <div className="statistikePovzetek">
                    <div className="tedenskiVpis">
                        <h1>{vnosi.length}</h1>
                        <p>Vpisov ta teden</p>
                    </div>

                    <div className="tedenskoPočutje">
                        <h1>{tedenskoPovprečje} <p id="od5">/5</p></h1>
                        <p>Povprečno počutje</p>
                    </div>
                </div>

                <img src={roza} alt="roza" />
            </div>

            {napaka && (
                <div className="napaka">
                    <p>{napaka}</p>
                </div>
            )}

            <div className="vnosiVDnevnik">
                <div className="vnosiPočutje">
                    <button type= "button" className={izbranGraf === "vnosi" ? "aktiven" : ""} onClick={() => setIzbranGraf("vnosi")}>Vnosi</button>
                    <button type="button" className={izbranGraf === "pocutje" ? "aktiven" : ""} onClick={() => setIzbranGraf("pocutje")}> Počutje</button>
                </div>

                <div className="grafi">
                    <div className="glavaGrafa">
                        <p>{izbranGraf === "vnosi" ? "Vnosi na dan" : "Počutje na dan"}</p>
                        <p>{podatki[0]?.dan} - {podatki[6]?.dan}</p>
                    </div>

                    <ResponsiveContainer width="100%" height="100%">
                        {izbranGraf === "vnosi" ? (
                            <LineChart data={podatki}>
                                <CartesianGrid stroke="#B8B6FF80" />
                                <XAxis dataKey="dan" stroke="#B8B6FF" />
                                <YAxis stroke="#B8B6FF" allowDecimals={false} />
                                <Tooltip />
                                <Line type="monotone" dataKey="stevilo" name="Vnosi" stroke="#B8B6FF" strokeWidth={3} />
                            </LineChart>
                        ) : (
                            <BarChart data={podatki}>
                                <XAxis dataKey="dan" stroke="#B8B6FF" />
                                <YAxis stroke="#B8B6FF" domain={[0, 5]} />
                                <Tooltip />
                                <Bar dataKey="pocutje" name="Počutje" fill="#B8B6FF" radius={[10, 10, 0, 0]} />
                            </BarChart>
                        )}
                    </ResponsiveContainer>
                </div>

                <div className="počutjePoDnevih">
                    <h2>Počutje po dnevih</h2>
                    
                    <div className="dnevi">
                        {podatki.map((p) => {
                            const Ikona = p.pocutje ? ikone[Math.round(p.pocutje)] : null;

                            return (
                                <div key={p.dan} className="dan">
                                    <span className={Ikona ? "krog" : "krog prazen"}>
                                        {Ikona && <Ikona size={22} />}
                                    </span>
                                    <p>{p.dan}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="najpogostejšeKategorije">
                    <h2>Najpogostejše kategorije</h2>

                    {kategorije.map((k) => (
                        <div key={k.id_kategorije} className="kategorija">
                            <div className="kategorijaGlava">
                                <p>{k.naziv}</p>
                                <p>{k.uporaba} vpis/a/i/ov</p>
                            </div>

                            <span className="črtaUporabe">
                                <span className="polnilo" style={{ width: `${(k.uporaba / največ) * 100}%` }}></span>
                            </span>
                        </div>
                    ))}
                </div>

                <Noga />
            </div>
        </div>
    )
}

export default Statistike