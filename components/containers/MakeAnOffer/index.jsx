import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";

const MakeAnOffer = ({ domains, currentDomain }) => {
  const router = useRouter();
  const [userDomains, setUserDomains] = useState(domains);
  const [selectedDomain, setSelectedDomain] = useState(domains[0]._id);

  console.log("currentDomain", currentDomain);
  console.log("userDomains", userDomains);

  useEffect(() => {
    // Check if any of the domains of the user are either already swapped or an offer has already been made
    let filteredDomains = domains.filter((domain) => !domain.swappedWith);
    console.log("filtered 1", filteredDomains);

    if (currentDomain.swapOffersReceived.length > 0) {
      filteredDomains = filteredDomains.filter((domain) =>
        currentDomain.swapOffersReceived.some(
          (someOfferReceived) => someOfferReceived.domain_id !== domain._id
        )
      );
    }
  }, []);

  const handleCreateOffer = async () => {
    await axios
      .request({
        method: "PUT",
        url: `http://localhost:5000/api/domains/${currentDomain._id}/newOffer`,
        headers: { "Content-Type": "application/json" },
        data: {
          secret: "q+pXtJSG#JDN37HsE@,",
          offerDomainId: selectedDomain,
        },
      })
      .then((res) => res.data)
      .then(() => router.reload())
      .catch((err) => console.log(err));
  };

  const handleSelectChange = (e) => {
    setSelectedDomain(e.target.value);
  };

  return (
    <Background>
      <h3>Are you interested in this domain? Offer one of your own:</h3>
      <select value={selectedDomain} onChange={(e) => handleSelectChange(e)}>
        {userDomains &&
          userDomains.map((domain) => (
            <option key={domain._id} value={domain._id} domainId={domain._id}>
              {domain.name}
            </option>
          ))}
      </select>
      <button
        onClick={() => handleCreateOffer()}
        disabled={userDomains.length <= 0}
      >
        Offer this domain
      </button>
    </Background>
  );
};

const Background = styled.div`
  background-color: wheat;
  text-align: center;
  max-width: 35rem;

  background-color: #f9f8f4;

  margin: 0 auto 2rem auto;
  padding: 1rem;

  border-radius: 5px;

  h3 {
    margin-bottom: 0.5rem;
  }

  select {
    padding: 0.5rem;
    width: 100%;
    border: none;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 5px;

    text-align: center;
  }

  button {
    width: 100%;
    padding: 0.5rem;

    &:disabled {
      background-color: #0c0066;
      cursor: not-allowed;
    }
  }
`;

export default MakeAnOffer;
