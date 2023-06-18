import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import "./App.css";
import { Suspense } from "react";
import Home from "./component/Home";
import { lazy, useState, useEffect, useRef } from "react";
import { BsFillClockFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import Web3Modal from "web3modal";
import { ethers, providers, Contract } from "ethers";
import Slot from "./component/Slot";

const App = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [sig, setSig] = useState("");
  const [wallet, setWallet] = useState("Please Connect Your Wallet to Proceed");
  const [currentAccount, setCurrentAccount] = useState("acc");
  const web3ModalRef = useRef();
  const [ensName, setEnsName] = useState("");
  const [ensAvatar, setEnsAvatar] = useState("");

  async function getAvatarURL(ensName) {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    try {
      const avatarHash = await web3Provider.getAvatar(ensName);
      if (avatarHash) {
        
        return avatarHash
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }
  }
  async function getENSName(walletAddress) {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    try {
      const reverseName = await web3Provider.lookupAddress(walletAddress);
      // return reverseName
      if (reverseName) {
        return reverseName
      }
      // return 'No ENS name found for the given address.';
    } catch (error) {
      console.log("Error: " + error.message);
    }
    
  }

  const connectWallet = async () => {
    console.log("hello");
    await checkIfWalletIsConnected();
    setWalletConnected(true);
    setWallet("Wallet connected");

    const resname=await getENSName(currentAccount);
    setEnsName(resname)
    const resava=await getAvatarURL(ensName);
    setEnsAvatar(resava)

    console.log("ens:", ensName);
    const signer = await checkIfWalletIsConnected(true);
    setCurrentAccount(await signer.getAddress());
    setSig(signer);
    console.log("signer", signer);
    console.log("hello");
  };

  const checkIfWalletIsConnected = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };
  function GetId() {
    let { id } = useParams();
    console.log(id);
    return id;
  }

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
      console.log(currentAccount);
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              connectWallet={connectWallet}
              currentAccount={currentAccount}
              ensName={ensName}
              ensAvatar={ensAvatar}
            />
          }
        />
        <Route
          path="/slot/:id"
          element={
            <Slot
              sig={sig}
              GetId={GetId}
              connectWallet={connectWallet}
              currentAccount={currentAccount}
              ensName={ensName}
              ensAvatar={ensAvatar}
              getENSName={getENSName}
              getAvatarURL={getAvatarURL}

            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
