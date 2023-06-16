import React from 'react';
import Chain from "../assets/index"
import react, { lazy, useState,useEffect } from "react";


const Home = ({connectWallet,currentAccount,ensName,ensAvatar}) => {
  const [btnMsg,setBtnMsg]=useState("Connect")
  
  function copyLink(){
    
    const currentURL = window.location.href;
    const finalURL=currentURL.concat(`slot/${currentAccount}`)
    navigator.clipboard.writeText(finalURL)
    alert("Link copied to clipboard")
  }
  
  function displayAccount(){
    
    connectWallet()
    if(ensName){
      setBtnMsg(ensName)
    }
    else{
    let text=(currentAccount.slice(0,4)).concat("...",(currentAccount.slice(38)))
    setBtnMsg(text)
    }
  }

  useEffect(() => {
    if(ensName){
      displayAccount()
    }
  }, [ensName]);
  return (
    <div style={{ background: 'linear-gradient(to right, #333399,  #FF00CC)', height: '713px'  }}>
      <nav style={{ background: 'linear-gradient(to right, #333399,  #FF00CC)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'  }}>
        <div>
          <img src={Chain} alt="Logo" style={{ marginTop:'2px',height: '80px', width: '100%' }} />
        </div>
        
        <div style={{display:'flex',justifyContent:"space-around"}}>
          <img src={ensAvatar} style={{height:'50px' ,borderRadius:'30px',marginRight:'20px'}}/>
          <button onClick={displayAccount}style={{cursor:'pointer', backgroundColor: '#333399', color: '#fff', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '1.5rem', border: 'none' }}>{btnMsg}</button>
        </div>
      </nav>
      <div style={{ display: 'flex',  alignItems: 'center',flexDirection:'column'}}>
        <h1 style={{ color: '#fff', textAlign: 'center',fontSize:'80px'}}>The Scheduling dapp of web3</h1>
       
        <h1 style={{color:'#fff',textAlign: 'center' ,width:'900px'}}>
          Chain Schedule is your wallet address based meet scheduling automation platform for eliminating the back-and-forth chats to find the perfect time. 
        </h1>
      </div>
      <hr style={{
          background: 'white',
          color: 'white',
          borderColor: 'white',
          height: '0.5px',
          width:'1200px'
          
        }}/>
      <div style={{ textAlign: 'center', paddingBottom: '2rem' ,display:'flex',flexDirection:'row' ,justifyContent:"space-around"}}>
        <h1 style={{color:'#fff',width:'700px', fontSize:'20px'}}>Click the button to get your personalized link to call your mates to schedule a meet</h1>
        <button onClick={copyLink} style={{ backgroundColor: '#333399',cursor:'pointer', color: '#fff', padding: '0.8rem 2rem', borderRadius: '4px', fontSize: '1rem', border: 'none' ,marginLeft:'-600px',height:'50px',marginTop:'10px'}}>Click Me</button>
      </div>
    </div>
  );
};

export default Home;