import React from 'react';
import Hero from './components/Hero';
import ServiceList from './components/ServiceList';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import Contact from './components/Contact'; 
/* import GamePanel from './components/GamePanel'; */


const HomePage = () => {
  return (
    <div className="App">
      <Hero />
      <ServiceList />
      <SkillsSection />
      <AboutSection />
      <Contact />
      {/* <GamePanel /> */}
    </div>
  );
};

export default HomePage;
