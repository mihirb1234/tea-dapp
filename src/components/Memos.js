import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract, provider } = state;

  useEffect(() => {
    const memosMessage = async () => {
      try {
        console.log("Contract Instance:", contract);

        // Check the code at the contract address
        const code = await provider.getCode(contract.address);
        console.log("Contract Code:", code);

        const memos = await contract.getMemos();
        console.log("memos", memos);
        setMemos(memos);
      } catch (error) {
        console.error("Error occurred:", error.message);
      }
    };

    // Call the function when the contract and provider are available
    contract && provider && memosMessage();
  }, [contract, provider]);

  return (
    <>
      <p>messages</p>
      {memos.map((memo, index) => (
        <table key={index}>
          <tr>
            <td>{memo.name}</td>
            <td>{memo.message}</td>
            <td></td>
            <td></td>
          </tr>
        </table>
      ))}
    </>
  );
};

export default Memos;
