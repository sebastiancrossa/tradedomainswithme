import styled from "styled-components";
import OfferCard from "../../ui/OfferCard";

const OffersList = ({ isMe, offers, parentDomainId }) => {
  return (
    <Background>
      <div className="offer-list">
        {offers && offers.length === 0 && (
          <p>This domain doesn't have any swap offers yet!</p>
        )}
        {offers &&
          offers.map(({ user_img, user_name, domain_id }) => (
            <OfferCard
              isMe={isMe}
              userImg={user_img}
              userName={user_name}
              domainId={domain_id}
              parentDomainId={parentDomainId}
            />
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
