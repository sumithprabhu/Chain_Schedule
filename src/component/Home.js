import React from 'react';
import Chain from "./index";
const HomePage = () => {
  return (
    <div style={{ background: 'linear-gradient(to right, #333399,  #FF00CC)', minHeight: '100%' ,minWidth:'100%' }}>
      <nav style={{ background: 'linear-gradient(to right, #333399,  #FF00CC)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,marginTop:'100px' }}>
        <div>
          <img src={Chain} alt="Logo" style={{ height: '120px', width: '60%' }} />
        </div>
        <div>
          <button style={{ backgroundColor: '#666', color: '#fff', padding: '0.8rem 2rem', borderRadius: '4px', fontSize: '1rem', border: 'none' }}>Connect</button>
        </div>
      </nav>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)' }}>
        <h1 style={{ color: '#fff', textAlign: 'center' }}>Welcome to My Homepage</h1>
      </div>
      <div style={{ textAlign: 'center', paddingBottom: '2rem' }}>
        <button style={{ backgroundColor: '#666', color: '#fff', padding: '0.8rem 2rem', borderRadius: '4px', fontSize: '1rem', border: 'none' }}>Click Me</button>
      </div>
    </div>
  );
};

export default HomePage;