import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ChooseSection from "./components/ChooseSection.jsx";
import './App.css'
import GuideSection from "./components/GuideSection.jsx";
import PromptWheel from "./components/PromptWheel.jsx";

function App() {

  return (
    <>
    <Navbar />
    <Hero />
    <ChooseSection />
    <GuideSection />
    <PromptWheel />
    </>
  )
}

export default App
