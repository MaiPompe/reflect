import Noga from "../Komponente/Noga"
import "../CSS/Domov.css"
import { useNavigate } from "react-router"

function Domov() {
    const navigate = useNavigate();

    return(
        <div className="domovWrapper">
            <div className="dodajKDnevnikuWrapper">
                <button type="button"  onClick={() => navigate("/novVnos")}>Dodaj k dnevniku +</button>
            </div>

            <div className="današnjiVpisi">
                <h1>Današnji vpisi</h1>

                <table>
                    <thead>
                        <tr>
                            <th style={{ borderRight: "2px solid #000000" }}>Opis</th>
                            <th style={{ borderRight: "2px solid #000000" }}>Ura</th>
                            <th>Počutje</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Šola</th>
                            <th>7.10</th>
                            <th>Počutje znakec</th>
                        </tr>
                        <tr>
                            <th>Fitnes</th>
                            <th>17.40</th>
                            <th>Počutje znakec</th>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Noga />
        </div>
    )
}

export default Domov