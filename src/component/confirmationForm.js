import React, { useRef, useState } from "react";
import Chat from '../push_SDK/Chat';

const ConfirmationForm = (props) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const desRef = useRef();

  const nameN = useRef(null);
  const email = useRef(null);
  const desc = useRef(null);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "nameN":
        nameN.current = value;
        break;
      case "email":
        email.current = value;
        break;
      case "desc":
        desc.current = value;
        break;
      default:
        return;
    }
  };

  const formSubmit = (event) => {
    event.preventDefault();
    if (!nameN.current) {
      alert("Name field is manfatory");
      nameRef.current.focus();
      return;
    }

    if (!email.current) {
      alert("Name field is manfatory");
      emailRef.current.focus();
      return;
    }

    console.log(
      `name:${nameN.current} \n email:${email.current} \n date:${props.date}\n desc:${desc.current}`
    );
    setShowConfirmation(true);
  };

  return (
    <div className="confirmationBody">
      {!showConfirmation ? (
        <form onSubmit={formSubmit}>
          <h2>Enter details</h2>
          <label>
            Name*
            <br />
            <input
              type="text"
              onChange={handleChange}
              name="nameN"
              ref={nameRef}
              required
            />
          </label>
          <br />
          <label>
            Email*
            <br />
            <input
              type="email"
              onChange={handleChange}
              name="email"
              ref={emailRef}
              required
            />
          </label>
          <br />
          <label>
            Description
            <br />
            <textarea
              onChange={handleChange}
              cols={40}
              name="desc"
              rows={5}
              ref={desRef}
            />
          </label>
          <br />
          <button className="formButton" type="submit" onClick={Chat}>
            Schedule
          </button>
          <button className="formButton" onClick={props.back}>
            Back
          </button>
        </form>
      ) : (
        <div className="BookingDetail">
          <h3>Booking Details</h3>
          <h4>
            <strong>date</strong>:<em>{props.date}</em>
          </h4>
          <h4>
            <strong>name</strong>:<em>{nameN.current}</em>
          </h4>
          <h4>
            <strong>email</strong>:<em>{email.current}</em>
          </h4>
          {desc.current ? <h4>desc: {desc.current}</h4> : null}
        </div>
      )}
    </div>
  );
};

export default ConfirmationForm;