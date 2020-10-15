import React from 'react';
import Header from './components/layout/Header';
import Nav from './components/layout/Nav';

function App() {
  return (
    <>
    <Header/>
    <div className="grid contenedor contenido-principal">
      <Nav/>
      <main class="caja-contenido col-9">
        
      </main>
    </div>
    </>
  )
}

export default App;
