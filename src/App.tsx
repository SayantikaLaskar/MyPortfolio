import { Navigation } from './components/ui/Navigation';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { EducationSection } from './components/sections/EducationSection';
import { useActiveSection } from './hooks/useActiveSection';

const sectionIds = ['hero', 'about', 'projects', 'experience', 'education'];

function App() {
  const { activeSection, scrollToSection } = useActiveSection(sectionIds);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF5F2' }}>
      <Navigation
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
      </main>
    </div>
  );
}

export default App;
