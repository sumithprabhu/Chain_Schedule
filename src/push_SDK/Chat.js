import { useWeb3React } from "@web3-react/core";
import * as PushAPI from '@pushprotocol/restapi';
import {ethers} from 'ethers';
import { useContract, useWalletClient } from 'wagmi'

const Chat=async()=>{

// const { account, library, chainId } = useWeb3React(); 
// const _signer = library.getSigner(account);
// const provider = new ethers.providers.Web3Provider(window.ethereum);
// await provider.send("eth_requestAccounts", []);

// const _signer =  provider.getSigner();
const { data: walletClient} = useWalletClient()
const _signer=walletClient;


await PushAPI.user.create({signer:_signer,env:'staging'});
const user = await PushAPI.user.get({
    account: 'eip155:0x49403ae592C82fc3f861cD0b9738f7524Fb1F38C'
});
  
// need to decrypt the encryptedPvtKey to pass in the api using helper function
const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey, 
    signer: _signer
});
await PushAPI.chat.approve({
    status: 'Approved',
    account: '0x49403ae592C82fc3f861cD0b9738f7524Fb1F38C',
    senderAddress : '0xe701C317d677F9C54ACf59b5a5dbaDCfAa0AF2e0' // receiver's address or chatId of a group
  });
// actual api
await PushAPI.chat.send({
  messageContent: "Gm gm! It's me... Mario",
  messageType: 'Text', // can be "Text" | "Image" | "File" | "GIF" 
  receiverAddress: 'eip155:0xe701C317d677F9C54ACf59b5a5dbaDCfAa0AF2e0',
  signer: _signer,
  pgpPrivateKey: pgpDecryptedPvtKey
});
}
export default Chat;