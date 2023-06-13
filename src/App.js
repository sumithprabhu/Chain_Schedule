import { useState } from "react";
import "./App.css";
import { BsFillClockFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { lazy } from "react";
import { Suspense } from "react";
import Home from "./component/Home";
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

  return (
    <main className="App">
      <Home />
      {/* <div className="appContainer">
        <div className="meetingIinfo">
          <span className="mmm"> conferencing confirmation</span>
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
      </div> */}
    </main>
  );
};

export default App;
