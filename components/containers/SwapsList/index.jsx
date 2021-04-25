import styled from "styled-components";
import TradeCard from "../../ui/TradeCard";

const SwapsList = ({ domains }) => {
  return (
    <Background>
      <h2>Open swap offers</h2>

      {!domains && (
        <p>No domains have been added just yet! Be the first one to add.</p>
      )}

      {domains && domains.length == 0 ? (
        <p>No domains have been added just yet!</p>
      ) : (
        <div className="offers-list">
          {domains && domains.map((domain) => <TradeCard domain={domain} />)}
        </div>
      )}
    </Background>
  );
};

const Background = styled.section`
  h2 {
    margin-bottom: 1rem;
  }

  .offers-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 3rem;

    @media only screen and (max-width: 1024px) {
      grid-template-columns: 1fr 1fr;
    }

    @media only screen and (max-width: 425px) {
      grid-template-columns: 1fr;
    }
  }
`;

export default SwapsList;
