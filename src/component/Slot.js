import react, { lazy, useEffect, useState } from "react";
import { BsFillClockFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { Suspense } from "react";
import Chain from '../assets/index';

const MyCalender = lazy(() => import("./calender"));
const ConfirmationForm = lazy(() => import("./confirmationForm"));


const Slot=({sig,GetId,connectWallet,currentAccount,ensName,ensAvatar,getENSName,getAvatarURL})=> {
  
  const [finalDate, setFinal] = useState();
  const [btnMsg,setBtnMsg]=useState("Connect")
  const [inName,setInName]=useState("")
  const [inAvatar,setInAvatar]=useState("")
  const setFinalDate = (data) => {
    setFinal(data);
  };
let id=GetId()
  const resetData = () => {
    setFinal();
  };
  async function displayAccount(){
    connectWallet()
    const inname= await getENSName(id)
    setInName(inname)
    const inavatar= await getAvatarURL(inName)
    setInAvatar(inavatar)
    
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
    <div>
      <nav style={{ background: 'linear-gradient(to right, #333399,  #FF00CC)', padding: '0.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'  }}>
      <div>
        <img src={Chain} alt="Logo" style={{ marginTop:'2px',height: '80px', width: '100%' }} />
      </div>
      <div style={{display:'flex',justifyContent:"space-around"}}>
          <img src={ensAvatar} style={{height:'50px' ,borderRadius:'30px',marginRight:'20px'}}/>
        <button onClick={displayAccount}style={{ cursor:'pointer', marginRight:'10px',backgroundColor: '#333399', color: '#fff', padding: '0.8rem 2rem', borderRadius: '4px', fontSize: '1rem', border: 'none' }}>{btnMsg}</button>
      </div>
    </nav>
    <div className="appContainer" >
      <div className="meetingIinfo">
        <div style={{textAlign:'center'}}>
        <img src={inAvatar} style={{height:'150px',alignItems:'center',borderRadius:'50px'}}/>
        </div>
        <br></br>
       
        <div className="meetingTitle" style={{textAlign:'center'}}>{inName}</div>
        <div
          className="iconParent"
          style={{
            display: "flex",
          }}
        >
          <BsFillClockFill color={"#868686"} fontSize={"1.9rem"} />
          <span className="mmm">&nbsp;   30min</span>
        </div>
        <div
          className="iconParent"
          style={{
            display: "flex",
          }}
        >
          <FaVideo color={"#868686"} fontSize={"2.4rem"} />
          <span className="mmm" style={{marginTop:'7px'}}>
            &nbsp; Casual meet and great.
          </span>
        </div>
      </div>
      <div className="actionArea">
        {!finalDate ? (
          <div className="Calender">
            <Suspense
              fallback={
                <div className="loading">
                  <span>Loading ...</span>{" "}
                </div>
              }
            >
              <MyCalender getUpdatedDate={setFinalDate} />
            </Suspense>
          </div>
        ) : (
          <div className="Calender">
            <Suspense
              fallback={
                <div className="loading">
                  <span>Loading ...</span>
                </div>
              }
            >
              <ConfirmationForm date={finalDate} back={resetData} sig={sig} id={id} currentAccount={currentAccount}/>
            </Suspense>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default Slot;
