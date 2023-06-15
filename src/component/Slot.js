import react, { lazy, useState } from "react";
import { BsFillClockFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
const MyCalender = lazy(() => import("./calender"));
const ConfirmationForm = lazy(() => import("./confirmationForm"));

const Slot = () => {
  const [finalDate, setFinal] = useState();

  const setFinalDate = (data) => {
    setFinal(data);
  };

  const resetData = () => {
    setFinal();
  };

  let { id } = useParams();
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
            
              <MyCalender getUpdatedDate={setFinalDate} />
           
          </div>
        ) : (
          <div className="Calender">
            
              <ConfirmationForm date={finalDate} back={resetData} />
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Slot;
