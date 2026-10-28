import Registracija from "./Zasloni/Registracija.jsx"
import Prijava from "./Zasloni/Prijava.jsx"
import Domov from "./Zasloni/Domov.jsx"
import Statistike from "./Zasloni/Statistike.jsx"
import NovVnos from "./Funkcionalnosti/NovVnos.jsx"
import Profil from "./Zasloni/Profil.jsx"

import { Routes, Route } from "react-router";
import supabase from "./supabase.js"
import { useState, useEffect } from "react"

function App() {
  const [ uporabnik, setUporabnik ] = useState(null);
  const [ napaka, setNapaka ] = useState("");

  useEffect(() => {
    async function pridobiPodatkeUporabnika() {
        const { data, error } = await supabase
            .from("uporabnik")
            .select("*")
            .single();

        if (error) {
            setUporabnik(null);
            return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        setUporabnik({ ...data, email: user.email });
    }

    pridobiPodatkeUporabnika();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
        pridobiPodatkeUporabnika();
    });

    return () => subscription.unsubscribe();
  }, []);

  return(
    <>
      <Routes>
        <Route path="/" element={<Prijava />} />
        <Route path="/registracija" element={<Registracija />} />
        <Route path="/domov" element={<Domov uporabnik={uporabnik} />} />
        <Route path="/statistike" element={<Statistike uporabnik={uporabnik}/>} />
        <Route path="/novVnos" element={<NovVnos uporabnik={uporabnik} />} />
        <Route path="/profil" element={<Profil uporabnik={uporabnik}/>} />
      </Routes>
    </>
  )
}

export default App