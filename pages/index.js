import Head from "next/head";
import styled from "styled-components";
import { Container } from "../styles";
import Navbar from "../components/layout/Navbar";
import OffersList from "../components/containers/OffersList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Trade domains with me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledContainer>
        <Navbar />
        <section class="text-container">
          <h1>tradedomainswith.me</h1>
          <h2 style={{ marginBottom: "1rem", fontWeight: "400" }}>
            The easiest way to find people to trade domains with.
          </h2>
          <button>Start trading for free</button>
        </section>

        <OffersList />
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled(Container)`
  .text-container {
    h1 {
      font-size: 1.6rem;
    }

    background-color: #f9f8f4;
    text-align: center;

    margin: 2rem 0;

    padding: 2rem;
    border-radius: 10px;
  }
`;
