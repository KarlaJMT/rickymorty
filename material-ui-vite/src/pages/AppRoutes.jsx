import { Route, Routes } from 'react-router-dom';
import { About } from './about/About';
import { Contact } from './contact/Contact';
import Home from './home/Home';
import HomePage from './home/HomePage'
import { PageDash } from './dash/PageDash';
import PersonajeDetails from './dash/PersonajeDetails';
import EpisodeDetails from './dash/EpisodeDetails';



export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/personajes" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/dash'>
                <Route index element={<PageDash />} />
                <Route path=':id' element={<PersonajeDetails />} />
                <Route path=':id' element={<EpisodeDetails />} />
            </Route>
        </Routes>
    )
}