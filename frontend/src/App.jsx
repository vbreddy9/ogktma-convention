import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import DignitariesList from './components/DignitariesList';
import Footer from './components/Footer';
import InfoSection from './components/InfoSection';
import SponsorCarousel from './components/SponsorCarousel';
import EarlyBirdPackages from './components/EarlyBirdPackages';
import CountdownSection from './components/CountdownSection';
import AgendaComponent from './components/AgendaComponent';
import VenueSection from './components/VenueSection';
import MemberRegistrationForm from './components/MemberRegistrationForm.jsx';
import SponsorshipSection from './components/SponsorshipSection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Hero />
            <AgendaComponent />
            <SponsorshipSection/>
            <AboutSection />
            <InfoSection />
            <DignitariesList />
            <SponsorCarousel />
            <EarlyBirdPackages />
            <CountdownSection />
            <VenueSection />
            <Footer />
          </>
        } />
      
        <Route path="/register" element={<MemberRegistrationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
