import Registracija from "./Zasloni/Registracija.jsx"
import Prijava from "./Zasloni/Prijava.jsx"
import Domov from "./Zasloni/Domov.jsx"
import Statistike from "./Zasloni/Statistike.jsx"
import NovVnos from "./Funkcionalnosti/NovVnos.jsx"

import { Routes, Route } from "react-router";

function App() {
  return(
    <>
      <Routes>
        <Route path="/" element={<Prijava />} />
        <Route path="/registracija" element={<Registracija />} />
        <Route path="/domov" element={<Domov />} />
        <Route path="/statistike" element={<Statistike />} />
        <Route path="/novVnos" element={<NovVnos />} />
      </Routes>
    </>
  )
}

export default App