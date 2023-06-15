import React, { lazy, Suspense, useState } from "react";
import Calendar from "react-calendar";
import "../App.css";
import "react-calendar/dist/Calendar.css";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
const TimeCard = lazy(() => import("./timeCard"));

const MyCalender = (props) => {
  const [date, setDate] = useState();
  const today = new Date();

  /*polyFills to increment or decrement date by
  number of days*/
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  //callback function to disable dateSelection
  //before present date
  const disableDate = ({ date, view }) => {
    // Add class to tiles in month view only
    if (view === "month") {
      return date < today.addDays(-1) || date.getDay() === 0;
    }
  };

  //sending date to parent
  //setting the date
  const setDateEvent = (event) => {
    setDate(event);
    console.log(date);
  };

  const updateDate = (updatedDate) => {
    props.getUpdatedDate(updatedDate);
  };

  return (
    <div className="calenderDiv">
      <div className={!date ? "calenderOnly" : "calenderTime"}>
        <Calendar
          view={"month"}
          maxDate={today.addDays(90)}
          nextLabel={<FcNext size={"1.5rem"} />}
          prevLabel={<FcPrevious size={"1.5rem"} />}
          next2Label={""}
          prev2Label={""}
          minDetail={"month"}
          minDate={today.addDays(-1)}
          tileDisabled={disableDate}
          onChange={setDateEvent}
          value={date}
        />
      </div>
      <div className={!date ? "hide" : "show timeSliceContainer"}>
        {date ? (
          <div className="timeSlice">
            <Suspense
              fallback={
                <div className="loading">
                  <span>Loading ...</span>{" "}
                </div>
              }
            >
              <TimeCard date={date} update={updateDate} duration={20} />
            </Suspense>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default MyCalender;