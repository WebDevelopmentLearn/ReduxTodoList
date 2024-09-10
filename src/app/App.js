
import './App.css';
import {MainRoute} from "../routes/MainRoutes";
import {useEffect, useState} from "react";
import {LangContext} from "../contexts/LangContext";

function App() {
    const [lang, setLang] = useState("en");
    useEffect(() => {
        const lang = localStorage.getItem("lang");
        const selectedLang = prompt(lang === "ru" ? "Пожалуйста выберите язык (ru - Русский, en - Английский)" : "Please select a language (ru - Russian, en - English)", lang);
        setLang(selectedLang);
        localStorage.setItem("lang", selectedLang);
        alert(selectedLang === "ru" ? "Вы выбрали русский язык" : "You selected English language");
    }, []);
    return (
        <div className="App">
            <LangContext.Provider value={{lang}}>
                <MainRoute />
            </LangContext.Provider>
        </div>
    );
}

export default App;
