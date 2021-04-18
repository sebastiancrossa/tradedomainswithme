import { useRouter } from "next/router";
import Head from "next/head";
import styled from "styled-components";

import { Container } from "../styles";
import Navbar from "../components/layout/Navbar";
import TradeCard from "../components/ui/TradeCard";
import SwappedCard from "../components/ui/SwappedCard";

const User = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{router.query.user} | tradedomainswith.me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledContainer>
        <Navbar />

        <div className="user-container">
          <div>
            <img
              src="https://avatars.githubusercontent.com/u/20131547?v=4"
              alt="User profile image"
            />
            <h1>Sebastian Crossa</h1>
            <h2>@{router.query.user}</h2>
          </div>
        </div>

        <div className="user-stats">
          <div class="traded">8 domains swaped</div>
          <div class="open">3 open swap offers</div>
        </div>

        <section>
          <h2>Open swap offers from this user</h2>

          <div className="offers-list">
            <TradeCard />
            <TradeCard />
          </div>
        </section>

        <section>
          <h2>Succesful swaps</h2>

          <div className="swapped-list">
            <SwappedCard />
            <SwappedCard />
            <SwappedCard />
          </div>
        </section>
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled(Container)`
  .user-container {
    margin: 6rem 0 2rem 0;
    text-align: center;

    img {
      width: 8rem;
      height: auto;
      border-radius: 50rem;

      margin-bottom: 1rem;
    }
  }

  section {
    margin-bottom: 2rem;

    h2 {
      margin-bottom: 1rem;
    }
  }

  .user-stats {
    margin: 0 auto 3rem auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;

    max-width: 30rem;

    @media only screen and (max-width: 375px) {
      grid-template-columns: 1fr;
    }
  }

  .traded,
  .open {
    background-color: #f9f8f4;
    padding: 1rem;

    border-radius: 5px;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
  }

  /* ! Abstract this styling, given that it's more than repeated */
  .offers-list,
  .swapped-list {
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

export default User;
