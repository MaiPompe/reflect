import Noga from "../Komponente/Noga"
import "../CSS/Statistike.css"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";


function Statistike() {

    const podatki = [
        { dan: "Pon", pocutje: 3 },
        { dan: "Tor", pocutje: 4 },
        { dan: "Sre", pocutje: 2 },
        { dan: "Čet", pocutje: 5 },
        { dan: "Pet", pocutje: 4 },
    ];

    return(
        <div className="statistikeWrapper">
            <div className="vnosiVDnevnik">
                <h1>Vnosi v dnevnik</h1>

                <div className="grafVnosov">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={podatki}>
                            <CartesianGrid stroke="#2a2d50" />
                            <XAxis dataKey="dan" stroke="#B8B6FF" />
                            <YAxis stroke="#B8B6FF" domain={[0, 5]} />
                            <Tooltip />
                            <Line type="monotone" dataKey="pocutje" stroke="#B8B6FF" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="počutje">
                <h1>Počutje</h1>

                <div className="grafVnosov">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={podatki}>
                            <XAxis dataKey="dan" stroke="#B8B6FF" />
                            <YAxis stroke="#B8B6FF" />
                            <Tooltip />
                            <Bar dataKey="pocutje" fill="#B8B6FF" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <Noga />
        </div>
    )
}

export default Statistike