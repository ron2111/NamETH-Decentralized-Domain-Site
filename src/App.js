import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import Domain from "./components/Domain";

// ABIs
import ETHDaddy from "./abis/ETHDaddy.json";

// Config
import config from "./config.json";

function App() {
  const [account, setAccount] = useState(null);
  // smoke test for frontend-contract integration
  const loadBlockchainData = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    }); // gets the array of accounts

    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account); // address of first account (value gets updated to 'account' variable)
  };

  useEffect(() => {
    // to initiate the test/ function
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <Search />
      <div className="cards__section">
        <h2 className="cards__title">Why you need a domain name?</h2>

        <p className="cards__description">
          Own your custom username, use it across services, and be able to store
          an avatar and other profile data
        </p>
        <hr />

        <div className="cards"> </div>
      </div>
    </div>
  );
}

export default App;
