import Link from "next/link";
import styled from "styled-components";
import TradeCard from "../../ui/TradeCard";

const SwapsList = ({ domains, noHeader }) => {
  return (
    <Background>
      {!noHeader && (
        <div className="top-container">
          <h2>Most recent open swap offers</h2>
          <Link href="/all">View all domains</Link>
        </div>
      )}

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
  margin-bottom: 2rem;

  .top-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      margin-bottom: 1rem;
    }

    a {
      text-decoration: underline;
      font-weight: bold;
      color: gray;
    }
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
