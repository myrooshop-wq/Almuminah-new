import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Admissions } from './pages/Admissions';
import { Curriculum } from './pages/Curriculum';
import { Gallery } from './pages/Gallery';
import { Events } from './pages/Events';
import Management from './pages/Management';
import { AnimatePresence } from 'motion/react';

export default function App() {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/management" element={<Management />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
}
