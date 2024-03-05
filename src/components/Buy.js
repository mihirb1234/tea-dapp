const ethers = require("ethers");

const Buy = ({ state }) => {
  const buyChai = async (e) => {
    e.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value; // Corrected the ID to match
    console.log(name, message, contract);

    const { utils } = ethers; // Import the utils object
    const value = { value: utils.parseEther("0.001") };

    const transaction = await contract.buyChai(name, message, value);
    await transaction.wait();
    console.log("Transaction done");
    alert('transaction complete')
  };

  return (
    <>
      <form onSubmit={buyChai}>
        <div className="flex flex-col border-black mt-10 p-5">
          <label>Name</label>
          <input type="text" id="name" placeholder="enter your name" />
          <label>Message</label>
          <input
            type="text"
            id="message"
            placeholder="enter your message"
          />{" "}
          {/* Corrected the ID to match */}
          <button type="submit" className="">
            Pay
          </button>
        </div>
      </form>
    </>
  );
};

export default Buy;
