import { useWeb3React } from "@web3-react/core";
import * as PushAPI from '@pushprotocol/restapi'

const Chat=async()=>{

    const { account, library, chainId } = useWeb3React();
const _signer = library.getSigner(account);
const user = await PushAPI.user.get({
    account: 'eip155:0x49403ae592C82fc3f861cD0b9738f7524Fb1F38C'
});
  
// need to decrypt the encryptedPvtKey to pass in the api using helper function
const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey, 
    signer: _signer
});

// actual api
const response = await PushAPI.chat.send({
  messageContent: "Gm gm! It's me... Mario",
  messageType: 'Text', // can be "Text" | "Image" | "File" | "GIF" 
  receiverAddress: 'eip155:0xe701C317d677F9C54ACf59b5a5dbaDCfAa0AF2e0',
  signer: _signer,
  pgpPrivateKey: pgpDecryptedPvtKey
});
}
export default Chat;