import React, { useState, useEffect } from "react";
import "./Modal.css";
const Modal = ({ setmodalOpen, contract, account }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    alert(`Access given to ${address}`);
  };
  useEffect(() => {
    const List = async () => {
      const accessList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = accessList;
      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && List();
  }, []);
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share With</div>
          <div className="body">
            <input
              type="text"
              placeholder="Enter Address"
              className="address"
            />
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People</option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                setmodalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={sharing}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
