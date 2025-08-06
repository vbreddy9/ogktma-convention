import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Common Components
import Header from './components/Header';
import Footer from './components/Footer';

// Homepage Sections
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import InfoSection from './components/InfoSection';
import AgendaComponent from './components/AgendaComponent';
import DignitariesList from './components/DignitariesList';
import SponsorCarousel from './components/SponsorCarousel';
import EarlyBirdPackages from './components/EarlyBirdPackages';
import CountdownSection from './components/CountdownSection';
import VenueSection from './components/VenueSection';

// Forms and Pages
import MemberRegistrationForm from './components/MemberRegistrationForm.jsx';
import SimpleRegistrationForm from './components/SimpleRegistrationForm.jsx';
import ThankYou from './components/ThankYou.jsx';
import ThankYouMember from './components/ThankYouMember.jsx'

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Hero />
              <AgendaComponent />
              <AboutSection />
              <InfoSection />
              <DignitariesList />
              <SponsorCarousel />
              <EarlyBirdPackages />
              <CountdownSection />
              <VenueSection />
              <Footer />
            </>
          }
        />

        {/* Registration Pages */}
        <Route path="/register" element={<MemberRegistrationForm />} />
        <Route path="/become-sponsor" element={<SimpleRegistrationForm />} />

        {/* Thank You Page */}
        <Route path="/thank-you-member" element={<ThankYouMember />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
