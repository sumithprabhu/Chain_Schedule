import React, { useEffect, useRef, useState } from "react";

const TimeCard = (props) => {
  const [timeSlice, setTimeSlice] = useState([]);
  const todaydateRef = useRef(null);
  const normalDateRef = useRef(null);
  const today = new Date();
  const [showConfirmButton, setShowConfirmButton] = useState();

  const createSlice = (start, duration) => {
    console.log("creation request received");
    let timeSliceData = [];
    let i = start ? start : 0;
    let sliceSize = duration ? duration : 60;
    for (i; i <= 24; i++) {
      let j = 0;
      while (j < 60) {
        let iUpdate = i < 10 ? `0${i}` : i;
        let jUpdate = j < 10 ? `0${j}` : j;
        let stitch = `${iUpdate}:${jUpdate}`;
        timeSliceData.push(stitch);
        j += sliceSize;
      }
    }
    return timeSliceData;
  };

  const updateTimer = () => {
    console.log("slot updated");
    todaydateRef.current = todaydateRef.current.filter(
      (item) => +item.split(":")[0] > today.getHours()
    );
    if (
      props.date.getDate() === today.getDate() &&
      props.date.getMonth() === today.getMonth()
    ) {
      return;
    }
    setTimeSlice([...todaydateRef.current]);
    clearInterval(interval);
  };

  const interval = () => {
    setInterval(updateTimer, props.duration ? props.duration * 10000 : 100000);
  };

  const setDateForToday = () => {
    if (todaydateRef.current === null) {
      console.log(todaydateRef.current);
      let setting = createSlice(today.getHours(), props.duration);
      todaydateRef.current = setting;
      interval();
    }
    setTimeSlice([...todaydateRef.current]);
  };

  const directSetDate = () => {
    if (normalDateRef.current === null) {
      let setting = createSlice(0, props.duration);
      normalDateRef.current = setting;
    }
    setTimeSlice([...normalDateRef.current]);
  };

  useEffect(() => {
    setShowConfirmButton();
    props.date.getDate() === today.getDate() &&
    props.date.getMonth() === today.getMonth()
      ? setDateForToday()
      : directSetDate();
    return () => {
      clearInterval(interval);
    };
  }, [props.date]);

  const callSetTimeAndForward = (time) => {
    setShowConfirmButton(`${time}:00`);
  };

  const navigateConfirmationPage = () => {
    let updateDate = props.date
      .toString()
      .split(" ")
      .map((item, index, arr) => {
        if (index !== 4) {
          return item;
        } else {
          return (arr[4] = showConfirmButton);
        }
      })
      .join(" ");
    props.update(updateDate);
  };

  return (
    <div className="timeSliceBody">
      {timeSlice.map((item) => (
        <div className="timeList" key={item}>
          <button
            className={
              showConfirmButton === `${item}:00` ? "half marked" : "full"
            }
            onClick={() => callSetTimeAndForward(item)}
          >
            {item}
          </button>
          {showConfirmButton === `${item}:00` ? (
            <button className="half select" onClick={navigateConfirmationPage}>
              Confirm
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default TimeCard;