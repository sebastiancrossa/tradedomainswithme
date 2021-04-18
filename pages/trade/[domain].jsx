import { useRouter } from "next/router";
import Head from "next/head";
import styled from "styled-components";

import Navbar from "../../components/layout/Navbar";
import { Container } from "../../styles";
import MakeAnOffer from "../../components/containers/MakeAnOffer";
import OffersList from "../../components/containers/OffersList";

const Domain = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Swap potentialfor.business</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledContainer>
        <Navbar />

        <div className="heading-info">
          <div className="tag">
            <p>Unverified</p>
          </div>
          <h1>
            Swap offers for
            <br />
            <span className="domain">{router.query.domain}</span>
          </h1>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ marginRight: "0.5rem" }}>a domain owned by</p>
            <div className="user-info">
              <img
                src="https://avatars.githubusercontent.com/u/20131547?v=4"
                alt="User profile image"
              />
              <p>Sebastian Crossa</p>
            </div>
          </div>
        </div>

        <MakeAnOffer />
        <OffersList />
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled(Container)`
  img {
    width: 2rem;
    height: auto;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  .tag {
    background-color: #fbf1eb;
    color: #f1a16f;

    width: fit-content;
    margin: 0 auto 0.5rem auto;

    font-size: 1rem;

    border-radius: 50rem;
    padding: 0.2rem 1rem;

    font-weight: 600;
    border-radius: 50rem;
  }

  .heading-info {
    margin: 6rem 0 3rem 0;
    text-align: center;
  }

  .domain {
    font-size: 2.5rem;
  }

  .user-info {
    display: flex;
    align-items: center;
  }
`;

export default Domain;
