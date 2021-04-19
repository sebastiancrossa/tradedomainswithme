import styled from "styled-components";
import OfferCard from "../../ui/OfferCard";

const OffersList = () => {
  return (
    <Background>
      <div className="offer-list">
        <OfferCard user="Sebastian Crossa" domain="kisana.mx" />
        <OfferCard user="Jonathan Chavez" domain="nwtn.io" />
      </div>
    </Background>
  );
};

const Background = styled.div`
  .offer-list {
    display: grid;
    grid-template-columns: auto;
    grid-gap: 2rem;
  }
`;

export default OffersList;
