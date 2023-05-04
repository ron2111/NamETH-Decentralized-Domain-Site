import { useEffect, useState } from "react";
import { ethers } from "ethers";

const Domain = ({ domain, namETH, provider, id }) => {
  const [owner, setOwner] = useState(null); // to set the buyer as owner
  const [hasSold, setHasSold] = useState(false); // sold status

  const getOwner = async () => {
    if (domain.isOwned || hasSold) {
      const owner = await namETH.ownerOf(id);
      setOwner(owner);
    }
  };

  // BUY BUTTON FUNCTION
  const buyHandler = async () => {
    // to mint the domains (buy)
    const signer = await provider.getSigner();
    const transaction = await namETH
      .connect(signer)
      .mint(id, { value: domain.cost });
    await transaction.wait();

    setHasSold(true);
  };

  // will run on every render
  useEffect(() => {
    getOwner();
  }, [hasSold]);

  return (
    <div className="card">
      <div className="card__info">
        <h3>
          {domain.isOwned || owner ? (
            <del>{domain.name}</del> // strikethorough the domain if its bough
          ) : (
            <>{domain.name}</>
          )}
        </h3>

        <p>
          {domain.isOwned || owner ? (
            // If domain is bought
            <>
              <small>
                Owned by:
                <br />
                <span>
                  {/* owner account address */}
                  {owner && owner.slice(0, 6) + "..." + owner.slice(38, 42)}
                </span>
              </small>
            </>
          ) : (
            <>
              {/* else show its cost */}
              <strong>
                {ethers.utils.formatUnits(domain.cost.toString(), "ether")}
              </strong>
              ETH
            </>
          )}
        </p>
      </div>

      {/* Conditional Button */}
      {!domain.isOwned && !owner && (
        //if domain is not owned
        <button
          type="button"
          className="card__button"
          onClick={() => buyHandler()}
        >
          Buy It
        </button>
      )}
    </div>
  );
};

export default Domain;
