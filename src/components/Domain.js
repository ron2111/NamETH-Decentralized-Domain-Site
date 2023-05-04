import { useEffect, useState } from "react";
import { ethers } from "ethers";

const Domain = ({ domain, ethDaddy, provider, id }) => {
  return (
    <div className="card">
      <div className="card__info">
        <h3>{domain.name}</h3>

        <p>
          <>
            <strong>
              {/* Domain costs (ethers formatting from wei to eth) */}
              {ethers.utils.formatUnits(domain.cost.toString(), "ether")} ETH
            </strong>
          </>
        </p>
      </div>

      <button type="button" className="card__button">
        Buy It
      </button>
    </div>
  );
};

export default Domain;
