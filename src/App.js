import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import "./App.css";
import { Suspense } from "react";
import Home from "./component/Home";
import  { lazy, useState,useEffect,useRef } from "react";
import { BsFillClockFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";

const MyCalender = lazy(() => import("./component/calender"));
const ConfirmationForm = lazy(() => import("./component/confirmationForm"));

const App = () => {
  const [finalDate, setFinal] = useState();
  const [walletConnected, setWalletConnected] = useState(false);
  const [sig,setSig]=useState("")
  const [wallet, setWallet] = useState("Please Connect Your Wallet to Proceed");
  const setFinalDate = (data) => {
    setFinal(data);
  };

  const resetData = () => {
    setFinal();
  };

  let { id } = useParams();

  
  const [currentAccount, setCurrentAccount] = useState("acc");
  const web3ModalRef = useRef()


  const connectWallet = async () => {
    console.log("hello")
    await checkIfWalletIsConnected();
      setWalletConnected(true);
      setWallet("Wallet connected")
      
      
      const signer = await checkIfWalletIsConnected(true);
      setCurrentAccount(await signer.getAddress());
      setSig(signer)
      console.log("signer",signer);
      console.log("hello")
  }

  const checkIfWalletIsConnected = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to 5ire");
      throw new Error("Change network to 5ire");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      console.log(currentAccount)
      connectWallet();
      
    }
  }, [walletConnected]);

  function Slot({sig}) {
    return (
      <div className="appContainer">
        <div className="meetingIinfo">
          <span className="mmm"> conferencing confirmation {id}</span>
          <div className="meetingTitle">Meeting With RevenueHero</div>
          <div
            className="iconParent"
            style={{
              display: "flex",
            }}
          >
            <BsFillClockFill color={"#868686"} fontSize={"1.9rem"} />
            <span className="mmm">&nbsp; 30min</span>
          </div>
          <div
            className="iconParent"
            style={{
              display: "flex",
            }}
          >
            <FaVideo color={"#868686"} fontSize={"2.4rem"} />
            <span className="mmm">
              &nbsp;Web conferencing details provided upon confirmation.
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
                <ConfirmationForm date={finalDate} back={resetData} sig={sig}/>
              </Suspense>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              connectWallet={connectWallet}
              currentAccount={currentAccount}
            />
          }
        />
        <Route path="/slot/:id" element={<Slot sig={sig} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
