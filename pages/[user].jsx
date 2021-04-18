import { useRouter } from "next/router";
import Head from "next/head";
import styled from "styled-components";

import { RiSettings3Fill } from "react-icons/ri";
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
            {/* <RiSettings3Fill size={35} /> */}
          </div>
        </div>

        <div className="user-stats">
          <div class="traded">8 domains swaped</div>
          <div class="open">3 open swap offers</div>
        </div>

        <button className="add-btn">Add a domain</button>

        <section>
          <h2 style={{ margin: "0" }}>Verify your domains</h2>
          <p style={{ marginBottom: "1rem" }}>
            You cans still create swap offers for unverified domains, but it is
            highly recommended to verify each of your submitted domains, since
            it's easier for others to follow through on a swap offer.
          </p>
          <p style={{ marginBottom: "1rem" }}>
            To verify all the domains added, go to your domain service provider
            and add a <span style={{ fontWeight: "bold" }}>TXT Record</span>{" "}
            with the value of{" "}
            <span className="code">tradedomainswithme-[your domain here]</span>
            (e.g. tradedomainswithme-potentialfor.business). Once that is added,
            keep refreshing until we read that on our side!
          </p>

          <div className="unverified-domains">
            <div className="unverified-domain">
              <p>potentialfor.business</p>
              <button>Check verification</button>
            </div>
            <div className="unverified-domain">
              <p>potentialfor.business</p>
              <button>Check verification</button>
            </div>
          </div>
        </section>

        <section>
          {/* <h2>Open swap offers from this user</h2> */}
          <h2>Your open swap offers </h2>

          <div className="offers-list">
            <TradeCard />
            <TradeCard />
          </div>
        </section>

        <section>
          <h2>Swaps with other users</h2>

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
  .code {
    background-color: #f9f8f4;
    padding: 0 0.3rem;
    margin-left: 0.3rem;
    font-weight: bold;
  }

  .unverified-domains {
    display: flex;

    button {
      padding: 0.5rem;
      width: 100%;
      margin-top: 0.5rem;
    }
  }

  .unverified-domain {
    margin-right: 1rem;

    padding: 1rem;
    border-radius: 5px;
    background-color: #f9f8f4;
    width: fit-content;
  }

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

  .add-btn {
    width: 30rem;
    margin: 0 auto 3rem auto;
    display: block;
  }

  .user-stats {
    margin: 0 auto 1rem auto;
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
