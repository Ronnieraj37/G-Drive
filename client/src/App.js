import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import Display from "./components/Display";
import Modal from "./components/Modal";
import FileUpload from "./components/FileUpload";
function App() {
  const [account, setaccount] = useState("");
  const [contract, setcontract] = useState(null);
  const [provider, setprovider] = useState(null);
  const [modalOpen, setmodalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setaccount(address);
        let contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
        const contractInstance = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        setcontract(contractInstance);
        setprovider(provider);
      } else {
        console.error("MetaMask not Installed");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <div>
      {modalOpen ? (
        <Modal
          setmodalOpen={setmodalOpen}
          contract={contract}
          account={account}
        ></Modal>
      ) : (
        <button
          className="button"
          onClick={() => {
            setmodalOpen(true);
          }}
        >
          Add Access
        </button>
      )}

      <div className="App">
        <h1 style={{ color: "white" }}>Dribe 3.0</h1>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>
        <p style={{ color: "white" }}> account : {account}</p>
        <FileUpload
          account={account}
          contract={contract}
          provider={provider}
        ></FileUpload>
        <Display account={account} contract={contract}></Display>
      </div>
    </div>
  );
}

export default App;
