import React, { useState } from "react";
import "./Display.css";
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getData = async () => {
    let dataArray;
    const OtherAddress = document.querySelector(".address").value;
    try {
      if (OtherAddress) {
        dataArray = await contract.display(OtherAddress);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert(e);
    }
    const isEmpty = Object.keys(dataArray).length === 0;
    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank">
            <img src={item} key={i} alt="new" className="image-list" />
          </a>
        );
      });
      setData(images);
    } else {
      alert("No Images to Display");
    }
  };
  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getData}>
        Get Data
      </button>
    </>
  );
};

export default Display;
