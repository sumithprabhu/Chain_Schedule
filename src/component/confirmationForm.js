import { useRef, useState } from "react";

import * as PushAPI from "@pushprotocol/restapi";
import { useWeb3React } from "@web3-react/core";

const ConfirmationForm = (props) => {

  const nameRef = useRef();

  const desRef = useRef();

  const nameN = useRef(null);
  
  const desc = useRef(null);
 

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "nameN":
        nameN.current = value;
        break;
      case "desc":
        desc.current = value;
        break;
      default:
        return;
    }
  };


  
// async function onc(){
//   const _signer= props.sig;
//   const user = await PushAPI.user.get({
//     account: `eip155:${props.currentAccount}`, env:'staging'});
//  console.log(_signer)
//  console.log(user)
//  const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
//   encryptedPGPPrivateKey: user.encryptedPrivateKey,
//   signer: _signer,
//   env:'staging'
// });

// const result=await PushAPI.chat.send({
//   messageContent: "Gm gm! It's me... Mario",
//   messageType: "Text", // can be "Text" | "Image" | "File" | "GIF"
//   receiverAddress: `eip155:${id}`,
//   signer: _signer,
//   pgpPrivateKey: pgpDecryptedPvtKey,
//   env: "staging",
// });
// console.log("result",result)
// }
  const Chat = async () => {
    
    const _signer=props.sig;
    
    const user = await PushAPI.user.get({
      account: `eip155:${props.currentAccount}`, env:'staging'});

    // need to decrypt the encryptedPvtKey to pass in the api using helper function
    const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
      encryptedPGPPrivateKey: user.encryptedPrivateKey,
      signer: _signer,
      env:'staging'
    });
    
    await PushAPI.chat.send({
      messageContent: `Request to schedule meet\nTime:${props.date}\nName:${nameN.current}\nDescription:${desc.current}`,
      messageType: "Text", // can be "Text" | "Image" | "File" | "GIF"
      receiverAddress: `eip155:${props.id}`,
      signer: _signer,
      pgpPrivateKey: pgpDecryptedPvtKey,
      env: "staging",
    });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    if (!nameN.current) {
      alert("Name field is manfatory");
      nameRef.current.focus();
      return;
    }


    console.log(
      `name:${nameN.current} \n date:${props.date}\n desc:${desc.current}`
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
          {desc.current ? <h4>desc: {desc.current}</h4> : null}
        </div>
      )}
    </div>
  );
};

export default ConfirmationForm;
