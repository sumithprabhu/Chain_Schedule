import React from 'react';
import Chain from "./index";


const Home = ({connectWallet,currentAccount}) => {
function displayAccount(){
  if (currentAccount){
    let text=(currentAccount.slice(0,4)).concat("...",(currentAccount.slice(38)))
    return text
  }
  else{
    return "Connect"
  }
}
  return (
    <div style={{ background: 'linear-gradient(to right, #333399,  #FF00CC)', minHeight: '100%' ,minWidth:'100%' }}>
      <nav style={{ background: 'linear-gradient(to right, #333399,  #FF00CC)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'  }}>
        <div>
          <img src={Chain} alt="Logo" style={{ height: '120px', width: '60%' }} />
        </div>
        <div>
          <button onClick={connectWallet}style={{ backgroundColor: '#666', color: '#fff', padding: '0.8rem 2rem', borderRadius: '4px', fontSize: '1rem', border: 'none' }}>{displayAccount()}</button>
        </div>
      </nav>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(79vh - 80px)' }}>
        <h1 style={{ color: '#fff', textAlign: 'center' }}>Welcome to My Homepage</h1>
      </div>
      <div style={{ textAlign: 'center', paddingBottom: '2rem' }}>
        <button style={{ backgroundColor: '#666', color: '#fff', padding: '0.8rem 2rem', borderRadius: '4px', fontSize: '1rem', border: 'none' }}>Click Me</button>
      </div>
    </div>
  );
};

export default Home;