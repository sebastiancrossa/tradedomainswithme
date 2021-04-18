import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styled from "styled-components";

import ReactModal from "react-modal";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Container } from "../../styles";
import MakeAnOffer from "../../components/containers/MakeAnOffer";
import OffersList from "../../components/containers/OffersList";

const Domain = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

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
              marginBottom: "1rem",
            }}
          >
            <p style={{ marginRight: "0.5rem" }}>a domain owned by</p>
            <div className="user-content">
              <img
                src="https://avatars.githubusercontent.com/u/20131547?v=4"
                alt="User profile image"
              />
              <p>Sebastian Crossa</p>
            </div>
          </div>
          <button className="close">Close swap offer</button>
        </div>

        <MakeAnOffer />
        <OffersList />

        <Footer />

        <ReactModal
          isOpen={isOpen}
          onRequestClose={onCloseModal}
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          style={{
            overlay: {
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            },
            content: {
              border: "none",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              maxWidth: "25rem",
              margin: "auto auto",
              height: "fit-content",
              textAlign: "center",
            },
          }}
        >
          <ModalContainer>
            <h2>Are you sure you want to close </h2>
            <input type="text" placeholder="example.com" />
            <button>Add my domain</button>
          </ModalContainer>
        </ReactModal>
      </StyledContainer>
    </>
  );
};

const ModalContainer = styled.div`
  input {
    padding: 0.5rem;
    width: 100%;
    border: none;
    border-bottom: 2px solid #f9f8f4;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 5px;

    text-align: center;
  }

  button {
    width: 100%;
    padding: 0.5rem;
  }
`;

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

  .close {
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;

    color: #ec6559;
    border: 2px solid #ec6559;
    background: none;
    /* border-radius: 50rem; */
  }

  .user-content {
    display: flex;
    align-items: center;
  }
`;

export default Domain;
