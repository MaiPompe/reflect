import { ArrowLeftIcon, ArrowRightIcon, SmileyWinkIcon, SmileyIcon, SmileyMehIcon, SmileyNervousIcon, SmileySadIcon } from "@phosphor-icons/react"
import "../CSS/NovVnos.css"
import { useNavigate } from "react-router"

function NovVnos() {
    const navigate = useNavigate();

    return(
        <div className="novVnosWrapper">
            <div className="kategorija">
                <h1>Kategorija</h1>

                <div className="izbiraKategorije">
                    <button type="button"><ArrowLeftIcon size={32} /></button>
                    <button type="button" id="kategorija">Šola</button>
                    <button type="button"><ArrowRightIcon size={32} /></button>
                </div>
            </div>

            <div className="počutje">
                <h1>Počutje</h1>

                <div className="izbiraPočutja">
                    <button type="button"><SmileyWinkIcon size={32} /></button>
                    <button type="button"><SmileyIcon size={32} /></button>
                    <button type="button"><SmileyMehIcon size={32} /></button>
                    <button type="button"><SmileyNervousIcon size={32} /></button>
                    <button type="button"><SmileySadIcon size={32} /></button>
                </div>
            </div>

            <div className="opombe">
                <h1>Opombe</h1>

                <textarea placeholder="Napiši opombo..."></textarea>
            </div>

            <div className="čas">
                <h1>Čas</h1>

                <div className="izbiraČasa">
                    <input type="number" placeholder="1-24" id="ure"></input>
                    <p>:</p>
                    <input type="number" placeholder="1-60" id="minute"></input>
                </div>
            </div>
            
            <div className="shraniPrekličiWrapper">
                <button type="submit">Shrani</button>
                <button type="reset" onClick={() => navigate("/domov")}>Prekliči</button>
            </div>
        </div>
    )
}

export default NovVnos