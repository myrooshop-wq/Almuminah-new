import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { AnimatePresence } from 'motion/react';

// Code splitting — each page loads only when visited
const Home       = React.lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About      = React.lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact    = React.lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Admissions = React.lazy(() => import('./pages/Admissions').then(m => ({ default: m.Admissions })));
const Curriculum = React.lazy(() => import('./pages/Curriculum').then(m => ({ default: m.Curriculum })));
const Gallery    = React.lazy(() => import('./pages/Gallery').then(m => ({ default: m.Gallery })));
const Events     = React.lazy(() => import('./pages/Events').then(m => ({ default: m.Events })));
const Management = React.lazy(() => import('./pages/Management'));

// 404 page — inline, no separate file needed
const NotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
    <p className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-4">404</p>
    <h1 className="text-5xl font-serif text-brand-green mb-6">Page Not Found</h1>
    <p className="text-brand-green/60 mb-10 max-w-md">
      The page you are looking for doesn't exist or has been moved.
    </p>
    <a href="/" className="px-8 py-4 bg-brand-green text-brand-cream font-bold uppercase tracking-widest text-xs rounded-full hover:bg-brand-gold hover:text-brand-green transition-all">
      Back to Home
    </a>
  </div>
);

// Page loader — shows while lazy chunk downloads
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-gold" />
  </div>
);

export default function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/"           element={<Home />} />
              <Route path="/about"      element={<About />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/curriculum" element={<Curriculum />} />
              <Route path="/gallery"    element={<Gallery />} />
              <Route path="/events"     element={<Events />} />
              <Route path="/contact"    element={<Contact />} />
              <Route path="/management" element={<Management />} />
              <Route path="*"           element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </Layout>
    </Router>
  );
}
