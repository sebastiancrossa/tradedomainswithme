import styled from "styled-components";
import TradeCard from "../../ui/TradeCard";

const SwapsList = () => {
  return (
    <Background>
      <h2>Open swap offers</h2>

      <div className="offers-list">
        <TradeCard />
        <TradeCard />
        <TradeCard />
        <TradeCard />
      </div>
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
