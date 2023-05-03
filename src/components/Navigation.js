import { ethers } from "ethers";
import logo from "../assets/logo.svg";

const Navigation = ({ account, setAccount }) => {
  // requests for metamask connection to get the account address
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account); // set the account state
  };

  return (
    <nav>
      {/* Navbar */}
      <div className="nav__brand">
        <img src={logo} alt="logo" />
        <h1>NamETH</h1>
        <ul className="nav__links">
          <li>
            <a href="/">Domain Names</a>
          </li>
          <li>
            <a href="/">Websites & Hosting</a>
          </li>
          <li>
            <a href="/">Commerce</a>
          </li>
          <li>
            <a href="/">Email & Marketing</a>
          </li>
        </ul>
      </div>

      {/* Ternary operation */}
      {account ? ( // if account state is set, thenm render the account
        <button type="button" className="nav__connect">
          {account.slice(0, 6) + "..." + account.slice(38, 42)}
        </button>
      ) : (
        // else show 'connect' button
        <button type="button" className="nav__connect" onClick={connectHandler}>
          {/* with this function to connect with metamask and get account address */}
          Connect
        </button>
      )}
    </nav>
  );
};

export default Navigation;
