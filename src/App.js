import Logo from './components/Logo/Logo';
import './App.css';

import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import Section from './components/Section/Section';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Section
        title="Top Albums"
        fetchUrl="https://qtify-backend-labs.crio.do/albums/top"
      />
      <Section
  title="New Albums"
  fetchUrl="https://qtify-backend-labs.crio.do/albums/new"
/>
<Section
  title="Songs"
  fetchUrl="https://qtify-backend-labs.crio.do/songs"
  type="song"
/>

    </div>
  );
}

export default App;
