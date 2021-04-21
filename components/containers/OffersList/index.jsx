import styled from "styled-components";
import OfferCard from "../../ui/OfferCard";

const OffersList = ({ offers }) => {
  return (
    <Background>
      <div className="offer-list">
        {offers.length === 0 && (
          <p>This domain doesn't have any swap offers yet!</p>
        )}
        {offers.map(({ user_id, domain_id }) => (
          <OfferCard userId={user_id} domainId={domain_id} />
        ))}
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

  p {
    margin: 0 auto;
  }
`;

export default OffersList;
