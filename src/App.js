import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import Domain from "./components/Domain";

// ABIs
import NamETH from "./abis/NamETH.json";

// Config
import config from "./config.json";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  //  when the metamask account gets changed, we need to automatically upddate it and set new state for 'account'

  const [namETH, setNamETH] = useState(null);
  const [domains, setDomains] = useState([]);

  const loadBlockchainData = async () => {
    // to connect frontend with blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork(); // hardhat network
    console.log(network);

    const namETH = new ethers.Contract(
      config[network.chainId].NamETH.address,
      NamETH,
      provider
      //ethers command to get js version of smart contract, requires 3 parameters: (address, abi, providerOrSigner)
      // taking the address from config.json file
    );
    setNamETH(namETH);

    const maxSupply = await namETH.maxSupply();
    // Getting max supply from contract

    const domains = [];

    // getting all the domains till maxSupply from the contract using getDomain Function
    for (var i = 1; i <= maxSupply; i++) {
      const domain = await namETH.getDomain(i);
      domains.push(domain);
    }

    setDomains(domains);

    window.ethereum.on("accountsChanged", async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      }); // gets the array of accounts
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });
  };

  useEffect(() => {
    // to initiate the test/ function
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />

      <Search />
      {/* Search module-placeholder */}

      <div className="cards__section">
        <h2 className="cards__title">Why you need a domain name.</h2>
        <p className="cards__description">
          Own your custom username, use it across services, and be able to store
          an avatar and other profile data.
        </p>

        <hr />

        <div className="cards">
          {/* domain listing */}
          {domains.map((domain, index) => (
            <Domain
              domain={domain}
              namETH={namETH}
              provider={provider}
              id={index + 1}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
