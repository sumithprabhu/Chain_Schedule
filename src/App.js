import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import "./App.css";
import { Suspense } from "react";
import Home from "./component/Home";
import react, { lazy, useState } from "react";
import { BsFillClockFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";

const MyCalender = lazy(() => import("./component/calender"));
const ConfirmationForm = lazy(() => import("./component/confirmationForm"));

const App = () => {



  const [finalDate, setFinal] = useState();

  const setFinalDate = (data) => {
    setFinal(data);
  };

  const resetData = () => {
    setFinal();
  };

  let { id } = useParams();

  let account;
  const [currentAccount, setCurrentAccount] = useState("");
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      account = currentAccount;
      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      // setupEventListener()
    } catch (error) {
      console.log(error);
    }
  };

 
  function Slot(){
    return (<div className="appContainer">
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
                <ConfirmationForm date={finalDate} back={resetData} />
              </Suspense>
            </div>
          )}
      </div>
    </div>)
  };
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
        <Route path="/slot/:id" element={<Slot />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
